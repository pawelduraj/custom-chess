export let perpetualCheck = function(Game)
{
    if (Game.history.length > 8 && Game.Is_it_check(Game.game.board, Game.game.every_p_moves)) {
        let the_same = true;
        for (let row = 0; row < Game.game.get_rows(); row++)
            for (let col = 0; col < Game.game.get_cols(); col++)
                if (Game.history[0][row][col] !== Game.history[4][row][col] || Game.history[0][row][col] !== Game.history[8][row][col]) {
                    the_same = false;
                    return false;
                }
        if (the_same)
        {
            Game.GameStatus.setEnd(-1, 2);
            return true;
        }
    }
    return false;
}
export let mateANDpat = function (Game)
{
    for (let row = 0; row < Game.game.get_rows(); row++)
        for (let col = 0; col < Game.game.get_cols(); col++)
            for (let i = 0; i < Game.game.every_p_moves[row][col].length; i++)
                if (Game.game.set_of_piece[Game.game.every_p_moves[row][col][i].id].team === Game.n_move % 2)
                    return false;
        if (Game.Is_it_check(Game.game.board, Game.game.every_p_moves))
            Game.GameStatus.setEnd(Game.n_move % 2, 0);
        else
            Game.GameStatus.setEnd(-1, 1);
        return true;
}