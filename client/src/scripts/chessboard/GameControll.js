import {GameStatus, Interaction} from "@/scripts/chessboard/objects";

export class Game_Control//klasa kontrulujaca zasady gry
{
    vueBoard;
    reset;
    game;
    history;
    rules;
    events;
    endCondition;
    n_move;
    activePiece;
    idx_history;
    GameStatus;
    Interaction;
    updateStore;
    myTeam;

    constructor(vueBoard, game, rules, events, endCondition, isSet) {
        this.vueBoard = vueBoard;
        this.updateStore = null;
        this.game = game; //gra
        this.history = new Array(0);//tablica poprzednich ustawien
        this.rules = rules;//zasady ogolne gry
        this.events = events;
        this.endCondition = endCondition;
        this.n_move = 0;
        this.activePiece = {row: -1, col: -1};
        this.reset = false;
        this.history.unshift(this.copy_board(game.board));
        this.idx_history = 0;
        if (isSet)
            this.game.set_every_move(this);
        this.GameStatus = new GameStatus();
        this.Interaction = new Interaction();
        if(vueBoard.online)
        {
            this.myTeam = vueBoard.$api.playerId;
            if (isSet)
                vueBoard.$api.listenObj(this.waitForServer, this);
        }
        else
            this.myTeam = -1;
    }

    Surrender()
    {
        if(this.vueBoard.online)
        {
            this.vueBoard.$api.giveUp();
            this.GameStatus.setEnd((this.myTeam + 1) % 2 ,3)
        }
        else
            this.GameStatus.setEnd((this.n_move + 1) % 2, 3)
    }

    EndGameCheck(){
        for(let i = 0; i < this.endCondition.length; i++)
            if(this.endCondition[i](this))
                return true;
        return false;
    }

    Is_it_check(Board, Move_Board) {
        if (Move_Board.length === 0)
            return false;
        for (let row = 0; row < this.game.get_rows(); row++)
            for (let col = 0; col < this.game.get_cols(); col++) {
                if (this.game.set_of_check_mate_piece.includes(Board[row][col])) {
                    for (let p = 0; p < Move_Board[row][col].length; p++) {
                        if (this.game.set_of_piece[Move_Board[row][col][p].id].team !== this.game.set_of_piece[Board[row][col]].team)
                            return true;
                    }
                }
            }
        return false;
    }

    isYourPiece(idPiece) {
        if(idPiece === -1)
            return false;
        if (this.game.set_of_piece[idPiece].team === this.n_move % 2)
            return true;
        else
            return false;
    }

    copy_board(Record) {
        let temp = new Array(Record.length);
        for (let i = 0; i < Record.length; i++) {
            let temp_2 = new Array(Record[i].length)
            for (let j = 0; j < Record[i].length; j++) {
                temp_2[j] = Record[i][j];
            }
            temp[i] = temp_2;
        }
        return temp;
    }

    packMove(m){
        return (this.game.get_rows() - m.row - 1) * this.game.get_cols() + m.col;
    }
    async waitForServer(gameIn, myGame)
    {
        if(gameIn.moves.length % 2 === myGame.myTeam && gameIn.moves.length !== 0 && myGame.history.length !== gameIn.moves.length + 1)
            myGame.update(gameIn);
        else if(gameIn.draw[0] === 1 && gameIn.draw[1] === 1)
            myGame.GameStatus.setEnd(-1, 4);
        else if(gameIn.draw[(myGame.myTeam + 1) % 2] === 1)
            myGame.vueBoard.drawAct = true;
        if(gameIn.status === 1)
            myGame.GameStatus.setEnd(myGame.myTeam, 3)

    }
    update(Game) {
        {
            this.move(this.vueBoard.getPosition(Game.moves[Game.moves.length - 1].from, this.game.get_rows(), this.game.get_cols()), (this.myTeam + 1) % 2);
            this.move(this.vueBoard.getPosition(Game.moves[Game.moves.length - 1].to, this.game.get_rows(), this.game.get_cols()), (this.myTeam + 1) % 2);
        }
    }
    async sendMove(from, to)
    {
        if(this.vueBoard.online)
        {
            console.log("----------------------------")
            console.log(this.packMove(from));
            console.log(this.packMove(to));
            console.log("----------------------------")
            await this.vueBoard.$api.makeMove(this.packMove(from), this.packMove(to), "-");
        }
    }

    saveMove(from, to){
        let img = "img/" + this.game.get_image(from.row, from.col).image;
        return {p: img, f: String.fromCharCode(to.col + 65) + to.row.toString()};
    }

    accept_move(from, to, player) {
        this.vueBoard.$emit("messageFromChild", this.saveMove(from, to));
        let My_piece = this.game.get_id_piece(from.row, from.col);
        this.game.set_of_piece[My_piece].c_moves++;
        this.game.set_piece(to.row, to.col, My_piece);
        this.game.set_piece(from.row, from.col, -1);
        let events = this.game.set_of_types[this.game.set_of_piece[My_piece].type].moves[this.game.p_moves[to.row][to.col]].events;
        for (let i = 0; i < events.length; i++) {
            this.game.set_of_events[events[i]](this, from.row, from.col, to.row, to.col)
        }

        this.history.unshift(this.copy_board(this.game.board));
        for (let i = 0; i < this.events.length; i++) {
            this.events[i](this, true);
        }
        this.n_move++;
        if(this.myTeam === player)
        {
            this.sendMove(from, to);
        }
        this.game.set_every_move(this);
        this.EndGameCheck();

    }

    look_back() {
        if (this.idx_history !== this.history.length - 1) {
            this.idx_history++;
            this.game.board = this.history[this.idx_history];
        }
    }

    look_forward() {
        if (this.idx_history !== 0) {
            this.idx_history--;
            this.game.board = this.history[this.idx_history];
        }
    }

    curren_position() {
        this.idx_history = 0;
        this.game.board = this.copy_board(this.history[0])
    }

    show_possible_move(row, col) {
        let id = this.game.get_id_piece(row, col); //id akytwnej figury
        if (id === -1)
            return;
        let f_id = this.game.set_of_piece[id].type; //id typu figury
        for (let i = 0; i < this.game.set_of_types[f_id].moves.length; i++) { //dla kazdego typu ruchu dla typu figury
            let mov = this.game.set_of_types[f_id].moves[i];//analizywany ruch
            let count = mov.number;//liczba pol przesniecia
            let a_row = row + mov.x;//pierwsze mozliwe pole do przesuniecia
            let a_col = col + mov.y;
            for (; a_row >= 0 && a_col >= 0 && a_row < this.game.get_rows() && a_col < this.game.get_cols() && count !== 0; a_row += mov.x, a_col += mov.y, count--) { //dopoki nadal jestesmy na planszy i liczba ruchow wieksza od 0
                for (let evr = 0; evr < this.game.every_p_moves[a_row][a_col].length; evr++) {
                    if (this.game.every_p_moves[a_row][a_col][evr].id === id && this.game.every_p_moves[a_row][a_col][evr].i === i) {
                        this.game.set_possible_move(a_row, a_col, i);//zaznacz ruch na plansz
                        break;
                    }
                }

                if (this.game.get_id_piece(a_row, a_col) !== -1)//jezeli znajduje sie figura na danym polu przerwij
                    break;
            }
        }
    }

    move(value, playerId) {
        if (this.idx_history !== 0) {
            this.curren_position();
            return;
        }
        if (this.activePiece.row === -1) {
            if (!this.isYourTurn(playerId) || !this.isYourPiece(this.game.get_id_piece(value.row, value.col)) || this.GameStatus.isEnd)
                return;
            this.activePiece.row = value.row;
            this.activePiece.col = value.col;
            this.show_possible_move(value.row, value.col);
            this.reset = !this.reset;
        } else {
                if (this.game.p_moves[value.row][value.col] !== -1) {
                    this.accept_move(this.activePiece, value, playerId);
                }
            this.game.clear_possible_move();
            this.activePiece = {row: -1, col: -1}
            this.reset = !this.reset;
        }
    }
    isYourTurn(playerId){
        if( this.myTeam === -1 || playerId === this.n_move % 2)
            return true;
        else
            return false;
    }
}

