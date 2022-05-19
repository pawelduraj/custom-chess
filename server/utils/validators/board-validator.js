module.exports = (board) => {
    if (board == null || typeof board !== 'object') return false;

    if (!board.hasOwnProperty('id') || typeof board.id !== 'string') return false;

    if (!board.hasOwnProperty(('params')) || !Array.isArray(board.params)) return false;

    if (!board.params.every(param => param.hasOwnProperty('id') && param.hasOwnProperty('value'))) return false;

    if (board.id === 's') {
        let w = board.params.find(param => param.id === 'w');
        let h = board.params.find(param => param.id === 'h');
        if (w == null || h == null || typeof w !== 'object' || typeof h !== 'object') return false;
        if (!w.hasOwnProperty('value') || !h.hasOwnProperty('value')) return false;
        return [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(w.value) && [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(h.value);
    }

    return false;
}
