module.exports = (piece, fields, colors) => {
    if (piece == null || typeof piece !== 'object') return false;

    if (!piece.hasOwnProperty('id') || typeof piece.id !== 'string') return false;

    if (!piece.hasOwnProperty(('checkable')) || typeof piece.checkable !== 'boolean') return false;

    if (!piece.hasOwnProperty('field') || typeof piece.field !== 'number') return false;
    if (piece.field < 0 || piece.field >= fields) return false;

    if (!piece.hasOwnProperty('color') || typeof piece.color !== 'number') return false;
    if (piece.color < 0 || piece.color >= colors) return false;

    return ['K', 'Q', 'R', 'B', 'N', 'P'].includes(piece.id);
}
