const jwt = require('jsonwebtoken');
const isVariantValid = require('../utils/validators/variant-validator');
const {client} = require('../utils/redis.js');

module.exports = async (req, res) => {
    const {name, time, variant, color} = req.body;

    if (typeof name !== 'string' || name.length < 3 || name.length > 20)
        return res.status(400).json({error: 'Name must be between 3 and 20 characters long.'});

    if (time == null || typeof time !== 'object' || !time.hasOwnProperty('limit') || !time.hasOwnProperty('increment'))
        return res.status(400).json({error: 'Time must be an object with properties "limit" and "increment" of type number.'});
    if (typeof time.limit !== 'number' || time.limit < 1 || time.limit > 15 || Math.floor(time.limit) !== time.limit)
        return res.status(400).json({error: 'Time limit must be a number between 1 and 15.'});
    if (typeof time.increment !== 'number' || time.increment < 0 || time.increment > 15 || Math.floor(time.increment) !== time.increment)
        return res.status(400).json({error: 'Time increment must be a number between 0 and 15.'});

    if (!isVariantValid(variant)) return res.status(400).json({error: 'Variant is not valid.'});

    if (color == null || typeof color !== 'number' || color < -1 || color >= variant.players || Math.floor(color) !== color)
        return res.status(400).json({error: 'Color must be a number between -1 and ' + (variant.players - 1) + '.'});

    let gameId = getRandomGameId();

    let gameData = {
        status: -1, variant: variant,
        players: new Array(variant.players).fill(''), time: {
            limit: time.limit, increment: time.increment, last: 0,
            remaining: new Array(variant.players).fill(time.limit),
        },
        turn: -1, moves: [], board: [],
        draw: new Array(variant.players).fill(0),
        rematch: new Array(variant.players).fill(0),
        points: new Array(variant.players).fill(0)
    };

    if (color !== -1) gameData.players[color] = name;
    else gameData.players[Math.floor(Math.random() * variant.players)] = name;

    try {
        await client().hSet(gameId, 'status', gameData.status);
        await client().hSet(gameId, 'variant', JSON.stringify(gameData.variant));
        await client().hSet(gameId, 'players', JSON.stringify(gameData.players));
        await client().hSet(gameId, 'time', JSON.stringify(gameData.time));
        await client().hSet(gameId, 'turn', gameData.turn);
        await client().hSet(gameId, 'moves', JSON.stringify(gameData.moves));
        await client().hSet(gameId, 'draw', JSON.stringify(gameData.draw));
        await client().hSet(gameId, 'rematch', JSON.stringify(gameData.rematch));
        await client().hSet(gameId, 'board', JSON.stringify(gameData.board));
        await client().hSet(gameId, 'points', JSON.stringify(gameData.points));

        const token = jwt.sign({gameId: gameId, playerId: color}, process.env.SECRET_KEY, {expiresIn: '24h'});

        return res.json({token, invitation: 'http://localhost:3000/game/' + gameId});
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

function getRandomGameId() {
    return require('crypto').randomBytes(16).toString('base64url');
}
