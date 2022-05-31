const EventSource = require('eventsource');
const chai = require('chai');
chai.use(require('chai-http'));
const {expect, request} = chai;

const {STANDARD_VARIANT} = require('../consts');

describe('POST /api/create-new-game | POST /api/join-game', () => {
    let firstPlayerData = {};

    it('should create a game', (done) => {
        request(app).post('/api/create-new-game').send({
            name: 'John Doe', time: {limit: 3, increment: 2},
            color: 0, variant: STANDARD_VARIANT
        }).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('gameId');
            expect(res.body).to.have.property('playerId');
            firstPlayerData = res.body;
            done();
        });
    });

    it('should not start the game before all players have joined', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('status', -1);
            sse.close();
            done();
        };
    });

    it('should allow second player to join the game', (done) => {
        request(app).post('/api/join-game').send({
            name: 'Jane Doe', gameId: firstPlayerData.gameId,
        }).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('gameId');
            expect(res.body).to.have.property('playerId');
            done();
        });
    });

    it('should start the game when all players have joined', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('status', 0);
            sse.close();
            done();
        };
    });

    it('should not allow third player to join the game', (done) => {
        request(app).post('/api/join-game').send({
            name: 'John Doe', gameId: firstPlayerData.gameId,
        }).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });
});
