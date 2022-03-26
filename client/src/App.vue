<template>
  <v-app>
    <ChessBoard></ChessBoard>
  </v-app>
</template>

<script>

import ChessBoard from "@/components/ChessBoard";
export default {
  name: 'App',
  components: {ChessBoard}
};
</script>
