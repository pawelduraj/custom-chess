<template>
  <div :style="{'position': 'relative', 'width': size + 'px', 'height': size + 'px'}">
    <div v-for="(square, index) in squares" :key="index" @click="addPiece(square.left, square.top)"
         :style="{'position': 'absolute', 'left': square.left, 'top': square.top, 'width': square.width, 'height': square.height, 'background-color': square.color, 'cursor': 'pointer'}">
    </div>
    <div v-for="(piece, index) in pieces" :key="index" @click="removePiece(index)"
         :style="{'position': 'absolute', 'left': piece.left, 'top': piece.top, 'width': piece.size, 'height': piece.size, 'cursor': 'pointer', 'z-index': '100'}">
      <img :src="'/img/' + piece.img" :alt="piece.img" :style="{'width': piece.size, 'height': piece.size}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatorBoardStandard',
  data: () => ({
    piece: {}, pieces: []
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
      console.log(squareSize);
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
    setupPiece(piece, player) {
      if (piece === null) return this.piece = null;
      this.piece = {};
      this.piece.name = piece.name;
      this.piece.id = piece.id;
      this.piece.img = piece.img[player - 1];
      this.piece.player = player;
    },
    addPiece(left, top) {
      if (this.piece === null) return;
      this.piece.left = left;
      this.piece.top = top;
      this.piece.size = this.width > this.height ? this.size / this.width : this.size / this.height + 'px';
      this.pieces.push(this.piece);
      this.piece = {name: this.piece.name, id: this.piece.id, img: this.piece.img, player: this.piece.player};
    },
    removePiece(index) {
      this.pieces.splice(index, 1);
    },
    getPieces() {
      return this.pieces;
    }
  }
};
</script>
