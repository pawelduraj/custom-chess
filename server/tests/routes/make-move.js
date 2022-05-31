const EventSource = require('eventsource');
const chai = require('chai');
chai.use(require('chai-http'));
const {expect, request} = chai;

const {STANDARD_VARIANT} = require('../consts');

describe('POST /api/make-move', () => {
    let firstPlayerData = {}, secondPlayerData = {};

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

    it('should allow second player to join the game', (done) => {
        request(app).post('/api/join-game').send({
            name: 'Jane Doe', gameId: firstPlayerData.gameId,
        }).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('gameId');
            expect(res.body).to.have.property('playerId');
            secondPlayerData = res.body;
            done();
        });
    });

    it('should not allow to make move in place', (done => {
        request(app).post('/api/make-move').send({
            token: firstPlayerData.token, move: {from: 0, to: 0, promote: '-'}
        }).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    }));

    it('should not allow to make move for second player', (done => {
        request(app).post('/api/make-move').send({
            token: secondPlayerData.token, move: {from: 0, to: 0, promote: '-'}
        }).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    }));

    it('should not allow to move black piece by first player', (done) => {
        request(app).post('/api/make-move').send({
            token: firstPlayerData.token, move: {from: 55, to: 47, promote: '-'}
        }).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should allow to play e4 by first player', (done) => {
        request(app).post('/api/make-move').send({
            token: firstPlayerData.token, move: {from: 12, to: 20, promote: '-'}
        }).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should be second player turn', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('turn', 1);
            sse.close();
            done();
        };
    });
});
