<script>
export default {
  name: "Field",
  emits: ['childToParent'],
  data() {
    return {
      active: false
    }
  },
  props: {
    row: Number,
    col: Number,
    image: {String, Boolean},
    reset: Boolean
  },
  watch: {
    reset() {
      this.active = false;
    }
  },
  methods:
      {
        Opacity() {
          if (this.image.hit)
            return "hitable";
          else
            return "";
        },
        black_or_white() {
          if (this.active === true)
            return "green"
          if ((this.row + this.col) % 2 === 1)
            return "white"
          else
            return "grey"
        },
        get_image() {
          if (this.image.image === "")
            return "";
          return "img/" + this.image.image;
        },
        overlight() {
          this.active = this.active !== true;
          this.$emit('childToParent', {row: this.row, col: this.col});
        }
      },
}
</script>


<template>
  <div v-bind:class="black_or_white()" class="size" @click="overlight">
    <img v-bind:class="Opacity()" class="hoverPiece" :src="get_image()" alt="">
  </div>
</template>


<style>
.size {
  height: 100px;
  width: 100px;
}
</style>

<style scoped>
img {
  width: 100%;
}

.hitable {
  opacity: 0.2;
}

.hoverPiece {
  transition: transform .3s;
}

.hoverPiece:hover {
  transform: scale(1.1);
}
</style>