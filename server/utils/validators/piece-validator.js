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
        return ['B', 'K', 'N', 'Q', 'P', 'R'].includes(piece.id);
    }

    return false;
}
