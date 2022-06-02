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

        if (game.status !== 1)
            return res.status(400).json({message: 'Game is not ended'});

        if (game.rematch.some(index => index !== 0))
            return res.status(400).json({message: 'Rematch offer cannot be made'});

        game.rematch[playerId] = 1;

        await client().hSet(`game:${gameId}`, 'rematch', JSON.stringify(game.rematch));
        await client().publish(`channel:${gameId}`, JSON.stringify(game));

        return res.status(200).json({message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
