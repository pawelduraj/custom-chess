// noinspection JSCheckFunctionSignatures

module.exports = (game) => {
    if (game == null || typeof game !== 'object' || Object.entries(game).length === 0) return null;
    game.status = parseInt(game.status);
    game.turn = parseFloat(game.turn);
    game.players = JSON.parse(game.players);
    game.variant = JSON.parse(game.variant);
    game.time = JSON.parse(game.time);
    game.moves = JSON.parse(game.moves);
    game.draw = JSON.parse(game.draw);
    game.rematch = JSON.parse(game.rematch);
    game.board = JSON.parse(game.board);
    game.points = JSON.parse(game.points);
    return game;
};
