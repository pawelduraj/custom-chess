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
        <v-list-item-title>Anonymous</v-list-item-title>
        <v-list-item-icon>
          <v-icon @click="drawer = drawer">mdi-pencil</v-icon>
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

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null,
    options: [
      {icon: 'mdi-home', title: 'Home', path: '/'},
      {icon: 'mdi-checkerboard', title: 'Variants', path: '/variants'},
      {icon: 'mdi-chess-pawn', title: 'New game', path: '/new-game'},
      {icon: 'mdi-checkerboard', title: '[DEV] Board', path: '/board'},
      {icon: 'mdi-checkerboard', title: '[DEV] Create', path: '/boardOnline'},
      {icon: 'mdi-checkerboard', title: '[DEV] Join', path: '/join'},
    ]
  })
};
</script>
