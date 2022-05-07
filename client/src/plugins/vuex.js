import Vue from 'vue';
import Vuex from 'vuex';

// noinspection JSCheckFunctionSignatures
Vue.use(Vuex);

let state = {};

state.variants = [
    {name: 'Standard', players: 2, board: 'S 8x8'},
    {name: 'Mini', players: 2, board: 'S 6x6'},
    {name: '4 players', players: 4, board: 'E 16x16'}
];

state.boards = [{
    name: 'Standard', id: 's', players: [2, 3, 4],
    params: [
        {name: 'Width', id: 'w', values: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], default: 8},
        {name: 'Height', id: 'h', values: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], default: 8}
    ],
    pieces: [
        {name: 'Pawn', id: 'p', img: ['pawn_w.png', 'pawn_b.png']},
        {name: 'Rook', id: 'r', img: ['rook_w.png', 'rook_b.png']},
        {name: 'Knight', id: 'n', img: ['knight_w.png', 'knight_b.png']},
        {name: 'Bishop', id: 'b', img: ['bishop_w.png', 'bishop_b.png']},
        {name: 'Queen', id: 'q', img: ['queen_w.png', 'queen_b.png']},
        {name: 'King', id: 'k', img: ['king_w.png', 'king_b.png']}
    ]
}];

let variants = localStorage.getItem('variants');
if (variants) {
    variants = variants.split(',');
    for (let i = 0; i < variants.length; i++) {
        let variant = localStorage.getItem(variants[i]);
        if (variant) state.variants.push(JSON.parse(variant));
    }
}

export default new Vuex.Store({
    state: state,
    mutations: {
        createVariant(state, variant) {
            state.variants.push(variant);
        },
        deleteVariant(state, variant) {
            state.variants.splice(state.variants.indexOf(variant), 1);
        }
    }
});
