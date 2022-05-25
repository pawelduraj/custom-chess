
export class Game_Control//klasa kontrulujaca zasady gry
{
    reset;
    game;
    history;
    rules;
    events;
    n_move;
    f_row;
    f_col;
    idx_history;
    end_game;

    constructor(game, rules, events, isSet) {
        this.game = game; //gra
        this.history = new Array(0);//tablica poprzednich ustawien
        this.rules = rules;//zasady ogolne gry
        this.events = events;
        this.n_move = 0;
        this.f_row = -1;
        this.f_col = -1;
        this.reset = false;
        this.history.unshift(this.copy_board(game.board));
        this.idx_history = 0;
        if(isSet === false);
        else
            this.game.set_every_move(this);
        this.end_game = -1;
    }


    Is_it_check(Board, Move_Board)
    {
        if(Move_Board.length === 0)
            return false;
        for(let row = 0; row < this.game.get_rows(); row++)
            for(let col = 0; col < this.game.get_cols(); col++)
            {
                if(this.game.set_of_check_mate_piece.includes(Board[row][col]))
                {
                    for(let p = 0; p < Move_Board[row][col].length; p++)
                    {
                        if(this.game.set_of_piece[Move_Board[row][col][p].id].team !== this.game.set_of_piece[Board[row][col]].team)
                            return true;
                    }
                }
            }
        return false;
    }
    is_your_turn(Id_piece) {
        if (this.game.set_of_piece[Id_piece].team === this.n_move % 2)
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

    accept_move(Board) {
        this.history.unshift(this.copy_board(Board));
        for (let i = 0; i < this.events.length; i++) {
            this.events[i](this);
        }
        this.n_move++;
        this.game.set_every_move(this);

        let end_game = true;
        for(let row = 0; row < this.game.get_rows(); row++)
            for(let col = 0; col < this.game.get_cols(); col++)
                for(let i = 0; i < this.game.every_p_moves[row][col].length; i++)
                    if(this.game.set_of_piece[this.game.every_p_moves[row][col][i].id].team === this.n_move % 2)
                    {
                        end_game = false;
                        break;
                    }
        if(end_game)
        {
            this.end_game = (this.n_move + 1) % 2;
        }
    }

    look_back() {
        if (this.idx_history !== this.history - 1) {
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
        this.game.board = this.history[this.idx_history];
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
                let out = true;
                for(let evr = 0; evr < this.game.every_p_moves[a_row][a_col].length; evr++)
                {
                    if(this.game.every_p_moves[a_row][a_col][evr].id === id && this.game.every_p_moves[a_row][a_col][evr].i === i)
                    {
                        this.game.set_possible_move(a_row, a_col, i);//zaznacz ruch na planszy
                        out = false;
                        break;
                    }
                }
                if (out)//wyjdz jesli nie ma ruchu
                    break;

                if (this.game.get_id_piece(a_row, a_col) !== -1)//jezeli znajduje sie figura na danym polu przerwij
                    break;
            }
        }
    }

    move(value) {
        if (this.idx_history !== 0) {
            this.curren_position();
            return;
        }
        if (this.f_row === -1) {
            if (this.game.get_id_piece(value.row, value.col) === -1 || !this.is_your_turn(this.game.get_id_piece(value.row, value.col)) || this.end_game !== -1)
                return;
            this.f_row = value.row;
            this.f_col = value.col;
            this.show_possible_move(value.row, value.col);
            this.reset = !this.reset;
        } else {
            if (this.f_row !== value.row || this.f_col !== value.col) {
                if (this.game.p_moves[value.row][value.col] !== -1) {
                    let My_piece = this.game.get_id_piece(this.f_row, this.f_col);
                    this.game.set_of_piece[My_piece].c_moves++;
                    this.game.set_piece(value.row, value.col, My_piece);
                    this.game.set_piece(this.f_row, this.f_col, -1);
                    let events = this.game.set_of_types[this.game.set_of_piece[My_piece].type].moves[this.game.p_moves[value.row][value.col]].events;
                    for (let i = 0; i < events.length; i++) {
                        this.game.set_of_events[events[i]](this, this.f_row, this.f_col, value.row, value.col)
                    }
                    this.accept_move(this.game.board);
                }
            }
            this.game.clear_possible_move();
            this.f_row = -1;
            this.f_col = -1;
            this.reset = !this.reset;
        }
    }
    end_game_control()
    {
        if(this.end_game === -1)
            return "Gra trwa";
        if(this.end_game === 0)
            return "Bialy wygral";
        if(this.end_game === 0)
            return "Czarny wygral";
    }
}

