<template>
  <div :style="{'position': 'relative', 'width': size + 'px', 'height': size + 'px'}" :key="lastUpdate">
    <div v-for="(square, index) in squares" :key="index"
         :style="{'position': 'absolute', 'left': square.left, 'top': square.top, 'width': square.width, 'height': square.height, 'background-color': square.color, 'cursor': 'pointer'}">
    </div>
    <div v-for="(piece, index) in pieces" :key="index" @click="swapCheckable(index)"
         :style="{'position': 'absolute', 'left': piece.left, 'top': piece.top, 'width': piece.size, 'height': piece.size, 'cursor': 'pointer', 'z-index': '100', 'background-color': piece.checkable ? '#2196F3' : ''}">
      <img :src="'/img/' + piece.img" :alt="piece.img" :style="{'width': piece.size, 'height': piece.size}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatorBoardStandard',
  data: () => ({
    pieces: [], lastUpdate: 0
  }),
  props: {
    size: {type: Number, required: true},
    width: {type: Number, required: true},
    height: {type: Number, required: true}
  },
  computed: {
    squares() {
      let squares = [];
      let squareSize = this.width > this.height ? this.size / this.width : this.size / this.height;
      for (let h = 0; h < this.width; h++) {
        for (let w = 0; w < this.height; w++) {
          squares.push({
            left: h * squareSize + 'px',
            top: w * squareSize + 'px',
            width: squareSize + 'px',
            height: squareSize + 'px',
            color: (w + h) % 2 === 0 ? '#eeeed2' : '#769656'
          });
        }
      }
      return squares;
    }
  },
  methods: {
    setPieces(pieces) {
      pieces = pieces.map((piece) => {
        piece.checkable = piece.id === 'K';
        return piece;
      });
      this.pieces = pieces;
    },
    swapCheckable(index) {
      if (this.pieces[index].id === 'P' || this.pieces[index].id === 'BP') return;
      this.pieces[index].checkable = !this.pieces[index].checkable;
      this.lastUpdate += 1;
    },
    getPieces() {
      return this.pieces;
    }
  }
};
</script>
