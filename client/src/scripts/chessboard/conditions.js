// eslint-disable-next-line no-unused-vars
export let f_only_0moves = function (Game, from_x, from_y, to_x, to_y) {
    return (Game.game.get_piece(from_x, from_y).c_moves === 0)
}
export let only_hit = function (Game, from_x, from_y, to_x, to_y) {
    if (Game.game.get_id_piece(to_x, to_y) === -1)
        return false
    return (Game.game.get_piece(from_x, from_y).team !== Game.game.get_piece(to_x, to_y).team)
}
export let hit_not_friend = function (Game, from_x, from_y, to_x, to_y) {
    if (Game.game.get_id_piece(to_x, to_y) === -1)
        return true;
    return (Game.game.get_piece(from_x, from_y).team !== Game.game.get_piece(to_x, to_y).team)

}
export let not_hit = function (Game, from_x, from_y, to_x, to_y) {
    return (Game.game.get_id_piece(to_x, to_y) === -1);
}
export let in_pass_up = function (Game, from_x, from_y, to_x, to_y) {
    let p = Game.game.get_id_piece(from_x, to_y);
    if (p === -1 || to_x < 1 || Game.game.set_of_piece[p].team === Game.game.get_piece(from_x, from_y).team) //czy istnije figura do bicia || czy mozna sie ruszyc dalej || czy naleza do przediwnych druzyn
        return false;
    if (Game.game.set_of_piece[p].type === 5) {
        return p === Game.history[1][to_x - 1][to_y];
    }
    return false;
}
export let in_pass_down = function (Game, from_x, from_y, to_x, to_y) {
    let p = Game.game.get_id_piece(from_x, to_y);
    if (p === -1 || to_x + 1 === Game.game.get_rows() || Game.game.set_of_piece[p].team === Game.game.get_piece(from_x, from_y).team) //czy istnije figura do bicia || czy mozna sie ruszyc dalej || czy naleza do przediwnych druzyn
        return false;
    if (Game.game.set_of_piece[p].type === 6) {
        return p === Game.history[1][to_x + 1][to_y];
    }
    return false;
}
// eslint-disable-next-line no-unused-vars
export let Castling_kingside_cond = function (Game, from_x, from_y, to_x, to_y) {
    if (Game.game.get_piece(from_x, from_y).c_moves !== 0)
        return false;
    for (let i = from_y - 1; i > 0; i--)
        if (Game.game.get_id_piece(from_x, i) !== -1)
            return false;
    let rook = Game.game.get_id_piece(from_x, 0);
    if (rook === -1)
        return false;
    return Game.game.set_of_piece[rook].c_moves === 0 && Game.game.set_of_piece[rook].type === 4
}
// eslint-disable-next-line no-unused-vars
export let Castling_queenside_cond = function (Game, from_x, from_y, to_x, to_y) {
    if (Game.game.get_piece(from_x, from_y).c_moves !== 0)
        return false;
    for (let i = from_y + 1; i < Game.game.get_cols() - 1; i++)
        if (Game.game.get_id_piece(from_x, i) !== -1)
            return false;
    let rook = Game.game.get_id_piece(from_x, Game.game.get_cols() - 1);
    if (rook === -1)
        return false;
    return Game.game.set_of_piece[rook].c_moves === 0 && Game.game.set_of_piece[rook].type === 4
}