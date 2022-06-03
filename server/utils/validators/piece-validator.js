const FIGURE_IDS = ['AZ', 'AB', 'B', 'CT', 'CC', 'K', 'N', 'NR', 'Q', 'R'];
const PAWN_IDS = ['P', 'BP'];
const PIECE_IDS = FIGURE_IDS.concat(PAWN_IDS);

module.exports = (piece, variant) => {
    if (piece == null || typeof piece !== 'object') return false;

    if (!piece.hasOwnProperty('id') || typeof piece.id !== 'string') return false;

    if (!piece.hasOwnProperty(('checkable')) || typeof piece.checkable !== 'boolean') return false;

    if (!piece.hasOwnProperty('color') || typeof piece.color !== 'number' || Math.floor(piece.color) !== piece.color) return false;
    if (piece.color < 0 || piece.color >= variant.players) return false;

    if (!piece.hasOwnProperty('field') || typeof piece.field !== 'number' || Math.floor(piece.field) !== piece.field) return false;

    if (variant.board.id === 's') {
        const fields = variant.board.params.find(p => p.id === 'w').value * variant.board.params.find(p => p.id === 'h').value;
        if (piece.field < 0 || piece.field >= fields) return false;
        return PIECE_IDS.includes(piece.id);
    }

    return false;
}
