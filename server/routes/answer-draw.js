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

        if (game.status !== 0)
            return res.status(400).json({message: 'Game is not in progress'});

        if (game.draw.every(index => index !== 1))
            return res.status(400).json({message: 'Draw offer cannot be answered'});

        if(game.draw[playerId] !== 0)
            return res.status(400).json({message: 'You have already answered'});

        game.draw[playerId] = accept ? 1 : -1;
        await client().hSet(`game:${gameId}`, 'draw', JSON.stringify(game.draw));

        if (game.draw.every(index => index === 1)) {
            game.status = 1;
            game.points = [0.5, 0.5];
            await client().hSet(`game:${gameId}`, 'status', JSON.stringify(game.status));
            await client().hSet(`game:${gameId}`, 'points', JSON.stringify(game.points));
        }

        await client().publish(`channel:${gameId}`, JSON.stringify(game));

        return res.status(200).json({message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
