<template>
  <v-app>

    <!-- App bar -->
    <v-app-bar color="primary" dense flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <v-app-bar-title>Custom Chess</v-app-bar-title>
    </v-app-bar>

    <!-- Navigation drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-title>{{ name }}</v-list-item-title>
        <v-list-item-icon>
          <v-icon @click="dialog = true">mdi-pencil</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-divider/>
      <v-list dense nav>
        <v-list-item v-for="(item, index) in options" :key="index" @click="$router.push(item.path)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main>
      <router-view/>
    </v-main>

    <!-- Name dialog -->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Enter your name</v-card-title>
        <v-card-text>
          <v-text-field prepend-icon="mdi-account" counter="16" dense filled rounded class="mt-2 mb-n2"
                        v-model="name" @input="saveName()"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" min-width="100" @click="dialog = false"
                 :disabled="name.trim().length < 3 || name.trim().length > 16">
            OK
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null, dialog: false, name: '', options: [
      {icon: 'mdi-checkerboard', title: 'Variants', path: '/variants'},
      {icon: 'mdi-chess-pawn', title: 'New game', path: '/new-game'},
      {icon: 'mdi-checkerboard', title: '[DEV] Board', path: '/board'},
    ]
  }),
  computed: {
    localName() {
      return localStorage.getItem('name') || '';
    }
  },
  mounted() {
    // Load name from local storage
    this.name = this.localName;
    if (this.name === '') this.dialog = true;

    // Load online game if exists
    // TODO temporarily disabled for testing
    /* let game = localStorage.getItem('game');
    if (game) {
      this.$api.gameId = JSON.parse(game).gameId;
      this.$api.playerId = JSON.parse(game).playerId;
      this.$api.token = JSON.parse(game).token;
      this.$api.listen((game) => {
        if (game.status === 0) {
          this.$store.state.game.variant = game.variant;
          this.$store.state.game.online = true;
          this.$router.push('/play-online');
        } else localStorage.removeItem('game');
      }).catch(() => localStorage.removeItem('game'));
    } */
  },
  methods: {
    saveName() {
      this.name = this.name.trim();
      localStorage.setItem('name', this.name);
    }
  }
};
</script>
