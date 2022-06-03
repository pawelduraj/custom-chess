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
import EndScreen from "@/components/EndScreen";

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
      drawAct: false
    }
  },
  methods:
      {

        Interaction() {
          switch (this.message)
          {
            case 0:
              this.game_controll.look_back();
              break;
            case 1:
              this.game_controll.look_forward();
              break;
            case 2:
              if(this.online)
                this.$api.offerDraw();
              break;
            case 3:
              this.game_controll.Surrender();
              break;
          }
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
            new Type_of_piece("knight", "knight", [new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], [])]),
            new Type_of_piece("rook", "rook", [new Move(1, 0, -1, [2], []), new Move(0, 1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1, [2], [])]),
            new Type_of_piece("pawn_go_down", "pawn", [new Move(1, 0, 1, [2, 3], []), new Move(2, 0, 1, [0, 2, 3], []), new Move(1, 1, 1, [1, 2,], []), new Move(1, -1, 1, [1, 2,], []), new Move(1, -1, 1, [2, 5], [0]), new Move(1, 1, 1, [2, 5], [0])]),
            new Type_of_piece("pawn_go_up", "pawn", [new Move(-1, 0, 1, [2, 3], []), new Move(-2, 0, 1, [0, 2, 3], []), new Move(-1, -1, 1, [1, 2,], []), new Move(-1, 1, 1, [1, 2,], []), new Move(-1, -1, 1, [2, 4], [0]), new Move(-1, 1, 1, [2, 4], [0])]),


            new Type_of_piece("amazon", "amazon", [new Move(1, 0, -1, [2], []), new Move(0, 1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1, [2], []), new Move(1, 1, -1, [2], []), new Move(1, -1, -1, [2], []), new Move(-1, 1, -1, [2], []), new Move(-1, -1, -1, [2], []), new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], []),]),
            new Type_of_piece("archbishop", "archbishop", [new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], []), new Move(1, 1, -1, [2], []), new Move(1, -1, -1, [2], []), new Move(-1, 1, -1, [2], []), new Move(-1, -1, -1, [2], [])]),
            new Type_of_piece("chancellor", "chancellor", [new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], []), new Move(1, 0, -1, [2], []), new Move(0, 1, -1, [2], []), new Move(-1, 0, -1, [2], []), new Move(0, -1, -1, [2], [])]),
            new Type_of_piece("centaur", "centaur", [new Move(1, 2, 1, [2], []), new Move(2, 1, 1, [2], []), new Move(-1, -2, 1, [2], []), new Move(-2, -1, 1, [2], []), new Move(-1, 2, 1, [2], []), new Move(-2, 1, 1, [2], []), new Move(1, -2, 1, [2], []), new Move(2, -1, 1, [2], []), new Move(1, 0, 1, [2], []), new Move(0, 1, 1, [2], []), new Move(-1, 0, 1, [2], []), new Move(0, -1, 1, [2], []), new Move(1, 1, 1, [2], []), new Move(1, -1, 1, [2], []), new Move(-1, 1, 1, [2], []), new Move(-1, -1, 1, [2], [])]),
            new Type_of_piece("nightrider", "nightrider", [new Move(1, 2, -1, [2], []), new Move(2, 1, -1, [2], []), new Move(-1, -2, -1, [2], []), new Move(-2, -1, -1, [2], []), new Move(-1, 2, -1, [2], []), new Move(-2, 1, -1, [2], []), new Move(1, -2, -1, [2], []), new Move(2, -1, -1, [2], [])]),
            new Type_of_piece("berolinapawn_go_down", "berolinapawn", [new Move(1, 0, 1, [1, 2], []), new Move(1, 1, 1, [2, 3], []), new Move(1, -1, 1, [2, 3], []), new Move(2, 2, 1, [0, 2, 3], []), new Move(2, -2, 1, [0, 2, 3], [])]),
            new Type_of_piece("berolinapawn_go_up", "berolinapawn", [new Move(-1, 0, 1, [1, 2], []), new Move(-1, -1, 1, [2, 3], []), new Move(-1, 1, 1, [2, 3], []), new Move(-2, -2, 1, [0, 2, 3], []), new Move(-2, 2, 1, [0, 2, 3], [])])

          ]

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
            case "AZ":
              return 7;
            case "AB":
              return 8;
            case "CC":
              return 9;
            case "CT":
              return 10;
            case "NR":
              return 11;
            case "BP":
              if(P.color === 1)
                return 12;
              else
                return 13;
          }
        },
        move(value) {
          this.game_controll.move(value, this.game_controll.myTeam);
        },
        getRowPaintIdx(row){
          if(this.game_controll.myTeam === 0 || this.game_controll.myTeam === -1 )
            return row;
          else
            return this.game_controll.game.get_rows() - row + 1;
        },
        getColPaintIdx(col){
          if(this.game_controll.myTeam === 0 || this.game_controll.myTeam === -1 )
            return col;
          else
            return this.game_controll.game.get_cols() - col + 1;
        },
        drawDecison(accept)
        {
          this.drawAct = false;
          this.$api.answerDraw(accept);
          if(accept)
            this.game_controll.GameStatus.setEnd(-1, 4);
        },
      },
  components:
      {
        EndScreen,
        Field
      }
}
</script>


<template>
  <div id="chessBoard">
    <div class="row_chess" v-for="row in game_controll.game.get_rows()" :key= "getRowPaintIdx(row)">
      <Field v-for="col in game_controll.game.get_cols()" :ref="(getRowPaintIdx(row) - 1) * 8 + (getColPaintIdx(col) - 1)" :key=col :row=getRowPaintIdx(row)-1
             :col=getColPaintIdx(col)-1
             :image="game_controll.game.get_image(getRowPaintIdx(row) - 1, getColPaintIdx(col) - 1)" :reset=game_controll.reset @childToParent="move"/>
    </div>
    <EndScreen :GameStatus = "game_controll.GameStatus" />

    <v-dialog v-model=drawAct persistent max-width="300">
      <v-card>
        <v-card-title>Draw Offer</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" min-width="100" @click="drawDecison(true)" class="mb-3">
            Accept
          </v-btn>
          <v-btn color="error" min-width="100" @click="drawDecison(false)" class="mb-3">
            Reject
          </v-btn>
          <v-spacer/>
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