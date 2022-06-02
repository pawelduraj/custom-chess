const jwt = require('jsonwebtoken');
const {parseGame, isNameValid} = require('../utils');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {name, gameId} = req.body;

    if (!isNameValid(name))
        return res.status(400).json({message: 'Name is not valid'});

    if (gameId == null || typeof gameId !== 'string')
        return res.status(400).json({message: 'Game id is not valid'});

    try {
        let game = parseGame(await client().hGetAll(`game:${gameId}`));

        if (game == null)
            return res.status(400).json({message: 'Game does not exist'});

        let playerId = game.players.findIndex(player => player === '-');

        if (playerId === -1) return res.status(400).json({message: 'Game is full'});

        game.players[playerId] = name;

        await client().hSet(`game:${gameId}`, 'players', JSON.stringify(game.players));

        if (game.players.every(p => p !== '-')) {
            game.status = 0;
            await client().hSet(`game:${gameId}`, 'status', game.status);
        }

        await client().publish(`channel:${gameId}`, JSON.stringify(game));

        const token = jwt.sign({gameId, playerId}, process.env.SECRET_KEY, {expiresIn: '24h'});

        return res.json({token, gameId, playerId, message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
