const analyzeBoardAfterPlayerMove = require('./board-analyzer');

const amazon = require('./amazon');
const archbishop = require('./archbishop');
const berolinaPawn = require('./berolina-pawn');
const bishop = require('./bishop');
const centaur = require('./centaur');
const chancellor = require('./chancellor');
const king = require('./king');
const knight = require('./knight');
const nightrider = require('./nightrider');
const pawn = require('./pawn');
const queen = require('./queen');
const rook = require('./rook');

const FIGURE_IDS = ['AZ', 'AB', 'B', 'CT', 'CC', 'K', 'N', 'NR', 'Q', 'R'];
const PAWN_IDS = ['P', 'BP'];
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
    else if (board[from].id === 'AZ') return amazon.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'AB') return archbishop.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'BP') return berolinaPawn.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'B') return bishop.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'CT') return centaur.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'CC') return chancellor.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'K') return king.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'N') return knight.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'NR') return nightrider.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'P') return pawn.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'Q') return queen.getAllPossibleMoves(from, board, variant);
    else if (board[from].id === 'R') return rook.getAllPossibleMoves(from, board, variant);
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
