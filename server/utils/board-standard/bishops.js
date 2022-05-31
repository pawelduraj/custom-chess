const analyzeBoardAfterPlayerMove = require('./board-analyzer');
const makeValidMoveAndReturnBoard = require('./board-valid-move-maker');
const {positionToField, isAllyAtPosition, isPositionEmptyOrEnemy} = require('./board-utils');

function getAllAttackingFields(from, board, variant) {
    const w = variant.board.params.find(p => p.id === 'w').value;
    const h = variant.board.params.find(p => p.id === 'h').value;
    const x = from % w, y = Math.floor(from / w), color = board[from].color, moved = board[from].moved, max = w * h;
    let moves = [];

    for (let i = 1; 0 <= positionToField(x + i, y + i, w) && positionToField(x + i, y + i, w) < max; i++) {
        if (isPositionEmptyOrEnemy(x + i, y + i, w, board, color))
            moves.push(positionToField(x + i, y + i, w));
        if (isAllyAtPosition(x + i, y + i, w, board, color)) break;
    }

    for (let i = 1; 0 <= positionToField(x - i, y + i, w) && positionToField(x - i, y + i, w) < max; i++) {
        if (isPositionEmptyOrEnemy(x - i, y + i, w, board, color))
            moves.push(positionToField(x - i, y + i, w));
        if (isAllyAtPosition(x - i, y + i, w, board, color)) break;
    }

    for (let i = 1; 0 <= positionToField(x + i, y - i, w) && positionToField(x + i, y - i, w) < max; i++) {
        if (isPositionEmptyOrEnemy(x + i, y - i, w, board, color))
            moves.push(positionToField(x + i, y - i, w));
        if (isAllyAtPosition(x + i, y - i, w, board, color)) break;
    }

    for (let i = 1; 0 <= positionToField(x - i, y - i, w) && positionToField(x - i, y - i, w) < max; i++) {
        if (isPositionEmptyOrEnemy(x - i, y - i, w, board, color))
            moves.push(positionToField(x - i, y - i, w));
        if (isAllyAtPosition(x - i, y - i, w, board, color)) break;
    }

    return moves;
}

function getAllPossibleMoves(from, board, variant) {
    return getAllAttackingFields(from, board, variant).filter((to) => analyzeBoardAfterPlayerMove(makeValidMoveAndReturnBoard(
        {from, to, promote: '-'}, board, variant), variant, board[from].color) === 0);
}

module.exports = {getAllAttackingFields, getAllPossibleMoves};
