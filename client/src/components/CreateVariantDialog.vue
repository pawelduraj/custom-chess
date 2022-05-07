<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-stepper v-model="step">

      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1">Players</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="2" :complete="step > 2">Board</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="3" :complete="step > 3">Initial position</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="4">Rules</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>

        <!-- Players -->
        <v-stepper-content step="1">
          <v-card class="ma-0" flat tile>
            <v-card-title>Players</v-card-title>
            <v-card-text>
              Choose number of players in your variant:
              <v-row class="mt-0 pt-0">
                <v-col v-for="n in 3" :key="n + 1" cols="12" md="4">
                  <v-card :color="players === n + 1 ? 'primary' : ''" class="d-flex align-center" height="200"
                          @click="players = n + 1" outlined>
                    <div class="text-h5 flex-grow-1 text-center">
                      <v-icon x-large v-for="m in n + 1" :key="m">mdi-account</v-icon>
                      ( {{ n + 1 }} )
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-card class="mt-4" outlined v-if="players === 3 || players === 4">
                <v-card-subtitle>
                  <v-icon color="orange">mdi-information-outline</v-icon>
                  Variants for {{ players }} players are currently unavailable.
                </v-card-subtitle>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" flat @click="goToStep(2)" :disabled="players !== 2">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Board -->
        <v-stepper-content step="2">
          <v-card class="ma-0" flat tile>
            <v-card-title>Board</v-card-title>
            <v-card-text>
              Choose type of board for your variant:
              <v-row class="mt-0 pt-0">
                <!-- TODO filter boards -->
                <v-col v-for="(board, index) in $store.state.boards" :key="index" cols="12" md="4">
                  <v-card :color="index === boardIndex ? 'primary' : ''" class="d-flex align-center" height="200"
                          @click="selectBoard(index)" outlined>
                    <div class="text-h5 flex-grow-1 text-center">{{ board.name }}</div>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider v-if="boardIndex !== null" class="mt-4 mb-4"/>
              <span v-if="boardIndex !== null">Define additional parameters for this board:</span>
              <v-row v-if="boardIndex !== null" class="mt-0 pt-0">
                <v-col v-for="(param, index) in boardParams" :key="index" cols="12" md="3">
                  <v-select :items="param.values" :label="param.name" :value="param.value" v-model="param.value"/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="white" flat @click="goToStep(1)">BACK</v-btn>
              <v-btn color="primary" flat @click="goToStep(3)" :disabled="boardIndex === null">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Initial position -->
        <v-stepper-content step="3">
          <v-card class="ma-0" flat tile>
            <v-card-title>Initial position</v-card-title>
            <v-card-text>
              Define initial position for your variant:
              <v-select outlined class="mt-4 mb-n3" :items="[1, 2]" :label="'Player'"
                        :value="positionCreator.player" v-model="positionCreator.player"
                        @change="onPieceClickWhenSettingPosition(null, positionCreator.piece)"/>
              <v-card class="mb-4" outlined>
                <v-card-subtitle>
                  <v-icon color="blue">mdi-information-outline</v-icon>
                  Click on piece and next click on position on board.
                </v-card-subtitle>
                <v-card-text>
                  <v-row class="mt-0 pt-0">
                    <v-col v-for="(piece, index) in boardPieces" :key="index" cols="12" md="1">
                      <v-img :src="'/img/' + piece.img[positionCreator.player - 1]"
                             @click="onPieceClickWhenSettingPosition(piece, index)"
                             :style="{'border': positionCreator.piece === index ? '2px solid #414141' : 'none', 'border-radius': '5px', 'cursor': 'pointer'}"/>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <CreatorBoardStandard v-if="boardIndex === 0" :size="600" ref="board"
                                    :width="boardParams.find(e => e.id === 'w').value"
                                    :height="boardParams.find(e => e.id === 'h').value"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="white" flat @click="goToStep(2)">BACK</v-btn>
              <v-btn color="primary" flat @click="goToStep(4)">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="ma-0" flat tile>
            <v-card-title>Rules</v-card-title>
            <v-card-text>
              Define rules for your variant:
              <!-- TODO rules -->
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="white" flat @click="goToStep(3)">BACK</v-btn>
              <v-btn color="primary" flat @click="createVariant()">CREATE</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

      </v-stepper-items>

    </v-stepper>
  </v-dialog>
</template>

<script>
import CreatorBoardStandard from './creatorBoards/Standard.vue';

export default {
  name: 'CreateVariantDialog',
  components: {CreatorBoardStandard},
  data: () => ({
    dialog: false, step: 1,
    players: null, boardIndex: null, boardParams: [], boardPieces: [],
    positionCreator: {player: 1, piece: null},
    pieces: []
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    goToStep(step) {
      if (step === 1) {
        this.boardIndex = null;
        this.boardParams = [];
      } else if (step === 2) {
        this.pieces = [];
      } else if (step === 3) {
        // TODO remove rules
      } else if (step === 4) {
        this.pieces = this.$refs.board.getPieces();
      }
      this.step = step;
    },
    createVariant() {
      // TODO save variant in local storage
      console.log('New variant created');
      this.dialog = false;
    },
    selectBoard(index) {
      this.boardIndex = index;
      this.boardParams = this.$store.state.boards[index].params;
      this.boardParams.forEach(param => param.value = param.default);
      this.boardPieces = this.$store.state.boards[index].pieces;
    },
    onPieceClickWhenSettingPosition(piece, index) {
      if (this.positionCreator.piece === index) {
        this.positionCreator.piece = null;
        this.$refs.board.setupPiece(null, this.positionCreator.player);
      } else {
        this.positionCreator.piece = index;
        this.$refs.board.setupPiece(piece, this.positionCreator.player);
      }
    }
  },
};
</script>
