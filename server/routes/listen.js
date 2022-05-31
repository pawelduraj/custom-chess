const {parseGame} = require('../utils');
const {client} = require('../utils/redis');

module.exports = async (req, res) => {
    const {gameId} = req.query;

    if (typeof gameId !== 'string')
        return res.status(400).json({message: 'Game id is not valid'});

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    try {
        const initialGame = await client().hGetAll(`game:${gameId}`);
        res.write(`data: ${JSON.stringify(parseGame(initialGame))}\n\n`);

        const subscriber = client().duplicate();
        await subscriber.connect();
        // noinspection JSValidateTypes
        await subscriber.subscribe(`channel:${gameId}`, (game) => res.write(`data: ${game}\n\n`));
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server error'});
    }
};
