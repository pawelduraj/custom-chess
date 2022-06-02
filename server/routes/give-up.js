const jwt = require('jsonwebtoken');
const {parseGame} = require('../utils');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {token} = req.body;

    if (!jwt.verify(token, process.env.SECRET_KEY))
        return res.status(401).json({message: 'Invalid token'});

    const {playerId, gameId} = jwt.decode(token);

    try {
        let game = parseGame(await client().hGetAll(`game:${gameId}`));

        if (game.status !== 0)
            return res.status(400).json({message: 'Game is not in progress'});

        game.status = 1;
        game.points = new Array(game.players.length).fill(1);
        game.points[playerId] = 0;

        await client().hSet(`game:${gameId}`, 'draw', JSON.stringify(game.draw));
        await client().hSet(`game:${gameId}`, 'status', game.status);
        await client().hSet(`game:${gameId}`, 'points', JSON.stringify(game.points));
        await client().publish(`channel:${gameId}`, JSON.stringify(game));

        return res.status(200).json({message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
