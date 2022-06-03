const analyzeBoardAfterPlayerMove = require('./board-analyzer');
const makeValidMoveAndReturnBoard = require('./board-valid-move-maker');
const {positionToField, isPositionEmpty, isEnemyAtPosition} = require('./board-utils');

function getAllAttackingFields(from, board, variant) {
    const w = variant.board.params.find(p => p.id === 'w').value;
    const h = variant.board.params.find(p => p.id === 'h').value;
    const x = from % w, y = Math.floor(from / w), color = board[from].color, moved = board[from].moved, max = w * h;
    let moves = [];

    if (color === 0) {
        if (0 <= positionToField(x + 1, y + 1, w) && positionToField(x + 1, y + 1, w) < max && isPositionEmpty(x + 1, y + 1, w, board))
            moves.push(positionToField(x + 1, y + 1, w));

        if (0 <= positionToField(x + 2, y + 2, w) && positionToField(x + 2, y + 2, w) < max && isPositionEmpty(x + 2, y + 2, w, board) && moved === false)
            moves.push(positionToField(x + 2, y + 2, w));

        if (0 <= positionToField(x + 1, y - 1, w) && positionToField(x + 1, y - 1, w) < max && isPositionEmpty(x + 1, y - 1, w, board))
            moves.push(positionToField(x + 1, y - 1, w));

        if (0 <= positionToField(x + 2, y - 2, w) && positionToField(x + 2, y - 2, w) < max && isPositionEmpty(x + 2, y - 2, w, board) && moved === false)
            moves.push(positionToField(x + 2, y - 2, w));

        if (0 <= positionToField(x + 1, y, w) && positionToField(x + 1, y, w) < max && isEnemyAtPosition(x + 1, y, w, board, color))
            moves.push(positionToField(x + 1, y, w));
    } else if (color === 1) {
        if (0 <= positionToField(x - 1, y + 1, w) && positionToField(x - 1, y + 1, w) < max && isPositionEmpty(x - 1, y + 1, w, board))
            moves.push(positionToField(x - 1, y + 1, w));

        if (0 <= positionToField(x - 2, y + 2, w) && positionToField(x - 2, y + 2, w) < max && isPositionEmpty(x - 2, y + 2, w, board) && moved === false)
            moves.push(positionToField(x - 2, y + 2, w));

        if (0 <= positionToField(x - 1, y - 1, w) && positionToField(x - 1, y - 1, w) < max && isPositionEmpty(x - 1, y - 1, w, board))
            moves.push(positionToField(x - 1, y - 1, w));

        if (0 <= positionToField(x - 2, y - 2, w) && positionToField(x - 2, y - 2, w) < max && isPositionEmpty(x - 2, y - 2, w, board) && moved === false)
            moves.push(positionToField(x - 2, y - 2, w));

        if (0 <= positionToField(x - 1, y, w) && positionToField(x - 1, y, w) < max && isEnemyAtPosition(x - 1, y, w, board, color))
            moves.push(positionToField(x - 1, y, w));
    }

    return moves;
}

function getAllPossibleMoves(from, board, variant) {
    return getAllAttackingFields(from, board, variant).filter((to) => analyzeBoardAfterPlayerMove(makeValidMoveAndReturnBoard(
        {from, to, promote: '-'}, board, variant), variant, board[from].color) === 0);
}

module.exports = {getAllAttackingFields, getAllPossibleMoves};
