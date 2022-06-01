import {Game_Control} from "@/scripts/chessboard/GameControll";


export class Chess_game//klasa gry glownej
{
    board;
    set_of_piece;
    set_of_types;
    set_of_check_mate_piece;
    set_of_condition_moves;
    set_of_events;
    p_moves;
    every_p_moves;

    get_rows() {
        return this.board.length;
    }

    get_cols() {
        return this.board[0].length;
    }

    get_id_piece(row, col) {
        return this.board[row][col];
    }

    get_piece(row, col) {
        let id = this.get_id_piece(row, col);
        if (id === -1)
            return null;
        else
            return this.set_of_piece[id];
    }

    set_piece(row, col, x) {
        this.board[row][col] = x;
    }

    is_possible_move(row, col) {
        return this.p_moves[row][col];
    }

    set_possible_move(row, col, mov) {
        this.p_moves[row][col] = mov;
    }

    clear_possible_move() {
        for (let i = 0; i < this.get_rows(); i++)
            for (let j = 0; j < this.get_cols(); j++)
                this.p_moves[i][j] = -1;
    }

    get_image(row, col) {
        let id = this.get_id_piece(row, col);
        if (id === -1)
            if (this.is_possible_move(row, col) !== -1)
                return {image: "dot.png", hit: false};
            else
                return {image: "", hit: false};

        if (this.set_of_piece[id].team === 0)
            return {
                image: this.set_of_types[this.set_of_piece[id].type].image + "_w.png",
                hit: this.is_possible_move(row, col) !== -1
            };
        else
            return {
                image: this.set_of_types[this.set_of_piece[id].type].image + "_b.png",
                hit: this.is_possible_move(row, col) !== -1
            };

    }

    change_piece(id, type) {
        this.set_of_piece[id].type = type;
    }

    copyGame(Game) {
        let piece = JSON.parse(JSON.stringify(Game.game.set_of_piece));
        let game = new Chess_game(Game.copy_board(Game.game.board), piece, Game.game.set_of_types, Game.game.set_of_check_mate_piece, Game.game.set_of_condition_moves, Game.game.set_of_events)
        let r = new Game_Control(Game.vueBoard, game, Game.rules, Game.events, Game.endCondition, false);
        r.history = Game.history;
        r.idx_history = Game.idx_history;
        return r;
    }

    predict_move(Game, fRow, fCol, tRow, tCol, mId) {
        //ustawienie nowego boardu
        let id_piece = Game.game.board[fRow][fCol];
        let team = Game.game.set_of_piece[id_piece].team;
        Game.game.set_piece(tRow, tCol, Game.game.board[fRow][fCol]);
        Game.game.set_piece(fRow, fCol, -1);
        let events = Game.game.set_of_types[Game.game.set_of_piece[id_piece].type].moves[mId].events;
        for (let i = 0; i < events.length; i++) {
            Game.game.set_of_events[events[i]](Game, fRow, fCol, tRow, tCol)
        }
        for (let i = 0; i < Game.events.length; i++) {
            Game.events[i](Game, false);
        }
//sprawdzanie kazdego ruchu
        for (let row = 0; row < Game.game.get_rows(); row++)
            for (let col = 0; col < Game.game.get_cols(); col++) {
                let piece = Game.game.get_piece(row, col);

                if (piece !== null && piece.team !== team) {
                    let f_id = piece.type;
                    for (let i = 0; i < Game.game.set_of_types[f_id].moves.length; i++) {
                        let mov = Game.game.set_of_types[f_id].moves[i];//analizywany ruch
                        let count = mov.number;//liczba pol przesniecia
                        let a_row = row + mov.x;//pierwsze mozliwe pole do przesuniecia
                        let a_col = col + mov.y;
                        for (; a_row >= 0 && a_col >= 0 && a_row < Game.game.get_rows() && a_col < Game.game.get_cols() && count !== 0; a_row += mov.x, a_col += mov.y, count--) { //dopoki nadal jestesmy na planszy i liczba ruchow wieksza od 0
                            let out = false;//czy jakikolwiek warunek falszywy
                            for (let j = 0; j < mov.rules.length; j++) {//sprawdz wszystkie warunki
                                if (!this.set_of_condition_moves[mov.rules[j]](Game, row, col, a_row, a_col)) { //jezeli jakikolwiek nie prawdziwy wyjdzź
                                    out = true;
                                    break;
                                }
                            }
                            if (out)//wyjdz jesli jakikolwie nie prawdziwy
                                break;
                            if (Game.game.set_of_check_mate_piece.includes(Game.game.get_id_piece(a_row, a_col)))
                                return false;
                            if (Game.game.get_id_piece(a_row, a_col) !== -1)//jezeli znajduje sie figura na danym polu przerwij
                                break;
                        }
                    }
                }
            }
        return true;
    }

    set_move_for_piece(row, col, control, every_p_moves) {
        if (typeof every_p_moves === "undefined")
            every_p_moves = control.game.every_p_moves;
        let id = this.get_id_piece(row, col); //id akytwnej figury
        let f_id = this.set_of_piece[id].type; //id typu figury
        for (let i = 0; i < this.set_of_types[f_id].moves.length; i++) { //dla kazdego typu ruchu dla typu figury
            let mov = this.set_of_types[f_id].moves[i];//analizywany ruch
            let count = mov.number;//liczba pol przesniecia
            let a_row = row + mov.x;//pierwsze mozliwe pole do przesuniecia
            let a_col = col + mov.y;
            for (; a_row >= 0 && a_col >= 0 && a_row < this.get_rows() && a_col < this.get_cols() && count !== 0; a_row += mov.x, a_col += mov.y, count--) { //dopoki nadal jestesmy na planszy i liczba ruchow wieksza od 0
                let out = false;//czy jakikolwiek warunek falszywy
                for (let j = 0; j < mov.rules.length; j++) {//sprawdz wszystkie warunki
                    if (!this.set_of_condition_moves[mov.rules[j]](control, row, col, a_row, a_col)) { //jezeli jakikolwiek nie prawdziwy wyjdzź
                        out = true;
                        break;
                    }
                }

                if (out)//wyjdz jesli jakikolwie nie prawdziwy
                    break;
                let nGame = this.copyGame(control);
                if (this.predict_move(nGame, row, col, a_row, a_col, i))//sprawdz czy nastepny ruch nie jest pod szachem
                    every_p_moves[a_row][a_col].push({id, i});//zaznacz ruch na planszy}
                if (this.get_id_piece(a_row, a_col) !== -1)//jezeli znajduje sie figura na danym polu przerwij
                    break;
            }
        }

    }

    set_every_move(control, every_p_moves) {
        let main = false;
        if (typeof every_p_moves !== "undefined") {
            main = true;
            every_p_moves.splice(0, 1);
        }
        every_p_moves = new Array(this.get_rows())
        for (let i = 0; i < this.get_rows(); i++) {
            every_p_moves[i] = new Array(this.board[i].length)
            for (let j = 0; j < this.board[i].length; j++)
                every_p_moves[i][j] = new Array(0);
        }
        for (let row = 0; row < this.get_rows(); row++)
            for (let col = 0; col < this.get_cols(); col++) {
                let piece = this.get_piece(row, col);
                if (piece !== null) {
                    this.set_move_for_piece(row, col, control, every_p_moves);
                }
            }
        if (!main)
            control.game.every_p_moves = every_p_moves;
        //sprawdzenia czy roszada
        if (control.Is_it_check(this.board, every_p_moves)) {
            for (let i = 0; i < this.get_rows(); i++)
                for (let j = 0; j < this.get_cols(); j++)
                    for (let k = 0; k < every_p_moves[i][j].length; k++)
                        if (this.set_of_check_mate_piece.includes(every_p_moves[i][j][k].id) && (every_p_moves[i][j][k].i === 9 || every_p_moves[i][j][k].i === 8))
                            every_p_moves[i][j].splice(k, 1);
        }
    }

    constructor(board, set_of_piece, set_of_types, set_of_check_mate_piece, set_of_conditions_moves, set_of_events) {
        this.board = board;
        this.set_of_piece = set_of_piece;
        this.set_of_types = set_of_types;
        this.set_of_check_mate_piece = set_of_check_mate_piece;
        this.set_of_condition_moves = set_of_conditions_moves;
        this.set_of_events = set_of_events;
        this.p_moves = new Array(this.get_rows())
        for (let i = 0; i < this.get_rows(); i++) {
            this.p_moves[i] = new Array(board[i].length)
            for (let j = 0; j < board[i].length; j++)
                this.p_moves[i][j] = -1;
        }
        this.every_p_moves = new Array(0)
    }


}