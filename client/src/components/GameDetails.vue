<template>
  <v-container id="GameDetails" class="flex-column d-flex">
    <v-card>
      <v-tabs
          v-model="tab"
          background-color="deep-purple accent-4"
          centered
          dark
          icons-and-text
      >
        <v-card-title>Szachy standardowe</v-card-title>
        <v-card-subtitle>Nazwa trybu</v-card-subtitle>
        <v-divider inset></v-divider>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Lista ruchów
        </v-tab>

        <v-tab href="#tab-2">
          Zasady gry
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :value="'tab-1'">
          <v-container>
            <v-row v-model="history" justify="space-around" v-bind:key="h" v-for="h in Math.ceil(history.length / 2)">
              <v-card flat>
                <v-row no-gutters>
                  <v-img max-height="100%" width="20px" contain :src="getHistoryRec(2 * (h - 1)).p"></v-img>
                  <v-card flat>
                    <v-card-text>{{ getHistoryRec(2 * (h - 1)).f }}</v-card-text>
                  </v-card>
                </v-row>
              </v-card>
              <v-card flat>
                <v-row no-gutters>
                  <v-img max-height="100%" width="20px" contain :src="getHistoryRec(2 * (h - 1) + 1).p"></v-img>
                  <v-card flat>
                    <v-card-text>{{ getHistoryRec(2 * (h - 1) + 1).f }}</v-card-text>
                  </v-card>
                </v-row>
              </v-card>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item :value="'tab-2'">
          <v-card flat>
            <rulesDetails/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-spacer></v-spacer>
    <v-card>
      <v-bottom-navigation
          color="primary"
          horizontal
      >
        <v-btn @click="sendMessage(0)">
          <v-img src="img/leftArrow.png" max-height="100%" width="20px" contain></v-img>
        </v-btn>

        <v-btn @click="sendMessage(1)">
          <v-img src="img/rightArrow.png" max-height="100%" width="20px" contain></v-img>
        </v-btn>

        <v-btn @click="sendMessage(1)">
          <v-img src="img/draw.png" max-height="100%" width="20px" contain></v-img>
        </v-btn>

        <v-btn @click="sendMessage(1)">
          <v-img src="img/whiteflag.png" max-height="100%" width="20px" contain></v-img>
        </v-btn>
      </v-bottom-navigation>
    </v-card>
  </v-container>
</template>

<script>
import RulesDetails from "@/components/rulesDetails";

export default {
  name: "GameDetails",
  props:
      {
        reset: Boolean,
        message: {p: String, f: String}

      },
  watch: {
    "reset": function () {
      this.history.push(this.message)
    }
  },
  components: {RulesDetails},
  data() {
    return {
      history: Array(0),
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  methods: {
    sendMessage(M) {
      this.$emit('messageFromChild', M);
    },
    getHistoryRec(i) {
      if (i < this.history.length)
        return this.history[i];
      else
        return {p: "", f: ""}
    }
  }
}
</script>

<style scoped>
#GameDetails {
  background-color: wheat;
  border-radius: 2px;
  min-height: 92%;
  padding: 0;
}
</style>