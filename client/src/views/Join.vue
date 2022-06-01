<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="address"
        :counter="10"
        label="Name"
        required
    ></v-text-field>


    <v-btn
        color="success"
        class="mr-4"
        @click="validate"
    >
      Validate
    </v-btn>

  </v-form>
</template>

<script>

export default {
  data: () => ({
    valid: true,
    address: '',

  }),

  methods: {
    validate() {
      console.log(this.address)
      this.$api.joinGame("Gracz2", this.address);
      this.$router.push("/boardOnlinejoin")
    },
  },
}
</script>

