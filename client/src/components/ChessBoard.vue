
<script>
import Field from "./Field.vue";
export class Move{ //klasa ruchu bierki
  constructor(x, y, n, rules, events)
  {
    this.x = x; //przesuniecie w osi x
    this.y = y; //przesunie w osi y
    this.number = n; //ilosc powotrzen
    this.rules = rules; //tablica zasad ruchu
    this.events = events; //funkcje wykonane po ruchu
  }
}
export class Type_of_piece//rodzaj bierki
{
  constructor(name, image, moves) {
    this.name = name;//nazwa
    this.moves = moves;//tablica mozliwych ruchow
    this.image = image;//grafika
  }
}
export class piece//Bierka
{
  constructor(Id, team, type) {
    //this.Id = Id;
    this.c_moves = 0;//licznik ruchow
    this.team = team;//zespol
    this.type = type;//typ bierki
  }

}
export class Hist_record//zapisana poprzednie ustawienie na szachownicy
{
  constructor(board) {
    this.board= board;
  }
}
export class Game_Control//klasa kontrulujaca zasady gry
{
  reset;
  game;
  history;
  rules;
  n_move;
  f_row;
  f_col;
  idx_history;
  constructor(game, rules) {
    this.game = game; //gra
    this.history = new Array();//tablica poprzednich ustawien
    this.rules = rules;//zasady ogolne gry
    this.n_move = 0;
    this.f_row = -1;
    this.f_col = -1;
    this.reset = false;
    this.history.unshift(this.copy_board(game.board));
    this.idx_history = 0;
  }
  /*Is_it_check(Board, Figure)
  {

  }*/
  is_your_turn(Id_piece)
  {
    if(this.game.set_of_piece[Id_piece].team === this.n_move % 2)
      return true;
    else
      return false;
  }
  copy_board(Record)
  {
    let temp = new Array(Record.length);
    for(let i = 0; i < Record.length; i++)
    {
      let temp_2 = new Array(Record[i].length)
      for(let j = 0; j < Record[i].length; j++)
      {
        temp_2[j] = Record[i][j];
      }
      temp[i] = temp_2;
    }
    return temp;
  }
  accept_move(Board)
  {
    this.history.unshift(this.copy_board(Board));
    for(let i = 0; i < this.rules.length; i++)
    {
      this.rules[i](this);
    }
  }
  look_back()
  {
    if(this.idx_history !== this.history - 1)
    {
      this.idx_history++;
      this.game.board = this.history[this.idx_history];
    }
  }
  look_forward()
  {
    if(this.idx_history !== 0)
    {
      this.idx_history--;
      this.game.board = this.history[this.idx_history];
    }
  }
  curren_position()
  {
    this.idx_history = 0;
    this.game.board = this.history[this.idx_history];
  }
  show_possible_move(row, col) {
    let id = this.game.get_id_piece(row, col); //id akytwnej figury
    if(id === -1)
      return;
    let f_id = this.game.set_of_piece[id].type; //id typu figury
    for (let i = 0; i < this.game.set_of_types[f_id].moves.length; i++) { //dla kazdego typu ruchu dla typu figury
      let mov = this.game.set_of_types[f_id].moves[i];//analizywany ruch
      let count = mov.number;//liczba pol przesniecia
      let a_row = row + mov.x;//pierwsze mozliwe pole do przesuniecia
      let a_col = col + mov.y;
      for (; a_row >= 0 && a_col >= 0 && a_row < this.game.get_rows() && a_col < this.game.get_cols() && count !== 0; a_row += mov.x, a_col += mov.y, count--) { //dopoki nadal jestesmy na planszy i liczba ruchow wieksza od 0
        let out = false;//czy jakikolwiek warunek falszywy
        for (let j = 0; j < mov.rules.length; j++) {//sprawdz wszystkie warunki
          if (!this.game.set_of_condition_moves[mov.rules[j]](this, row, col, a_row, a_col)) { //jezeli jakikolwiek nie prawdziwy wyjdzź
            out = true;
            break;
          }
        }
        if (out)//wyjdz jesli jakikolwie nie prawdziwy
          break;
        this.game.set_possible_move(a_row,a_col, i);//zaznacz ruch na planszy
        if (this.game.get_id_piece(a_row, a_col) !== -1)//jezeli znajduje sie figura na danym polu przerwij
          break;
      }
    }
  }
  move(value)
  {
    if(this.idx_history !== 0)
    {
      this.curren_position();
      return;
    }
    if(this.f_row === -1)
    {
      if(this.game.get_id_piece(value.row,value.col) === -1 || !this.is_your_turn(this.game.get_id_piece(value.row,value.col)))
        return;
      this.f_row = value.row;
      this.f_col = value.col;
      this.show_possible_move(value.row, value.col);
      this.reset = !this.reset;
    }
    else
    {
      if(this.f_row !== value.row || this.f_col !== value.col)
      {
        if(this.game.p_moves[value.row][value.col] !== -1)
        {
          let My_piece = this.game.get_id_piece(this.f_row,this.f_col);
          this.game.set_of_piece[My_piece].c_moves++;
          this.game.set_piece(value.row,value.col, My_piece);
          this.game.set_piece(this.f_row,this.f_col, -1);
          let events = this.game.set_of_types[this.game.set_of_piece[My_piece].type].moves[this.game.p_moves[value.row][value.col]].events;
          for(let i = 0; i < events.length; i++)
          {
            this.game.set_of_events[events[i]](this, this.f_row, this.f_col, value.row, value.col)
          }
          this.accept_move(this.game.board);
          this.n_move++;
        }
      }
      this.game.clear_possible_move();
      this.f_row = -1;
      this.f_col = -1;
      this.reset = !this.reset;
    }
  }
}
export class Chess_game//klasa gry glownej
{
  board;
  set_of_piece;
  set_of_types;
  set_of_condition_moves;
  set_of_events;
  p_moves;
  get_rows() {
    return this.board.length;
  }
  get_cols() {
    return this.board[0].length;
  }
  get_id_piece(row, col)
  {
    return this.board[row][col];
  }
  get_piece(row, col)
  {
    let id = this.get_id_piece(row, col);
    if(id === -1)
      return null;
    else
      return this.set_of_piece[id];
  }
  set_piece(row, col, x)
  {
    this.board[row][col] = x;
  }
  is_possible_move(row, col)
  {
    return this.p_moves[row][col];
  }
  set_possible_move(row, col, mov)
  {
    this.p_moves[row][col] = mov;
  }
  clear_possible_move()
  {
    for(let i = 0; i < this.get_rows(); i++)
      for(let j = 0; j < this.get_cols(); j++)
        this.p_moves[i][j] = -1;
  }
  get_image(row,col)
  {
    let id = this.get_id_piece(row,col);
    if(id === -1)
      if(this.is_possible_move(row,col) !== -1)
        return "dot.png";
      else
        return "";
    if(this.set_of_piece[id].team === 0)
      return this.set_of_types[this.set_of_piece[id].type].image + "_w.png";
    else
      return this.set_of_types[this.set_of_piece[id].type].image + "_b.png";

  }
  constructor(board, set_of_piece, set_of_types, set_of_conditions_moves, set_of_events) {
    this.board = board;
    this.set_of_piece = set_of_piece;
    this.set_of_types = set_of_types;
    this.set_of_condition_moves = set_of_conditions_moves;
    this.set_of_events = set_of_events;
    this.p_moves = new Array(this.get_rows())
    for(let i = 0; i < this.get_rows(); i++)
    {
      this.p_moves[i] = new Array(board[i].length)
      for(let j = 0; j < board[i].length; j++)
        this.p_moves[i][j] = -1;
    }
  }


}
export default {
  name: "ChessBoard",
//-------------------------------------------------------------------------------------------------------------------
  data() {//utworzenie przykladowej gry
    let pieces = [
      new piece(0, 0, 2),
      new piece(1, 0, 2),
      new piece(2, 0, 4),
      new piece(3, 0, 4),
      new piece(4, 0, 3),
      new piece(5, 0, 3),
      new piece(6, 0, 1),
      new piece(7, 0, 0),

      new piece(8, 1, 2),
      new piece(9, 1, 2),
      new piece(10, 1, 4),
      new piece(11, 1, 4),
      new piece(12, 1, 3),
      new piece(13, 1, 3),
      new piece(14, 1, 1),
      new piece(15, 1, 0),

      new piece(16, 0, 6),
      new piece(17, 0, 6),
      new piece(18, 0, 6),
      new piece(19, 0, 6),
      new piece(20, 0, 6),
      new piece(21, 0, 6),
      new piece(22, 0, 6),
      new piece(23, 0, 6),


      new piece(24, 1, 5),
      new piece(25, 1, 5),
      new piece(26, 1, 5),
      new piece(27, 1, 5),
      new piece(28, 1, 5),
      new piece(29, 1, 5),
      new piece(30, 1, 5),
      new piece(31, 1, 5)
    ]
    let Types = [
      new Type_of_piece("king", "king", [new Move(1, 0, 1,[2], []), new Move(0,1, 1, [2], []), new Move(-1, 0, 1, [2], []), new Move(0, -1, 1,[2], []), new Move(1, 1, 1, [2], []), new Move(1, -1, 1, [2], []), new Move(-1, 1, 1, [2], []), new Move(-1, -1, 1, [2], []), new Move(0, -2 ,1, [6],[1]), new Move(0, 2 ,1, [7],[2])]),
      new Type_of_piece("queen", "queen", [new Move(1, 0, -1,[2], []), new Move(0,1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1,[2], []), new Move(1, 1, -1, [2], []), new Move(1, -1, -1, [2], []), new Move(-1, 1, -1, [2], []), new Move(-1, -1, -1, [2], [])]),
      new Type_of_piece("bishop", "bishop", [new Move(1, 1, -1, [2], []), new Move(1, -1, -1, [2], []), new Move(-1, 1, -1, [2], []), new Move(-1, -1, -1, [2], [])]),
      new Type_of_piece("knight", "knight", [new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], []),]),
      new Type_of_piece("rook", "rook", [new Move(1, 0, -1,[2], []), new Move(0,1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1,[2], [])]),
      new Type_of_piece("pawn_go_down", "pawn", [new Move(1, 0, 1, [2, 3], []), new Move(2, 0, 1, [0, 2, 3], []), new Move(1, 1, 1, [1, 2,], []), new Move(1, -1, 1, [1, 2,], []), new Move(1, -1, 1, [2,5], [0]), new Move(1, 1, 1, [2, 5], [0])]),
      new Type_of_piece("pawn_go_up", "pawn", [new Move(-1, 0, 1, [2, 3], []), new Move(-2, 0, 1, [0, 2, 3], []), new Move(-1, -1, 1, [1, 2,], []), new Move(-1, 1, 1, [1, 2,], []), new Move(-1, -1, 1, [2,4], [0]), new Move(-1, 1, 1, [2, 4], [0])])]
    // eslint-disable-next-line no-unused-vars
    let f_only_0moves = function(Game, from_x, from_y, to_x, to_y)
    {
      return (Game.game.get_piece(from_x, from_y).c_moves === 0)
    }
    let only_hit = function(Game, from_x, from_y, to_x, to_y)
    {
      if(Game.game.get_id_piece(to_x, to_y) === -1)
        return false
      return (Game.game.get_piece(from_x, from_y).team !== Game.game.get_piece(to_x, to_y).team)
    }
    let hit_not_friend = function (Game, from_x, from_y, to_x, to_y)
    {
      if(Game.game.get_id_piece(to_x, to_y) === -1)
        return true;
      return (Game.game.get_piece(from_x, from_y).team !== Game.game.get_piece(to_x, to_y).team)

    }
    let not_hit = function(Game, from_x, from_y, to_x, to_y)
    {
      return (Game.game.get_id_piece(to_x, to_y) === -1);
    }
    let in_pass_up = function(Game, from_x, from_y, to_x, to_y)
    {
      let p = Game.game.get_id_piece(from_x, to_y);
      if(p == -1 || to_x < 1 || Game.game.set_of_piece[p].team === Game.game.get_piece(from_x, from_y).team) //czy istnije figura do bicia || czy mozna sie ruszyc dalej || czy naleza do przediwnych druzyn
        return false;
      if(Game.game.set_of_piece[p].type === 5)
      {
        return p === Game.history[1][to_x - 1][to_y];
      }
      return false;
    }
    let in_pass_down = function(Game, from_x, from_y, to_x, to_y)
    {
      let p = Game.game.get_id_piece(from_x, to_y);
      if(p === -1 || to_x + 1 === Game.game.get_rows() || Game.game.set_of_piece[p].team === Game.game.get_piece(from_x, from_y).team) //czy istnije figura do bicia || czy mozna sie ruszyc dalej || czy naleza do przediwnych druzyn
        return false;
      if(Game.game.set_of_piece[p].type === 6)
      {
        return p === Game.history[1][to_x + 1][to_y];
      }
      return false;
    }
    // eslint-disable-next-line no-unused-vars
    let Castling_kingside_cond = function(Game, from_x, from_y, to_x, to_y)
    {
      if(Game.game.get_piece(from_x, from_y).c_moves !== 0)
        return false;
      for(let i = from_y - 1; i > 0 ; i--)
        if(Game.game.get_id_piece(from_x, i) !== -1)
          return false;
      let rook = Game.game.get_id_piece(from_x, 0);
      if(rook === -1)
        return false;
      return Game.game.set_of_piece[rook].c_moves === 0 && Game.game.set_of_piece[rook].type === 4
    }
    // eslint-disable-next-line no-unused-vars
    let Castling_queenside_cond = function(Game, from_x, from_y, to_x, to_y)
    {
      if(Game.game.get_piece(from_x, from_y).c_moves !== 0)
        return false;
      for(let i = from_y + 1; i < Game.game.get_cols() - 1 ; i++)
        if(Game.game.get_id_piece(from_x, i) !== -1)
          return false;
      let rook = Game.game.get_id_piece(from_x, Game.game.get_cols() - 1);
      if(rook === -1)
        return false;
      return Game.game.set_of_piece[rook].c_moves === 0 && Game.game.set_of_piece[rook].type === 4
    }
    let in_pass_event = function(Game, from_x, from_y, to_x, to_y)
    {
      Game.game.set_piece(from_x, to_y, -1);
    }
    let Castling_kingside_event = function(Game, from_x, from_y, to_x, to_y)
    {
      let rook = Game.game.get_id_piece(from_x, 0);
      Game.game.set_piece(from_x, to_y + 1, rook);
      Game.game.set_piece(from_x, 0, -1);
      Game.game.set_of_piece[rook].c_moves++;
    }
    let Castling_queenside_event = function(Game, from_x, from_y, to_x, to_y)
    {
      let rook = Game.game.get_id_piece(from_x, Game.game.get_cols() - 1);
      Game.game.set_piece(from_x, to_y - 1, rook);
      Game.game.set_piece(from_x, Game.game.get_cols() - 1, -1);
      Game.game.set_of_piece[rook].c_moves++;
    }
    let change_pawn = function(Game)
    {
      for(let i = 0; i < Game.game.get_cols(); i++)
      {
        let piece = Game.game.get_piece(0, i);
        if(piece === null)
          continue;
        if(piece.type === 6)
        {
          piece.type = 1;
        }
      }
      for(let i = 0; i < Game.game.get_cols(); i++)
      {
        let piece = Game.game.get_piece(Game.game.get_cols() - 1, i);
        if(piece === null)
          continue;
        if(piece.type === 5)
        {
          piece.type = 1;
        }
      }
    }
    let pat_condition = function(Game)
    {
      for(let i = 0; i < Game.game.get_rows(); i++)
        for(let j = 0; j < Game.game.get_cols(); j++)
        {
          let piece = Game.game.get_piece(i, j);
          if(piece === null)
            continue;
          if(piece.team !== Game.n_move % 2)
            continue;
          let type = Game.game.set_of_types[piece.type];
          for(let m = 0; m < type.moves.length; m++)
          {
            let mov = type.moves[m];
            let m_x = i + mov.x;
            let m_y = j + mov.y;
            if(m_x < 0 || m_y < 0 || m_x >= Game.game.get_rows() || m_y >= Game.game.get_cols())
              continue;
            let accept = true;
            for(let c = 0; c < mov.rules.length; c++)
            {
              if (!Game.game.set_of_condition_moves[mov.rules[c]](Game, i, j, m_x, m_y))
              {
                accept = false;
                break;
              }
            }
            if(accept)
              return false;
          }
        }
      return true;
    }
    let conditions = [f_only_0moves, only_hit, hit_not_friend, not_hit, in_pass_up, in_pass_down, Castling_kingside_cond, Castling_queenside_cond];
    let events = [in_pass_event, Castling_kingside_event, Castling_queenside_event];
    let rules = [change_pawn, pat_condition];
    let game = new Chess_game([
          [10, 12, 8, 15, 14, 9, 13, 11],
          [24,25, 26, 27, 28, 29, 30, 31],
          [-1,-1, -1, -1, -1, -1, -1, -1],
          [-1,-1, -1, -1, -1, -1, -1, -1],
          [-1,-1, -1, -1, -1, -1, -1, -1],
          [-1,-1, -1, -1, -1, -1, -1, -1],
          [16,17, 18, 19, 20, 21, 22, 23],
          [2,4, 0, 7, 6, 1, 5, 3],
        ], pieces, Types, conditions, events);
    let game_controll =  new Game_Control(game, rules);
    return {
      game,
      game_controll,
    }
  },
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  methods:
      {
        move(value)
        {
          this.game_controll.move(value);
        }
      },
  components:
      {
        Field
      }
}
</script>


<template>
  <div>
  <div class = "row"  v-for = "row in game.get_rows()" :key="row"><Field v-for = "col in game.get_rows()" :key = col :row=row-1 :col=col-1 :image="game.get_image(row - 1, col - 1)"  :reset = game_controll.reset @childToParent="move" /></div>
  </div>
</template>
<style>
.row *{
  display: inline-block;
}

</style>