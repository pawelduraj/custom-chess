const isPieceValid = require('./piece-validator');
const areRulesValid = require('./rules-validator');
const isBoardValid = require('./board-validator');

module.exports = (variant) => {
    if (variant == null || typeof variant !== 'object') return false;

    if (!variant.hasOwnProperty('board') || !isBoardValid(variant.board)) return false;

    if (!variant.hasOwnProperty('rules') || !areRulesValid(variant.rules)) return false;

    if (!variant.hasOwnProperty('pieces') || !Array.isArray(variant.pieces)) return false;

    if (!variant.pieces.every((piece) => isPieceValid(piece, variant))) return false;

    return !(!variant.hasOwnProperty('players') || typeof variant.players !== 'number');

    // TODO create starting position validator
}
