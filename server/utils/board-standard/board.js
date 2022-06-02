const analyzeBoardAfterPlayerMove = require('./board-analyzer');

const pawns = require('./pawns');
const bishops = require('./bishops');
const kings = require('./kings');
const knights = require('./knights');
const queens = require('./queens');
const rooks = require('./rooks');

const FIGURE_IDS = ['B', 'K', 'N', 'Q', 'R'];
const PAWN_IDS = ['P'];
const PIECE_IDS = FIGURE_IDS.concat(PAWN_IDS);

function isMoveValid(move, board, variant) {
    const {from, to, promote} = move;
    if (from == null || typeof from !== 'number' || Math.floor(from) !== from || from < 0 || from >= board.length) return false
    if (to == null || typeof to !== 'number' || Math.floor(to) !== to || to < 0 || to >= board.length) return false;
    if (promote == null || ((promote !== '-') && !FIGURE_IDS.includes(promote))) return false;
    return getAllPossibleMoves(move.from, board, variant).includes(move.to);
}

function getAllPossibleMoves(from, board, variant) {
    if (board[from] === '-') return [];
    else if (board[from].id === 'P') return pawns.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'B') return bishops.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'K') return kings.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'N') return knights.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'Q') return queens.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'R') return rooks.getAllPossibleMoves(from, board, variant);
    else return [];
}

function goToNextTurnAndReturnGame(game, {from, to, promote, time}) {
    const analysis = analyzeBoardAfterPlayerMove(game.board, game.variant, Math.floor(game.turn) % game.players.length);

    const playerId = game.turn % game.players.length;

    game.turn += 1;
    game.moves.push({from, to, promote});
    game.time.remaining[playerId] -= time - game.time.last;
    game.time.last = new Date().getTime();
    game.draw = new Array(game.players.length).fill(0);

    return game;
}

module.exports = {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame};
