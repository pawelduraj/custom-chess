module.exports = function makeValidMoveAndReturnBoard(move, board, variant) {
    let b = JSON.parse(JSON.stringify(board));

    b[move.to] = b[move.from];
    b[move.to].moved = true;
    b[move.from] = '-';
    return b;
}
