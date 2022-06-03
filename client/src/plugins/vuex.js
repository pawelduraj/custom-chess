import Vue from 'vue';
import Vuex from 'vuex';

// noinspection JSCheckFunctionSignatures
Vue.use(Vuex);

let state = {};

state.variants = [{
    name: 'Standard', players: 2,
    board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
    pieces: [
        {id: 'R', checkable: false, color: 0, field: 0}, {id: 'R', checkable: false, color: 0, field: 7},
        {id: 'N', checkable: false, color: 0, field: 1}, {id: 'N', checkable: false, color: 0, field: 6},
        {id: 'B', checkable: false, color: 0, field: 2}, {id: 'B', checkable: false, color: 0, field: 5},
        {id: 'Q', checkable: false, color: 0, field: 3}, {id: 'K', checkable: true, color: 0, field: 4},
        {id: 'P', checkable: false, color: 0, field: 8}, {id: 'P', checkable: false, color: 0, field: 9},
        {id: 'P', checkable: false, color: 0, field: 10}, {id: 'P', checkable: false, color: 0, field: 11},
        {id: 'P', checkable: false, color: 0, field: 12}, {id: 'P', checkable: false, color: 0, field: 13},
        {id: 'P', checkable: false, color: 0, field: 14}, {id: 'P', checkable: false, color: 0, field: 15},
        {id: 'R', checkable: false, color: 1, field: 56}, {id: 'R', checkable: false, color: 1, field: 63},
        {id: 'N', checkable: false, color: 1, field: 57}, {id: 'N', checkable: false, color: 1, field: 62},
        {id: 'B', checkable: false, color: 1, field: 58}, {id: 'B', checkable: false, color: 1, field: 61},
        {id: 'Q', checkable: false, color: 1, field: 59}, {id: 'K', checkable: true, color: 1, field: 60},
        {id: 'P', checkable: false, color: 1, field: 48}, {id: 'P', checkable: false, color: 1, field: 49},
        {id: 'P', checkable: false, color: 1, field: 50}, {id: 'P', checkable: false, color: 1, field: 51},
        {id: 'P', checkable: false, color: 1, field: 52}, {id: 'P', checkable: false, color: 1, field: 53},
        {id: 'P', checkable: false, color: 1, field: 54}, {id: 'P', checkable: false, color: 1, field: 55}
    ],
    rules: [
        {id: 'capture-all', value: false},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
    ]
}, {
    name: 'Los Alamos', players: 2,
    board: {name: '6x6', id: 's', params: [{id: 'w', value: 6}, {id: 'h', value: 6}]},
    pieces: [
        {id: 'R', checkable: false, color: 0, field: 0}, {id: 'R', checkable: false, color: 0, field: 5},
        {id: 'N', checkable: false, color: 0, field: 1}, {id: 'N', checkable: false, color: 0, field: 4},
        {id: 'Q', checkable: false, color: 0, field: 2}, {id: 'K', checkable: true, color: 0, field: 3},
        {id: 'P', checkable: false, color: 0, field: 6}, {id: 'P', checkable: false, color: 0, field: 7},
        {id: 'P', checkable: false, color: 0, field: 8}, {id: 'P', checkable: false, color: 0, field: 9},
        {id: 'P', checkable: false, color: 0, field: 10}, {id: 'P', checkable: false, color: 0, field: 11},
        {id: 'R', checkable: false, color: 1, field: 30}, {id: 'R', checkable: false, color: 1, field: 35},
        {id: 'N', checkable: false, color: 1, field: 31}, {id: 'N', checkable: false, color: 1, field: 34},
        {id: 'Q', checkable: false, color: 1, field: 32}, {id: 'K', checkable: true, color: 1, field: 33},
        {id: 'P', checkable: false, color: 1, field: 24}, {id: 'P', checkable: false, color: 1, field: 25},
        {id: 'P', checkable: false, color: 1, field: 26}, {id: 'P', checkable: false, color: 1, field: 27},
        {id: 'P', checkable: false, color: 1, field: 28}, {id: 'P', checkable: false, color: 1, field: 29}
    ],
    rules: [
        {id: 'capture-all', value: false},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
    ]
}];

state.boards = [{
    name: 'Standard', id: 's', players: [2, 3, 4],
    params: [
        {name: 'Width', id: 'w', values: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], value: 8},
        {name: 'Height', id: 'h', values: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], value: 8}
    ],
    pieces: [
        {name: 'Pawn', id: 'P', img: ['pawn_w.png', 'pawn_b.png']},
        {name: 'Rook', id: 'R', img: ['rook_w.png', 'rook_b.png']},
        {name: 'Knight', id: 'N', img: ['knight_w.png', 'knight_b.png']},
        {name: 'Bishop', id: 'B', img: ['bishop_w.png', 'bishop_b.png']},
        {name: 'Queen', id: 'Q', img: ['queen_w.png', 'queen_b.png']},
        {name: 'King', id: 'K', img: ['king_w.png', 'king_b.png']}
    ]
}];

state.game = {variant: undefined, online: undefined};

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
            console.log('XD');
            let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).replace(',', '');
            localStorage.setItem(id, JSON.stringify(variant));
            let variantList = localStorage.getItem('variants');
            if (variantList == null) variantList = id;
            else variantList = variantList + ',' + id;
            localStorage.setItem('variants', variantList);
            state.variants.push(variant);
        },
        deleteVariant(state, variantId) {
            let variantList = localStorage.getItem('variants');
            if (variantList == null) return;
            variantList = variantList.split(',');
            let variantIndex = variantList.indexOf(variantId);
            if (variantIndex === -1) return;
            variantList.splice(variantIndex, 1);
            localStorage.setItem('variants', variantList.join(','));
            state.variants.splice(variantIndex, 1);
            localStorage.removeItem(variantId);
        }
    }
});
