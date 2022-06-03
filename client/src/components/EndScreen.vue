
<template>
  <v-dialog
      v-model=GameStatus.visable
      width="500">
    <v-card class="endScreen flex-column d-flex" rounded shaped>
      <v-card-title class="text-h4">
        {{ GameStatus.reason }}
      </v-card-title>

      <v-card-title class="text-h5">
        {{ GameStatus.whoWin }}
      </v-card-title>

      <v-row justify="space-between">
        <UserDetails :user = "{name: getNickName(),dsc: 'Opis użytkownika',img: 'cat.png'}" />
        <v-card flat>
          1 - 0
        </v-card>
        <UserDetails :user = "{name: 'Doge',dsc: 'Opis użytkownika',img: 'doge.jpg'}" />
      </v-row>

      <v-spacer></v-spacer>
        <v-container>
      <v-card-actions>


        <v-btn
            color="blue lighten-2"
            dark
            @click="GameStatus.visable = false"
        >
          Zaproponuj rewanż
        </v-btn>

        <v-btn
            color="blue lighten-2"
            dark
            @click="GameStatus.visable = false"
        >
          Wyjdź
        </v-btn>

      </v-card-actions>
        </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import {GameStatus} from "@/scripts/chessboard/objects";
import UserDetails from "@/components/UserDetails";

export default {
  name: "EndScreen",
  components: {UserDetails},
  props: {
    GameStatus: GameStatus,
  },
  methods: {
    getNickName(){
      return localStorage.name;
    }
  }
}
</script>

<style scoped>
.endScreen{
  min-height: 380px;
  background: radial-gradient(61rem 27rem at top center,#1976d2  39%,#fff 40%);
}
.endScreen * {
  margin: auto;
}
</style>