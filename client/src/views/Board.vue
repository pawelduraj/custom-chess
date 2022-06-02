<template>
  <v-container>
    <v-row >
      <v-col>
        <UserDetails/>
        <ChessBoard :variant="this.variant" :online="this.online" :message="mChessBoard" :reset="resetChessBoard"
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
    let variant = this.$store.state.game.variant || {
      name: 'Standard', players: 2,
      board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
      pieces: [
        {id: 'R', checkable: false, color: 0, field: 0}, {id: 'R', checkable: false, color: 0, field: 7},
        {id: 'N', checkable: false, color: 0, field: 1}, {id: 'N', checkable: false, color: 0, field: 6},
        {id: 'B', checkable: false, color: 0, field: 2}, {id: 'B', checkable: false, color: 0, field: 5},
        {id: 'Q', checkable: false, color: 0, field: 4}, {id: 'K', checkable: true, color: 0, field: 3},
        {id: 'P', checkable: false, color: 0, field: 8}, {id: 'P', checkable: false, color: 0, field: 9},
        {id: 'P', checkable: false, color: 0, field: 10}, {id: 'P', checkable: false, color: 0, field: 11},
        {id: 'P', checkable: false, color: 0, field: 12}, {id: 'P', checkable: false, color: 0, field: 13},
        {id: 'P', checkable: false, color: 0, field: 14}, {id: 'P', checkable: false, color: 0, field: 15},
        {id: 'R', checkable: false, color: 1, field: 56}, {id: 'R', checkable: false, color: 1, field: 63},
        {id: 'N', checkable: false, color: 1, field: 57}, {id: 'N', checkable: false, color: 1, field: 62},
        {id: 'B', checkable: false, color: 1, field: 58}, {id: 'B', checkable: false, color: 1, field: 61},
        {id: 'K', checkable: true, color: 1, field: 59}, {id: 'Q', checkable: false, color: 1, field: 60},
        {id: 'P', checkable: false, color: 1, field: 48}, {id: 'P', checkable: false, color: 1, field: 49},
        {id: 'P', checkable: false, color: 1, field: 50}, {id: 'P', checkable: false, color: 1, field: 51},
        {id: 'P', checkable: false, color: 1, field: 52}, {id: 'P', checkable: false, color: 1, field: 53},
        {id: 'P', checkable: false, color: 1, field: 54}, {id: 'P', checkable: false, color: 1, field: 55}
      ],
      rules: [
        {id: 'capture-all', value: false},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
      ]
    };
    let online = this.$store.state.game.online || false;
    return {
      mChessBoard: 0,
      resetChessBoard: false,
      mDetails: null,
      resetDetails: false,
      variant, online
    }
  },
  components: {GameDetails, UserDetails, ChessBoard}
};
</script>

<style>

</style>
