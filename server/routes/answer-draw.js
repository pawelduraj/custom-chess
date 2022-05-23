const {client} = require('../utils/redis');
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const {token, accept} = req.body;

    if (!jwt.verify(token, process.env.SECRET_KEY))
        return res.status(401).json({message: 'Invalid token'});

    if (accept == null || typeof accept !== 'boolean')
        return res.status(400).json({message: 'Invalid answer'});

    const {playerId, gameId} = jwt.decode(token);

    try {
        let [gameDraw, gameStatus] = await client().multi().hGet(gameId, 'draw').hGet(gameId, 'status').exec();
        gameDraw = JSON.parse(gameDraw);
        gameStatus = parseInt(gameStatus);

        if (gameStatus !== 0)
            return res.status(400).json({message: 'Game is not in progress'});

        if (gameDraw.every(index => index !== 1))
            return res.status(400).json({message: 'Draw offer cannot be answered'});

        gameDraw[playerId] = accept ? 1 : -1;

        await client().hSet(gameId, 'draw', JSON.stringify(gameDraw));

        return res.status(200).json({message: 'Draw offer answered'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
