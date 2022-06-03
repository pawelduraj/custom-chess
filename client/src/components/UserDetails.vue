<template>
  <v-card class="userContainer" flat>
    <v-divider></v-divider>
    <v-row >
      <v-img class="avatar" contain :aspect-ratio="1" max-height="70px" max-width="70px"
             :src="getAvatar()"
             alt="John"
      />
      <v-col>
        <v-card-title>
          {{user.name}}
        </v-card-title>
        <v-card-subtitle>
          {{user.dsc}}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "UserDetails",
  props:{
    user: Object
  },
  methods: {
    getAvatar(){
      return "/img/"+ this.user.img;
    },
  }
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