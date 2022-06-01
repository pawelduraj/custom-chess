<template>
  <v-container>
    <v-row align="top"
           justify="center">
      <v-col>
        <UserDetails/>
        <ChessBoard :variant=this.variant :online=2 :message="mChessBoard" :reset="resetChessBoard"
                    @messageFromChild="getMessageChessBoard"/>
        <UserDetails/>
      </v-col>
      <v-col>
        <GameDetails :message="mDetails" :reset="resetDetails" @messageFromChild="getMessageGameDetails"/>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import ChessBoard from '../components/ChessBoard.vue';
import UserDetails from "@/components/UserDetails";
import GameDetails from "@/components/GameDetails";

export default {
  name: 'Board',
  methods: {
    getMessageGameDetails(M) {
      if (M === 0) {
        this.mChessBoard = 0;

      } else if (M === 1) {
        this.mChessBoard = 1;
      } else
        return;
      this.resetChessBoard = !this.resetChessBoard;
    },
    getMessageChessBoard(M) {
      this.mDetails = M;
      this.resetDetails = !this.resetDetails;
    }
  },
  data() {
    let variant = {
      players: 2,
      board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
      pieces: [
        {id: 'R', checkable: false, color: 0, field: 0}, {id: 'R', checkable: false, color: 0, field: 7},
        {id: 'N', checkable: false, color: 0, field: 1}, {id: 'N', checkable: false, color: 0, field: 6},
        {id: 'B', checkable: false, color: 0, field: 2}, {id: 'B', checkable: false, color: 0, field: 5},
        {id: 'Q', checkable: false, color: 0, field: 3}, {id: 'K', checkable: true, color: 0, field: 4},
        {id: 'P', checkable: false, color: 0, field: 8}, {id: 'P', checkable: false, color: 0, field: 9},
        {id: 'P', checkable: false, color: 0, field: 10}, {id: 'P', checkable: false, color: 0, field: 11},
        {id: 'P', checkable: false, color: 0, field: 12}, {id: 'P', checkable: false, color: 0, field: 13},
        {id: 'P', checkable: false, color: 0, field: 14}, {id: 'P', checkable: false, color: 0, field: 15},
        {id: 'R', checkable: false, color: 1, field: 56}, {id: 'R', checkable: false, color: 1, field: 63},
        {id: 'N', checkable: false, color: 1, field: 57}, {id: 'N', checkable: false, color: 1, field: 62},
        {id: 'B', checkable: false, color: 1, field: 58}, {id: 'B', checkable: false, color: 1, field: 61},
        {id: 'Q', checkable: false, color: 1, field: 59}, {id: 'K', checkable: true, color: 1, field: 60}
      ],
      rules: [
        {id: 'capture-all', value: false},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
      ]
    }
    return {
      mChessBoard: 0,
      resetChessBoard: false,
      mDetails: null,
      resetDetails: false,
      variant
    }
  },
  components: {GameDetails, UserDetails, ChessBoard}
};
</script>

<style>

</style>
