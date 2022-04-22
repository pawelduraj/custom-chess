<template>
  <v-container>
    <ChessBoard/>
  </v-container>
</template>

<script>
import ChessBoard from '../components/ChessBoard.vue';

export default {
  name: 'Board',
  components: {ChessBoard}
};
</script>
