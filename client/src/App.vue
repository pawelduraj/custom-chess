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
        <v-list-item-title>
          <v-text-field prepend-icon="mdi-account" counter="16" dense filled rounded hide-details class="mt-2 mb-2"
                        v-model="name" @input="saveName()"/>
        </v-list-item-title>
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
    drawer: null, name: '', editName: false,
    options: [
      {icon: 'mdi-checkerboard', title: 'Variants', path: '/variants'},
      {icon: 'mdi-chess-pawn', title: 'New game', path: '/new-game'},
      {icon: 'mdi-checkerboard', title: '[DEV] Board', path: '/board'},
    ]
  }),
  mounted() {
    this.name = localStorage.getItem('name') || 'Anonymous';
  },
  methods: {
    saveName() {
      localStorage.setItem('name', this.name);
    }
  }
};
</script>
