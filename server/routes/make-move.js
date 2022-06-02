const jwt = require('jsonwebtoken');
const {boardStandard, parseGame} = require('../utils');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {token, from, to, promote} = req.body;
    const move = {from, to, promote};

    const moveTime = new Date().getTime();

    if (!jwt.verify(token, process.env.SECRET_KEY))
        return res.status(401).json({message: 'Invalid token'});

    const {gameId, playerId} = jwt.decode(token);

    try {
        let game = parseGame(await client().hGetAll(`game:${gameId}`));

        if (game.status !== 0)
            return res.status(400).json({message: 'Game is not in progress'});

        if (Math.floor(game.turn) % game.players.length !== playerId)
            return res.status(400).json({message: 'It is not your turn'});

        if (game.time.remaining[playerId] < moveTime - game.time.last)
            return res.status(400).json({message: 'You have run out of time'});

        if (game.variant.board.id === 's') {
            if (!boardStandard.isMoveValid(move, game.board, game.variant))
                return res.status(400).json({message: 'Invalid move'});
            game.board = boardStandard.makeValidMoveAndReturnBoard(move, game.board, game.variant);
            game = boardStandard.goToNextTurnAndReturnGame(game, {
                from: move.from, to: move.to, promote: move.promote, time: moveTime
            });
        } else return res.status(500).json({message: 'Internal server error'});

        // noinspection JSCheckFunctionSignatures
        await client().multi()
            .hSet(`game:${gameId}`, 'status', game.status)
            .hSet(`game:${gameId}`, 'turn', game.turn)
            .hSet(`game:${gameId}`, 'players', JSON.stringify(game.players))
            .hSet(`game:${gameId}`, 'variant', JSON.stringify(game.variant))
            .hSet(`game:${gameId}`, 'time', JSON.stringify(game.time))
            .hSet(`game:${gameId}`, 'moves', JSON.stringify(game.moves))
            .hSet(`game:${gameId}`, 'draw', JSON.stringify(game.draw))
            .hSet(`game:${gameId}`, 'rematch', JSON.stringify(game.rematch))
            .hSet(`game:${gameId}`, 'board', JSON.stringify(game.board))
            .hSet(`game:${gameId}`, 'points', JSON.stringify(game.points))
            .exec();
        await client().publish(`channel:${gameId}`, JSON.stringify(game));

        return res.status(200).json({message: 'OK'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
