const jwt = require('jsonwebtoken');
const isNameValid = require('../utils/validators/name-validator');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {name, gameId} = req.body;

    if (!isNameValid(name)) return res.status(400).json({error: 'Name is not valid'});

    if (typeof gameId !== 'string') return res.status(400).json({error: 'Game id is not valid'});

    try {
        let game = await client().hGetAll(gameId);
        game.players = JSON.parse(game.players);
        let playerId = game.players.findIndex(player => player === '');
        if (playerId === -1) return res.status(400).json({error: 'Game is full'});
        game.players[playerId] = name;
        await client().hSet(gameId, 'players', JSON.stringify(game.players));

        const token = jwt.sign({gameId, playerId}, process.env.SECRET_KEY, {expiresIn: '24h'});

        return res.json({token, invitation: 'http://localhost:3000/game/' + gameId});
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
};
