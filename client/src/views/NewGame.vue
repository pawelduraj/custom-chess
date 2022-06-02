<template>
  <v-container>

    <!-- New game creator -->
    <v-card outlined v-if="wait === false">
      <v-card-title>Create new game</v-card-title>
      <v-card-text>
        Game information:
        <v-row class="mt-3 mb-6">
          <v-col cols="12" md="4">
            <v-select outlined hide-details prepend-icon="mdi-web" label="Mode"
                      :items="['Online', 'Offline']" v-model="mode"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select outlined hide-details prepend-icon="mdi-checkerboard" label="Variant"
                      :items="variants" v-model="variant" item-text="name" return-object/>
          </v-col>
          <v-col cols="12" md="4" v-if="mode === 'Online'">
            <v-select outlined hide-details prepend-icon="mdi-chess-king" label="Color"
                      :items="['Random', 'White', 'Black']" value="Random" v-model="color"/>
          </v-col>
        </v-row>
        Game time:
        <v-row class="mt-3">
          <v-col cols="12" md="6">
            <v-slider prepend-icon="mdi-clock" :label="'Limit (in minutes): ' + time.limit"
                      min="1" max="15" value="3" v-model="time.limit"/>
          </v-col>
          <v-col cols="12" md="6">
            <v-slider prepend-icon="mdi-timer" :label="'Increment (in seconds): ' + time.increment"
                      min="0" max="15" value="2" v-model="time.increment"/>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn large min-width="120" color="primary" @click="createNewGame()" :disabled="disabled">CREATE</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>

    <!-- Waiting for opponents -->
    <v-card outlined v-else>
      <v-card-title>Waiting for opponents...</v-card-title>
      <v-card-text>
        <v-text-field outlined prepend-icon="mdi-link" readonly label="Invitation link"
                      :value="baseURL + '/join/' + this.$api.gameId" @click="copyInvitation()"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'NewGame',
  data: () => ({
    mode: 'Online', variant: null, color: 'Random', time: {limit: 3, increment: 2}, disabled: false, wait: false
  }),
  computed: {
    variants() {
      return this.$store.state.variants;
    },
    baseURL() {
      return window.location.origin;
    }
  },
  methods: {
    createNewGame() {
      if (this.variant == null) return;
      this.disabled = true;
      let time = JSON.parse(JSON.stringify(this.time));
      let color = -1;
      if (this.color === 'White') color = 0;
      if (this.color === 'Black') color = 1;
      let variant = JSON.parse(JSON.stringify(this.variant));

      if (this.mode === 'Online') {
        this.$api.createNewGame('Anonymous', time, variant, color).then(() => {
          this.wait = true;
          this.$api.listen((game) => {
            if (game.status === 0) {
              this.$store.state.game.variant = game.variant;
              this.$store.state.game.online = true;
              this.$router.push('/play-online');
            }
          });
        }).catch((e) => {
          console.error(e);
          window.alert('Fatal error occurred. Please try again later.');
          this.disabled = false;
        });
      } else if (this.mode === 'Offline') {
        this.$store.state.game.variant = variant;
        this.$store.state.game.online = false;
        this.$router.push('/play-offline');
      }
    },
    copyInvitation() {
      let invitation = this.baseURL + '/join/' + this.$api.gameId;
      navigator.clipboard.writeText(invitation);
      window.alert('Invitation link copied to clipboard');
    }
  }
};
</script>
