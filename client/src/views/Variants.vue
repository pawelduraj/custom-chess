<template>
  <v-container>
    <v-data-table dense hide-default-footer :items-per-page="1000" item-key="name"
                  :headers="headers" :items="items" :single-expand="true" :expanded.sync="expanded">

      <!-- Create variant -->
      <template v-slot:top>
        <v-toolbar dense flat color="primary">
          <v-toolbar-title>Variants</v-toolbar-title>
          <v-spacer/>
          <v-btn outlined class="mr-n2" @click="$refs.createVariantDialog.openDialog();">
            <v-icon left>mdi-plus</v-icon>
            Create variant
          </v-btn>
        </v-toolbar>
      </template>

      <!-- Variant actions -->
      <!--suppress HtmlUnknownAttribute -->
      <template v-slot:item.actions="{item}">
        <v-icon v-if="item.id != null" color="primary" class="mr-2" @click="deleteVariant(item.id)">mdi-delete</v-icon>
        <v-icon class="mr-2" color="primary" @click="expanded = expanded.length === 0 ? [item] : []">mdi-information
        </v-icon>
      </template>

      <!-- Variant description -->
      <template v-slot:expanded-item="{headers, item}">
        <td :colspan="headers.length" class="ma-0 pa-0">
          <v-card flat tile>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.players }} players, {{ item.board.name }} board</v-card-subtitle>
            <v-card-actions>
              <v-btn outlined class="mt-n3" min-width="100" color="primary" @click="testOffline(item)">TEST OFFLINE</v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </td>
      </template>

    </v-data-table>

    <CreateVariantDialog ref="createVariantDialog"/>

  </v-container>
</template>

<script>
import CreateVariantDialog from '../components/CreateVariantDialog';

export default {
  name: 'Variants',
  components: {CreateVariantDialog},
  data: () => ({
    headers: [
      {text: 'Name', align: 'left', sortable: false, value: 'name'},
      {text: 'Players', align: 'left', sortable: false, value: 'players'},
      {text: 'Board', align: 'left', sortable: false, value: 'board.name'},
      {text: 'Actions', align: 'right', sortable: false, value: 'actions'}
    ], expanded: []
  }),
  computed: {
    items() {
      return this.$store.state.variants;
    }
  },
  methods: {
    deleteVariant(variantId) {
      this.$store.commit('deleteVariant', variantId);
    },
    testOffline(variant) {
      this.$store.state.game.variant = variant;
      this.$store.state.game.online = false;
      this.$router.push('/play-offline');
    }
  }
};
</script>
