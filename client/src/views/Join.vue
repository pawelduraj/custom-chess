<template>
  <v-container>
    <v-card outlined>
      <v-card-title>{{ status }}</v-card-title>
      <v-card-text v-if="!['Fatal error occurred!', 'Joining...'].includes(status)">
        <v-text-field outlined prepend-icon="mdi-link" readonly label="Invitation link"
                      :value="baseURL + '/join/' + this.$route.params.gameId" @click="copyInvitation()"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Join',
  data: () => ({
    status: 'Joining...',
  }),
  computed: {
    baseURL() {
      return window.location.origin;
    }
  },
  created() {
    this.$api.joinGame('Anonymous', this.$route.params.gameId).then(() => {
      this.status = 'Waiting for opponents...';
      this.$api.listen((game) => {
        if (game.status === 0) {
          this.status = 'Game started!';
          this.$store.state.game.variant = game.variant;
          this.$store.state.game.online = true;
          this.$router.push('/play-online');
        }
      });
    }).catch((e) => {
      console.error(e);
      this.status = 'Fatal error occurred!';
    });
  },
  methods: {
    copyInvitation() {
      let invitation = this.baseURL + '/join/' + this.$route.params.gameId;
      navigator.clipboard.writeText(invitation);
      window.alert('Invitation link copied to clipboard');
    }
  }
}
</script>
