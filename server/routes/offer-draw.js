const jwt = require('jsonwebtoken');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {token} = req.body;

    if (!jwt.verify(token, process.env.SECRET_KEY))
        return res.status(401).json({message: 'Invalid token'});

    const {playerId, gameId} = jwt.decode(token);

    try {
        let [gameDraw, gameTurn, gameStatus] = await client().multi().hGet(gameId, 'draw').hGet(gameId, 'turn').hGet(gameId, 'status').exec();
        gameDraw = JSON.parse(gameDraw);
        gameTurn = parseInt(gameTurn);
        gameStatus = parseInt(gameStatus);

        if (gameStatus !== 0)
            return res.status(400).json({message: 'Game is not in progress'});

        if (gameDraw.some(index => index !== 0))
            return res.status(400).json({message: 'Draw offer cannot be made'});

        if (Math.floor(gameTurn) % gameDraw.length !== 0)
            return res.status(400).json({message: 'It is not your turn'});

        gameDraw[playerId] = 1;

        await client().hSet(gameId, 'draw', JSON.stringify(gameDraw));

        return res.status(200).json({message: 'Draw offer sent'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
