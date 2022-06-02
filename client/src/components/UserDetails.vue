<template>
  <v-card class="userContainer" flat>
    <v-divider></v-divider>
    <v-row >
      <v-img class="avatar" contain :aspect-ratio="1" max-height="80px" max-width="80px" gradient
             src="https://cdn.vuetifyjs.com/images/john.jpg"
             alt="John"
      />
      <v-col>
        <v-card-title>
          Gracz
        </v-card-title>
        <v-card-subtitle>
          Opis użytkownika
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "UserDetails",
  methods: {}
}
</script>

<style>
.avatar {
  margin: auto 0 auto 14px;
  border-radius: 40px;
}

.userContainer {
  margin: 4px 0;
}

</style>