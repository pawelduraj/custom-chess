<script>
import Field from "./Field.vue";
import {Move, Type_of_piece, Piece} from "@/scripts/chessboard/objects";
import {Game_Control} from "@/scripts/chessboard/GameControll"
import {Chess_game} from "@/scripts/chessboard/ChessBoard"
import {
  in_pass_event,
  Castling_kingside_event,
  Castling_queenside_event,
  change_pawn
} from "@/scripts/chessboard/events"
import {
  f_only_0moves,
  only_hit,
  hit_not_friend,
  not_hit,
  in_pass_up,
  in_pass_down,
  Castling_kingside_cond,
  Castling_queenside_cond
} from "@/scripts/chessboard/conditions"
import {perpetualCheck, mateANDpat} from "@/scripts/chessboard/endConditions";

export default {
  name: "ChessBoard",

  props: {
    message: Number,
    reset: Boolean,
    online: Boolean,
    variant: Object,
  },
  watch: {
    'reset': function () {
      this.Interaction();
    },
  },
  data() {//utworzenie przykladowej gry
    let game_controll = this.Load(this.variant);

    return {
      game_controll,
    }
  },
  methods:
      {

        Interaction() {
          if (this.message === 0)
            this.game_controll.look_back();
          else if (this.message === 1)
            this.game_controll.look_forward();
        },
        changePawn(type) {
          this.game_controll.Interaction.on = false;
          this.game_controll.game.change_piece(this.game_controll.Interaction.in, type);
          this.game_controll.game.set_every_move(this.game_controll)
          this.game_controll.EndGameCheck()
        },
        Load(variant) {
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
          let endCondition = [mateANDpat, perpetualCheck];
          let set_of_check_mate_piece = Array(0);

          let row = variant.board.params[1].value;
          let col = variant.board.params[0].value;
          let Board = Array(row);
          for (let i = 0; i < row; i++)
            Board[i] = Array(col)
          let pieces = Array(variant.pieces.length)
          for (let i = 0; i < row; i++)
            for (let j = 0; j < col; j++)
              Board[i][j] = -1;
          for (let i = 0; i < pieces.length; i++) {

            pieces[i] = new Piece(variant.pieces[i].color, this.getType(variant.pieces[i]))
            if (variant.pieces[i].checkable)
              set_of_check_mate_piece.push(i);
            let p = this.getPosition(variant.pieces[i].field, row, col);
            Board[p.row][p.col] = i;
          }
          let game = new Chess_game(Board, pieces, Types, set_of_check_mate_piece, conditions, events);
          return new Game_Control(this, game, rules, events_general, endCondition, true);
        },
        getPosition(input, row, col) {
          let roww = Math.floor(input / col);
          let coll = input % col;
          return {row: row - roww - 1, col: coll}
        },
        getType(P) {
          let C = P.id;
          switch (C) {
            case 'K':
              return 0;
            case 'Q':
              return 1;
            case 'B':
              return 2;
            case 'N':
              return 3;
            case 'R':
              return 4;
            case 'P':
              if (P.color === 1)
                return 5;
              else
                return 6;
          }
        },
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
  <div id="chessBoard">
    <div class="row_chess" v-for="row in game_controll.game.get_rows()" :key=row>
      <Field v-for="col in game_controll.game.get_cols()" :ref="(row - 1) * 8 + (col - 1)" :key=col :row=row-1
             :col=col-1
             :image="game_controll.game.get_image(row - 1, col - 1)" :reset=game_controll.reset @childToParent="move"/>
    </div>
    <v-dialog
        v-model=game_controll.GameStatus.visable
        width="500">
      <v-card>
        <v-card-title class="text-h5">
          {{ game_controll.GameStatus.reason }}
        </v-card-title>

        <v-card-text>
          {{ game_controll.GameStatus.whoWin }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="red lighten-2"
              dark
              @click="game_controll.GameStatus.visable = false"
          >
            Wyjdź
          </v-btn>

          <v-btn
              color="red lighten-2"
              dark
              @click="game_controll.GameStatus.visable = false"
          >
            Zaproponuj rewanż
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model=game_controll.Interaction.on
        width="500">
      <v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <button
              color="red lighten-2"
              dark
              @click="changePawn(1)"
          >
            <img src="img/queen_b.png" alt="Rook"/>
          </button>

          <button
              color="red lighten-2"
              dark
              @click="changePawn(2)"
          >
            <img src="img/bishop_b.png" alt="Rook"/>
          </button>

          <button
              color="red lighten-2"
              dark
              @click="changePawn(3)"
          >
            <img src="img/knight_b.png" alt="Rook"/>
          </button>

          <button
              color="red lighten-2"
              dark
              @click="changePawn(4)"
          >
            <img src="img/rook_b.png" alt="Rook"/>
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.row_chess {
  display: flex;
  flex-wrap: nowrap;
  width: fit-content;
}

img {
  width: 70%;
}

#chessBoard {
  padding: 1%;
  background-color: black;
  width: min-content;
}

</style>