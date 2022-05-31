const jwt = require('jsonwebtoken');
const {isNameValid, isVariantValid} = require('../utils');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {name, time, variant, color} = req.body;

    if (!isNameValid(name))
        return res.status(400).json({message: 'Invalid name'});

    if (time == null || typeof time !== 'object' || !time.hasOwnProperty('limit') || !time.hasOwnProperty('increment'))
        return res.status(400).json({message: 'Time must be an object with properties "limit" and "increment" of type number'});
    if (typeof time.limit !== 'number' || time.limit < 1 || time.limit > 15 || Math.floor(time.limit) !== time.limit)
        return res.status(400).json({message: 'Time limit must be a number between 1 and 15'});
    if (typeof time.increment !== 'number' || time.increment < 0 || time.increment > 15 || Math.floor(time.increment) !== time.increment)
        return res.status(400).json({message: 'Time increment must be a number between 0 and 15'});

    if (!isVariantValid(variant))
        return res.status(405).json({message: 'Variant is not valid'});

    if (color == null || typeof color !== 'number' || color < -1 || color >= variant.players || Math.floor(color) !== color)
        return res.status(400).json({message: 'Color must be a number between -1 and ' + (variant.players - 1)});

    let gameId = getRandomGameId();

    let game = {
        status: -1, variant: variant,
        players: new Array(variant.players).fill('-'), time: {
            limit: time.limit, increment: time.increment, last: new Date().getTime() + 86400000,
            remaining: new Array(variant.players).fill(time.limit * 60000),
        },
        turn: 0, moves: [], board: [],
        draw: new Array(variant.players).fill(0),
        rematch: new Array(variant.players).fill(0),
        points: new Array(variant.players).fill(0)
    };

    // TODO setup board for different board types
    game.board = new Array(variant.board.params.find(p => p.id === 'w').value * variant.board.params.find(p => p.id === 'h').value).fill('-');
    for (let i = 0; i < variant.pieces.length; i++)
        game.board[variant.pieces[i].field] = {
            id: variant.pieces[i].id,
            checkable: variant.pieces[i].checkable,
            color: variant.pieces[i].color,
            moved: false
        };

    let playerId = color !== -1 ? color : Math.floor(Math.random() * variant.players);
    game.players[playerId] = name;

    try {
        // noinspection JSCheckFunctionSignatures
        await client().multi()
            .hSet(`game:${gameId}`, 'status', JSON.stringify(game.status))
            .hSet(`game:${gameId}`, 'variant', JSON.stringify(game.variant))
            .hSet(`game:${gameId}`, 'players', JSON.stringify(game.players))
            .hSet(`game:${gameId}`, 'time', JSON.stringify(game.time))
            .hSet(`game:${gameId}`, 'turn', JSON.stringify(game.turn))
            .hSet(`game:${gameId}`, 'moves', JSON.stringify(game.moves))
            .hSet(`game:${gameId}`, 'draw', JSON.stringify(game.draw))
            .hSet(`game:${gameId}`, 'rematch', JSON.stringify(game.rematch))
            .hSet(`game:${gameId}`, 'board', JSON.stringify(game.board))
            .hSet(`game:${gameId}`, 'points', JSON.stringify(game.points))
            .exec();

        const token = jwt.sign({gameId, playerId}, process.env.SECRET_KEY, {expiresIn: '24h'});

        return res.json({token, gameId, playerId, message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};

function getRandomGameId() {
    return require('crypto').randomBytes(16).toString('base64url');
}
