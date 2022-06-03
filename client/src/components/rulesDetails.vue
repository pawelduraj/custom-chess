<template>
  <v-card>
    <v-card-title>Opis wariantu</v-card-title>
    <v-expansion-panels
        v-model="panel"
        multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header>Opis ogólny</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Nazwa: Szachy klasyczne</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Liczba graczy: 2</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Nunc aliquet bibendum
            enim facilisis gravida. Elementum integer enim neque volutpat ac tincidunt. Sit amet consectetur adipiscing
            elit. Congue mauris rhoncus aenean vel. Enim eu turpis egestas pretium aenean pharetra magna. Mattis enim ut
            tellus elementum sagittis vitae et leo duis. Eu feugiat pretium nibh ipsum consequat nisl vel pretium
            lectus. Rutrum quisque non tellus orci.
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Warunki kończący grę</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-expansion-panels v-model="finish" multiple>
            <v-expansion-panel class="rules">
              <v-expansion-panel-header>Szach Mat</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card>
                  <v-card-text>
                    Jeżeli gracz nie może uciec figurą, która nie może być zbita (np. król w wersji klaszycznej
                    szachów), z pod bicia gra automatycznie kończy się jego porażką.
                  </v-card-text>
                  <v-img eager src="img/checkmate.gif"></v-img>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="rules">
              <v-expansion-panel-header>Pat</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card>
                  <v-card-text>
                    Jeżeli gracz nie może ruszyć się żadną ze swoich bierek gra się kończy się remisem.
                  </v-card-text>
                  <v-img eager src="img/pat.gif"></v-img>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="rules">
              <v-expansion-panel-header>Wieczny szach</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card>
                  <v-card-text>
                    Jeżeli któryś z graczy wymusił 3 krotne powtórzenie pozycji przez ciągłe szachowanie gra kończy się
                    remisem.
                  </v-card-text>
                  <v-img eager src="img/perrMate.gif"></v-img>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="rules">
              <v-expansion-panel-header>Poddanie się</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card>
                  <v-card-text>
                    Gracz w każdym momencie może poddać partię.
                  </v-card-text>
                  <v-img eager src="img/surr.gif"></v-img>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Zbiór zasad ogólnych</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Zbiór bierek</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="space-between">


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip right :open-on-hover = false>
              <template v-slot:activator="{ on, attrs }">
              <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                <v-card-title>Pion</v-card-title>
                <v-img src="img/pawn_b.png" :aspect-ratio="1"></v-img>
              </v-card>
              </template>
              <v-img src = "/img/pawnMove.png" max-width="300px"/>
            </v-tooltip>
            </v-hover>


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip right :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Koń</v-card-title>
                    <v-img src="img/knight_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/knightMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip right :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Goniec</v-card-title>
                    <v-img src="img/bishop_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/bishopMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip right :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Wieża</v-card-title>
                    <v-img src="img/rook_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/rookMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Hetman</v-card-title>
                    <v-img src="img/queen_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/queenMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Król</v-card-title>
                    <v-img src="img/king_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/kingMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>

            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Berolina</v-card-title>
                    <v-img src="img/berolinapawn_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/berolinaMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>

            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Jeździec</v-card-title>
                    <v-img src="img/nightrider_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/nightriderMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>


            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Arcybiskup</v-card-title>
                    <v-img src="img/archbishop_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/archbishopMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>

            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Kanclerz</v-card-title>
                    <v-img src="img/chancellor_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/chancellorMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>

            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Amozonka</v-card-title>
                    <v-img src="img/amazon_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/amazonMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>

            <v-hover
                v-slot="{ hover }"
            >
              <v-tooltip left :open-on-hover = false>
                <template v-slot:activator="{ on, attrs }">
                  <v-card width="15%" :elevation="hover ? 16 : 2" :class="{'on-hover': hover}" v-bind="attrs" v-on="on">
                    <v-card-title>Centaur</v-card-title>
                    <v-img src="img/centaur_b.png" :aspect-ratio="1"></v-img>
                  </v-card>
                </template>
                <v-img src = "/img/centaurMove.png" max-width="300px"/>
              </v-tooltip>
            </v-hover>





          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "rulesDetails",
  data() {
    return {
      panel: null,
      finish: null
    }
  }
}
</script>

<style scoped>
.rules {
  width: 100px;
}
.v-tooltip__content {
  opacity: 1 !important;
}
</style>