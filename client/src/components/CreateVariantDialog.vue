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
        <v-stepper-step step="4" :complete="step > 4">Checkable pieces</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="5">Rules</v-stepper-step>
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
              <v-btn color="primary" text @click="goToStep(2)" :disabled="players !== 2">NEXT</v-btn>
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
                <v-col v-for="(b, i) in $store.state.boards" :key="i" cols="12" md="4">
                  <v-card :color="b.id === board.id ? 'primary' : ''" class="d-flex align-center" height="200"
                          @click="board = JSON.parse(JSON.stringify(b))" outlined>
                    <div class="text-h5 flex-grow-1 text-center">{{ b.name }}</div>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider v-if="board.id != null" class="mt-4 mb-4"/>
              <span v-if="board.id != null">Define additional parameters for this board:</span>
              <v-row v-if="board.id != null" class="mt-0 pt-0">
                <v-col v-for="(p, i) in board.params" :key="i" cols="12" md="3">
                  <v-select :items="p.values" :label="p.name" :value="p.value" v-model="p.value"/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="secondary" text @click="goToStep(1)">BACK</v-btn>
              <v-btn color="primary" text @click="goToStep(3)" :disabled="board.id === null">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Initial position -->
        <v-stepper-content step="3">
          <v-card class="ma-0" flat tile>
            <v-card-title>Initial position</v-card-title>
            <v-card-text>
              Define initial position for your variant:
              <v-select outlined class="mt-4 mb-n3" item-text="text" item-value="value" :label="'Color'"
                        :items="[{text: 'White', value: 0}, {text: 'Black', value: 1}]"
                        :value="positionCreator.color" v-model="positionCreator.color"
                        @change="onPieceClickWhenSettingPosition(null, positionCreator.piece)"/>
              <v-card class="mb-4" outlined>
                <v-card-subtitle>
                  <v-icon color="blue">mdi-information-outline</v-icon>
                  Click on piece and next click on position on board.
                </v-card-subtitle>
                <v-card-text>
                  <v-row class="mt-0 pt-0">
                    <v-col v-for="(piece, index) in board.pieces" :key="index" cols="12" md="1">
                      <v-img :src="'/img/' + piece.img[positionCreator.color]"
                             @click="onPieceClickWhenSettingPosition(piece, index)"
                             :style="{'border': positionCreator.piece === index ? '2px solid #414141' : 'none', 'border-radius': '5px', 'cursor': 'pointer'}"/>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <CreatorBoardStandardInitialPosition v-if="board.id === 's'" :size="600" ref="boardInitialPosition"
                                                   :width="board.params.find(p => p.id === 'w').value"
                                                   :height="board.params.find(p => p.id === 'h').value"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="secondary" text @click="goToStep(2)">BACK</v-btn>
              <v-btn color="primary" text @click="goToStep(4)">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Checkable pieces -->
        <v-stepper-content step="4">
          <v-card class="ma-0" flat tile>
            <v-card-title>Checkable pieces</v-card-title>
            <v-card-text>
              Define checkable pieces for your variant:
              <CreatorBoardStandardCheckablePieces v-if="board.id === 's'" :size="600" ref="boardCheckablePieces"
                                                   :width="board.params.find(p => p.id === 'w').value"
                                                   :height="board.params.find(p => p.id === 'h').value"
                                                   class="mt-3"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="secondary" text @click="goToStep(3)">BACK</v-btn>
              <v-btn color="primary" text @click="goToStep(5)">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-card class="ma-0" flat tile>
            <v-card-title>Rules</v-card-title>
            <v-card-text>
              <v-text-field outlined class="mt-4 mb-n3" label="Variant name" v-model="name"/>
              Define rules for your variant:
              <v-select outlined class="mt-4 mb-n3" item-text="text" item-value="value" label="Capture all"
                        :items="[{text: 'On', value: true}, {text: 'Off', value: false}]"
                        :value="false" v-model="rules.captureAll"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="secondary" text @click="goToStep(4)">BACK</v-btn>
              <v-btn color="primary" text @click="createVariant()">CREATE</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

      </v-stepper-items>

    </v-stepper>
  </v-dialog>
</template>

<script>
import CreatorBoardStandardInitialPosition from './creatorBoards/StandardInitialPosition.vue';
import CreatorBoardStandardCheckablePieces from './creatorBoards/StandardCheckablePieces.vue';

export default {
  name: 'CreateVariantDialog',
  components: {CreatorBoardStandardInitialPosition, CreatorBoardStandardCheckablePieces},
  data: () => ({
    dialog: false, step: 1,
    // Step 1, 2
    players: null, board: {id: null},
    // Step 3, 4
    positionCreator: {color: 0, piece: null}, pieces: [],
    // Step 5
    rules: {captureAll: false}, name: ''
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    goToStep(step) {
      if (step === 1) {
        this.board = {id: null};
      } else if (step === 2) {
        this.positionCreator = {color: 0, piece: null};
        this.pieces = [];
      } else if (step === 4) {
        this.pieces = this.$refs.boardInitialPosition.getPieces();
        this.$refs.boardCheckablePieces.setPieces(this.pieces);
      }
      this.step = step;
    },
    onPieceClickWhenSettingPosition(piece, index) {
      console.log(this.board.pieces);
      if (this.positionCreator.piece === index) {
        this.positionCreator.piece = null;
        this.$refs.boardInitialPosition.setupPiece(null, this.positionCreator.color);
      } else {
        this.positionCreator.piece = index;
        this.$refs.boardInitialPosition.setupPiece(piece, this.positionCreator.color);
      }
    },
    createVariant() {
      // TODO optimize
      let variant = {name: this.name.trim(), players: this.players};
      variant.board = this.board;
      variant.pieces = this.pieces;
      variant.rules = [
        {id: 'capture-all', value: this.rules.captureAll},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
      ];
      if (this.rules.captureAll) for (let i = 0; i < variant.pieces.length; i++)
        variant.pieces[i].checkable = false;
      variant.board.name = variant.board.params.find(p => p.id === 'w').value + ' x ' + variant.board.params.find(p => p.id === 'h').value;
      this.$store.commit('createVariant', variant);
      this.step = 1;
      this.players = null;
      this.board = {id: null};
      this.positionCreator = {color: 0, piece: null};
      this.pieces = [];
      this.rules = {captureAll: false};
      this.name = '';
      this.dialog = false;
    },
  },
};
</script>
