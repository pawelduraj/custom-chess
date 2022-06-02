const jwt = require('jsonwebtoken');
const {parseGame} = require('../utils');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {token, accept} = req.body;

    if (!jwt.verify(token, process.env.SECRET_KEY))
        return res.status(401).json({message: 'Invalid token'});

    if (accept == null || typeof accept !== 'boolean')
        return res.status(400).json({message: 'Invalid answer'});

    const {playerId, gameId} = jwt.decode(token);

    try {
        let game = parseGame(await client().hGetAll(`game:${gameId}`));

        if (game.rematch.every(index => index === 0))
            return res.status(400).json({message: 'Rematch offer cannot be answered'});

        if (game.rematch[playerId] !== 0)
            return res.status(400).json({message: 'You have already answered'});

        game.rematch[playerId] = accept ? 1 : -1;
        await client().hSet(`game:${gameId}`, 'rematch', JSON.stringify(game.rematch));

        if (game.rematch.every(index => index === 1)) {
            let newGameId = getRandomGameId();

            let newGame = {
                status: 0, variant: game.variant,
                players: new Array(game.variant.players).fill('-'), time: {
                    limit: game.time.limit, increment: game.time.increment, last: new Date().getTime() + 86400000,
                    remaining: new Array(game.variant.players).fill(game.time.limit * 60000),
                },
                turn: 0, moves: [], board: [],
                draw: new Array(game.variant.players).fill(0),
                rematch: new Array(game.variant.players).fill(0),
                points: new Array(game.variant.players).fill(0)
            };

            // TODO setup board for different board types
            newGame.board = new Array(game.variant.board.params.find(p => p.id === 'w').value * game.variant.board.params.find(p => p.id === 'h').value).fill('-');
            for (let i = 0; i < game.variant.pieces.length; i++)
                newGame.board[game.variant.pieces[i].field] = {
                    id: game.variant.pieces[i].id,
                    checkable: game.variant.pieces[i].checkable,
                    color: game.variant.pieces[i].color,
                    moved: false
                };

            for (let i = 0; i < game.players.length; i++)
                newGame.players[(i + 1) % game.players.length] = game.players[i];

            await client().multi()
                .hSet(`game:${newGameId}`, 'status', JSON.stringify(newGame.status))
                .hSet(`game:${newGameId}`, 'variant', JSON.stringify(newGame.variant))
                .hSet(`game:${newGameId}`, 'players', JSON.stringify(newGame.players))
                .hSet(`game:${newGameId}`, 'time', JSON.stringify(newGame.time))
                .hSet(`game:${newGameId}`, 'turn', JSON.stringify(newGame.turn))
                .hSet(`game:${newGameId}`, 'moves', JSON.stringify(newGame.moves))
                .hSet(`game:${newGameId}`, 'draw', JSON.stringify(newGame.draw))
                .hSet(`game:${newGameId}`, 'rematch', JSON.stringify(newGame.rematch))
                .hSet(`game:${newGameId}`, 'board', JSON.stringify(newGame.board))
                .hSet(`game:${newGameId}`, 'points', JSON.stringify(newGame.points))
                .exec();

            game.new = {gameId: newGameId, tokens: []};
            for (let i = 0; i < game.players.length; i++)
                game.new.tokens.push(jwt.sign({playerId: i, gameId: newGameId}, process.env.SECRET_KEY));
        }

        await client().publish(`channel:${gameId}`, JSON.stringify(game))

        return res.status(200).json({message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};

function getRandomGameId() {
    return require('crypto').randomBytes(16).toString('base64url');
}
