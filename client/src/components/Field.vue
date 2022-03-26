<script>
export default {
  name: "Field",
  emits: ['childToParent'],
  data()
  {
    return{
      active: false
    }
  },
  props: {
    row: Number,
    col: Number,
    image: String,
    reset: Boolean
  },
  watch: { reset()
    {
      this.active = false;
    }
  },
  methods:
      {
        black_or_white() {
          if (this.active === true)
            return "green"
          if ((this.row + this.col) % 2 === 0)
            return "white"
          else
            return "grey"
        },
        get_image() {
          if(this.image === "")
            return "";
          return "img/" + this.image;
        },
        overlight()
        {
          this.active = this.active !== true;
          this.$emit('childToParent', {row: this.row, col: this.col});
        }
      }
}
</script>


<template>
  <div v-bind:class = "black_or_white()" class = "size" @click = "overlight">
    <img :src =  "get_image()" alt="">
  </div>
</template>



<style>
.size
{
  height: 70px;
  width: 70px;
}
</style>

<style scoped>
img{
  display: inline-block;
  vertical-align: middle;
  height: 70px;
  width: 70px;
}
</style>