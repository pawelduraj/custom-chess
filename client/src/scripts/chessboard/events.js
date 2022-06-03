export let in_pass_event = function (Game, from_x, from_y, to_x, to_y) {
    Game.game.set_piece(from_x, to_y, -1);
}
export let Castling_kingside_event = function (Game, from_x, from_y, to_x, to_y) {
    let rook = Game.game.get_id_piece(from_x, 0);
    Game.game.set_piece(from_x, to_y + 1, rook);
    Game.game.set_piece(from_x, 0, -1);
    Game.game.set_of_piece[rook].c_moves++;
}
export let Castling_queenside_event = function (Game, from_x, from_y, to_x, to_y) {
    let rook = Game.game.get_id_piece(from_x, Game.game.get_cols() - 1);
    Game.game.set_piece(from_x, to_y - 1, rook);
    Game.game.set_piece(from_x, Game.game.get_cols() - 1, -1);
    Game.game.set_of_piece[rook].c_moves++;
}
export let change_pawn = function (Game, currentMove) {
    if (!currentMove)
        return;
    for (let i = 0; i < Game.game.get_cols(); i++) {
        let piece = Game.game.get_piece(0, i);
        if (piece === null)
            continue;
        if (piece.type === 6 || piece.type === 13) {
            Game.Interaction.run(Game.game.get_id_piece(0, i));
        }
    }
    for (let i = 0; i < Game.game.get_cols(); i++) {
        let piece = Game.game.get_piece(Game.game.get_rows() - 1, i);
        if (piece === null)
            continue;
        if (piece.type === 5 || piece.type === 12) {
            Game.Interaction.run(Game.game.get_id_piece(Game.game.get_rows() - 1, i));
        }
    }
}