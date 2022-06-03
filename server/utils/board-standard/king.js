const analyzeBoardAfterPlayerMove = require('./board-analyzer');
const makeValidMoveAndReturnBoard = require('./board-valid-move-maker');
const {positionToField, isPositionEmptyOrEnemy} = require('./board-utils');

function getAllAttackingFields(from, board, variant) {
    const w = variant.board.params.find(p => p.id === 'w').value;
    const h = variant.board.params.find(p => p.id === 'h').value;
    const x = from % w, y = Math.floor(from / w), color = board[from].color, moved = board[from].moved, max = w * h;
    let moves = [];

    if (positionToField(x + 1, y + 1, w, h) !== -1 && isPositionEmptyOrEnemy(x + 1, y + 1, w, board, color))
        moves.push(positionToField(x + 1, y + 1, w, h));

    if (positionToField(x + 1, y - 1, w, h) !== -1 && isPositionEmptyOrEnemy(x + 1, y - 1, w, board, color))
        moves.push(positionToField(x + 1, y - 1, w, h));

    if (positionToField(x - 1, y + 1, w, h) !== -1 && isPositionEmptyOrEnemy(x - 1, y + 1, w, board, color))
        moves.push(positionToField(x - 1, y + 1, w, h));

    if (positionToField(x - 1, y - 1, w, h) !== -1 && isPositionEmptyOrEnemy(x - 1, y - 1, w, board, color))
        moves.push(positionToField(x - 1, y - 1, w, h));

    if (positionToField(x + 1, y, w, h) !== -1 && isPositionEmptyOrEnemy(x + 1, y, w, board, color))
        moves.push(positionToField(x + 1, y, w, h));

    if (positionToField(x - 1, y, w, h) !== -1 && isPositionEmptyOrEnemy(x - 1, y, w, board, color))
        moves.push(positionToField(x - 1, y, w, h));

    if (positionToField(x, y + 1, w, h) !== -1 && isPositionEmptyOrEnemy(x, y + 1, w, board, color))
        moves.push(positionToField(x, y + 1, w, h));

    if (positionToField(x, y - 1, w, h) !== -1 && isPositionEmptyOrEnemy(x, y - 1, w, board, color))
        moves.push(positionToField(x, y - 1, w, h));

    return moves;
}

function getAllPossibleMoves(from, board, variant) {
    return getAllAttackingFields(from, board, variant).filter((to) => analyzeBoardAfterPlayerMove(makeValidMoveAndReturnBoard(
        {from, to, promote: '-'}, board, variant), variant, board[from].color) === 0);
}

module.exports = {getAllAttackingFields, getAllPossibleMoves};
