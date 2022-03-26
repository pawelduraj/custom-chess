
<script>
import Field from "./Field.vue";
export class Move{
  constructor(x, y, n, rules)
  {
    this.x = x;
    this.y = y;
    this.number = n;
    this.rules = rules;
  }
}
export class Type_of_piece
{
  constructor(name, image, moves) {
    this.name = name;
    this.moves = moves;
    this.image = image;
  }
}
export class piece
{
  constructor(Id, team, type) {
    //this.Id = Id;
    this.c_moves = 0;
    this.team = team;
    this.type = type;
  }

}
export class Chess_game
{
  board;
  set_of_piece;
  set_of_types;
  set_of_condition_moves;
  p_moves;
  get_rows() {
    return this.board.length;
  }
  get_cols() {
    return this.board[0].length;
  }
  get_piece(row, col)
  {
    return this.board[row][col];
  }
  set_piece(row, col, x)
  {
    this.board[row][col] = x;
  }
  is_possible_move(row, col)
  {
    return this.p_moves[row][col];
  }
  set_possible_move(row, col)
  {
    this.p_moves[row][col] = 1;
  }
  clear_possible_move()
  {
    for(let i = 0; i < this.get_rows(); i++)
      for(let j = 0; j < this.get_cols(); j++)
        this.p_moves[i][j] = 0;
  }
  get_image(row,col)
  {
    let id = this.get_piece(row,col);
    if(id === -1)
      if(this.is_possible_move(row,col) === 1)
        return "dot.png";
      else
        return "";
    if(this.set_of_piece[id].team === 0)
      return this.set_of_types[this.set_of_piece[id].type].image + "_w.png";
    else
      return this.set_of_types[this.set_of_piece[id].type].image + "_b.png";

  }
  constructor(board, set_of_piece, set_of_types, set_of_conditions_moves) {
    this.board = board;
    this.set_of_piece = set_of_piece;
    this.set_of_types = set_of_types;
    this.set_of_condition_moves = set_of_conditions_moves;
    this.p_moves = new Array(this.get_rows())
    for(let i = 0; i < this.get_rows(); i++)
    {
      this.p_moves[i] = new Array(board[i].length)
      for(let j = 0; j < board[i].length; j++)
        this.p_moves[i][j] = 0;
    }
  }


}
export default {
  name: "ChessBoard",

  data() {
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
      new Type_of_piece("king", "king", [new Move(1, 0, 1,[2]), new Move(0,1, 1, [2]), new Move(-1, 0, 1, [2]), new Move(0, -1, 1,[2]), new Move(1, 1, 1, [2]), new Move(1, -1, 1, [2]), new Move(-1, 1, 1, [2]), new Move(-1, -1, 1, [2])]),
      new Type_of_piece("queen", "queen", [new Move(1, 0, -1,[2]), new Move(0,1, -1, [2]), new Move(-1, 0, -1, [2]), new Move(0, -1, -1,[2]), new Move(1, 1, -1, [2]), new Move(1, -1, -1, [2]), new Move(-1, 1, -1, [2]), new Move(-1, -1, -1, [2])]),
      new Type_of_piece("bishop", "bishop", [new Move(1, 1, -1, [2]), new Move(1, -1, -1, [2]), new Move(-1, 1, -1, [2]), new Move(-1, -1, -1, [2])]),
      new Type_of_piece("knight", "knight", [new Move(1, 2, 1, [2]), new Move(2, 1, 1, [2]), new Move(-1, -2, 1, [2]), new Move(-2, -1, 1, [2]), new Move(-1, 2, 1, [2]), new Move(-2, 1, 1, [2]), new Move(1, -2, 1, [2]), new Move(2, -1, 1, [2]),]),
      new Type_of_piece("rook", "rook", [new Move(1, 0, -1,[2]), new Move(0,1, -1, [2]), new Move(-1, 0, -1, [2]), new Move(0, -1, -1,[2])]),
      new Type_of_piece("pawn_go_down", "pawn", [new Move(1, 0, 1, [2, 3]), new Move(2, 0, 1, [0, 2, 3]), new Move(1, 1, 1, [1, 2,]), new Move(1, -1, 1, [1, 2,])]),
      new Type_of_piece("pawn_go_up", "pawn", [new Move(-1, 0, 1, [2, 3]), new Move(-2, 0, 1, [0, 2, 3]), new Move(-1, -1, 1, [1, 2,]), new Move(-1, 1, 1, [1, 2,])])]
    // eslint-disable-next-line no-unused-vars
    let f_only_0moves = function(Game, from_x, from_y, to_x, to_y)
    {
      return (Game.set_of_piece[Game.get_piece(from_x, from_y)].c_moves === 0)
    }
    let only_hit = function(Game, from_x, from_y, to_x, to_y)
    {
      if(Game.get_piece(to_x, to_y) === -1)
        return false
      return (Game.set_of_piece[Game.get_piece(from_x, from_y)].team !== Game.set_of_piece[Game.get_piece(to_x, to_y)].team)
    }
    let hit_not_friend = function (Game, from_x, from_y, to_x, to_y)
    {
      if(Game.get_piece(to_x, to_y) === -1)
        return true;
      return (Game.set_of_piece[Game.get_piece(from_x, from_y)].team !== Game.set_of_piece[Game.get_piece(to_x, to_y)].team)

    }
    let not_hit = function(Game, from_x, from_y, to_x, to_y)
    {
      return (Game.get_piece(to_x, to_y) === -1);
    }

    let functions = [f_only_0moves, only_hit, hit_not_friend, not_hit];
    return {
      game: new Chess_game([
        [10, 12, 8, 15, 14, 9, 13, 11],
        [24,25, 26, 27, 28, 29, 30, 31],
        [-1,-1, -1, -1, -1, -1, -1, -1],
        [-1,-1, -1, -1, -1, -1, -1, -1],
        [-1,-1, -1, -1, -1, -1, -1, -1],
        [-1,-1, -1, -1, -1, -1, -1, -1],
        [16,17, 18, 19, 20, 21, 22, 23],
        [2,4, 0, 7, 6, 1, 5, 3],
      ], pieces, Types, functions),
      f_row: -1,
      f_col: -1,
      reset: false
    }
  },
  methods:
      {
        show_possible_move(row, col) {
          let id = this.game.get_piece(row, col);
          let f_id = this.game.set_of_piece[id].type;
          for (let i = 0; i < this.game.set_of_types[f_id].moves.length; i++) {
            let mov = this.game.set_of_types[f_id].moves[i];
            let count = mov.number;
              let a_row = row + mov.x;
              let a_col = col + mov.y;
              for (; a_row >= 0 && a_col >= 0 && a_row < this.game.get_rows() && a_col < this.game.get_cols() && count !== 0; a_row += mov.x, a_col += mov.y, count--) {
                let out = false;
                for (let j = 0; j < mov.rules.length; j++) {
                  if (!this.game.set_of_condition_moves[mov.rules[j]](this.game, row, col, a_row, a_col)) {
                    out = true;
                    break;
                  }
                }
                if (out)
                  break;
                this.game.set_possible_move(a_row,a_col);
                if (this.game.get_piece(a_row, a_col) !== -1)
                  break;
              }
          }
        },
        clear_dots()
        {
          this.game.clear_possible_move()
        },
        move(value)
        {
          if(this.f_row === -1)
          {
            if(this.game.get_piece(value.row,value.col) === -1)
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
              if(this.game.p_moves[value.row][value.col] === 1)
              {
                this.game.set_of_piece[this.game.get_piece(this.f_row,this.f_col)].c_moves++;
                this.game.set_piece(value.row,value.col, this.game.get_piece(this.f_row,this.f_col));
                this.game.set_piece(this.f_row,this.f_col, -1);
              }
            }
            this.clear_dots();
            this.f_row = -1;
            this.f_col = -1;
            this.reset = !this.reset;
          }
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
  <div class = "row"  v-for = "row in game.get_rows()" :key="row"><Field v-for = "col in game.get_rows()" :key = col :row=row-1 :col=col-1 :image="game.get_image(row - 1, col - 1)"  :reset = reset @childToParent="move" /></div>
  </div>
</template>
<style>
.row *{
  display: inline-block;
}

</style>