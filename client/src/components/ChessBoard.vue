<script>
import Field from "./Field.vue";
import {Move, Type_of_piece, Piece} from "@/scripts/chessboard/objects";
import {Game_Control} from "@/scripts/chessboard/GameControll"
import {Chess_game} from "@/scripts/chessboard/ChessBoard"
import {in_pass_event, Castling_kingside_event, Castling_queenside_event, change_pawn} from "@/scripts/chessboard/events"
import {f_only_0moves, only_hit, hit_not_friend, not_hit, in_pass_up, in_pass_down, Castling_kingside_cond, Castling_queenside_cond} from "@/scripts/chessboard/conditions"

export default {
  name: "ChessBoard",
//-------------------------------------------------------------------------------------------------------------------
  data() {//utworzenie przykladowej gry
    let pieces = [
      new Piece(0, 2),
      new Piece(0, 2),
      new Piece(0, 4),
      new Piece(0, 4),
      new Piece(0, 3),
      new Piece(0, 3),
      new Piece(0, 1),
      new Piece(0, 0),

      new Piece(1, 2),
      new Piece(1, 2),
      new Piece(1, 4),
      new Piece(1, 4),
      new Piece(1, 3),
      new Piece(1, 3),
      new Piece(1, 1),
      new Piece(1, 0),

      new Piece(0, 6),
      new Piece(0, 6),
      new Piece(0, 6),
      new Piece(0, 6),
      new Piece(0, 6),
      new Piece(0, 6),
      new Piece(0, 6),
      new Piece(0, 6),


      new Piece(1, 5),
      new Piece(1, 5),
      new Piece(1, 5),
      new Piece(1, 5),
      new Piece(1, 5),
      new Piece(1, 5),
      new Piece(1, 5),
      new Piece(1, 5)
    ]
    let Types = [
      new Type_of_piece("king", "king", [new Move(1, 0, 1, [2], []), new Move(0, 1, 1, [2], []), new Move(-1, 0, 1, [2], []), new Move(0, -1, 1, [2], []), new Move(1, 1, 1, [2], []), new Move(1, -1, 1, [2], []), new Move(-1, 1, 1, [2], []), new Move(-1, -1, 1, [2], []), new Move(0, -2, 1, [6], [1]), new Move(0, 2, 1, [7], [2])]),
      new Type_of_piece("queen", "queen", [new Move(1, 0, -1, [2], []), new Move(0, 1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1, [2], []), new Move(1, 1, -1, [2], []), new Move(1, -1, -1, [2], []), new Move(-1, 1, -1, [2], []), new Move(-1, -1, -1, [2], [])]),
      new Type_of_piece("bishop", "bishop", [new Move(1, 1, -1, [2], []), new Move(1, -1, -1, [2], []), new Move(-1, 1, -1, [2], []), new Move(-1, -1, -1, [2], [])]),
      new Type_of_piece("knight", "knight", [new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], []),]),
      new Type_of_piece("rook", "rook", [new Move(1, 0, -1, [2], []), new Move(0, 1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1, [2], [])]),
      new Type_of_piece("pawn_go_down", "pawn", [new Move(1, 0, 1, [2, 3], []), new Move(2, 0, 1, [0, 2, 3], []), new Move(1, 1, 1, [1, 2,], []), new Move(1, -1, 1, [1, 2,], []), new Move(1, -1, 1, [2, 5], [0]), new Move(1, 1, 1, [2, 5], [0])]),
      new Type_of_piece("pawn_go_up", "pawn", [new Move(-1, 0, 1, [2, 3], []), new Move(-2, 0, 1, [0, 2, 3], []), new Move(-1, -1, 1, [1, 2,], []), new Move(-1, 1, 1, [1, 2,], []), new Move(-1, -1, 1, [2, 4], [0]), new Move(-1, 1, 1, [2, 4], [0])])]

    let conditions = [f_only_0moves, only_hit, hit_not_friend, not_hit, in_pass_up, in_pass_down, Castling_kingside_cond, Castling_queenside_cond];
    let events = [in_pass_event, Castling_kingside_event, Castling_queenside_event];
    let rules = [];
    let events_general = [change_pawn];
    let set_of_check_mate_piece = [7, 15];
    let game = new Chess_game([
      [10, 12, 8, 15, 14, 9, 13, 11],
      [24, 25, 26, 27, 28, 29, 30, 31],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [16, 17, 18, 19, 20, 21, 22, 23],
      [2, 4, 0, 7, 6, 1, 5, 3],
    ], pieces, Types, set_of_check_mate_piece, conditions, events);
    let game_controll = new Game_Control(game, rules, events_general);
    return {
      game,
      game_controll,
    }
  },
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  methods:
      {
        move(value) {
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
    <div class="row" v-for="row in game.get_rows()" :key=row>
      <Field v-for="col in game.get_rows()" :ref="(row - 1) * 8 + (col - 1)" :key=col :row=row-1 :col=col-1
             :image="game.get_image(row - 1, col - 1)" :reset=game_controll.reset @childToParent="move"/>
    </div>
    <p>{{game_controll.end_game_control()}}</p>
    <p>{{game_controll.Is_it_check(game_controll.game.board, game_controll.game.every_p_moves)}}</p>
  </div>
</template>
<style>
.row * {
  display: inline-block;
}

</style>