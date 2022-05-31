module.exports.positionToField = (x, y, w) => {
    return x + y * w;
};

module.exports.isPositionEmpty = (x, y, w, board) => {
    return board[x + y * w] === '-';
};

module.exports.isEnemyAtPosition = (x, y, w, board, color) => {
    if (board[x + y * w] === '-') return false;
    return board[x + y * w].color !== color;
}

module.exports.isAllyAtPosition = (x, y, w, board, color) => {
    if (board[x + y * w] === '-') return false;
    return board[x + y * w].color === color;
}

module.exports.isPositionEmptyOrEnemy = (x, y, w, board, color) => {
    return board[x + y * w] === '-' || board[x + y * w].color !== color;
}
