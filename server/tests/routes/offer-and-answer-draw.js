const chai = require('chai');
chai.use(require('chai-http'));
const {expect, request} = chai;

const {STANDARD_VARIANT} = require('../consts');
const EventSource = require("eventsource");

describe('POST /api/offer-draw | POST /api/answer-draw', () => {
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

    it('should not allow to offer draw for second player', (done) => {
        request(app).post('/api/offer-draw').send({token: secondPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should allow to offer draw for first player', (done) => {
        request(app).post('/api/offer-draw').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should not allow to offer draw again for first player', (done) => {
        request(app).post('/api/offer-draw').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow to reject draw offer for first player', (done) => {
        request(app).post('/api/answer-draw').send({token: firstPlayerData.token, accept: false}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow to accept draw offer for first player', (done) => {
        request(app).post('/api/answer-draw').send({token: firstPlayerData.token, accept: true}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should allow to reject draw offer for second player', (done) => {
        request(app).post('/api/answer-draw').send({token: secondPlayerData.token, accept: false}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should continue game after second player rejects draw offer', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('status', 0);
            sse.close();
            done();
        };
    });

    it('should not allow for first player to offer draw again in the same turn', (done) => {
        request(app).post('/api/offer-draw').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow for second player to offer draw again in the same turn', (done) => {
        request(app).post('/api/offer-draw').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should allow for first player to make move after second player rejects draw offer', (done) => {
        request(app).post('/api/make-move').send({
            token: firstPlayerData.token, from: 12, to: 20, promote: '-'
        }).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should not allow for first player to offer draw', (done) => {
        request(app).post('/api/offer-draw').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should allow for second player to offer draw', (done) => {
        request(app).post('/api/offer-draw').send({token: secondPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should allow for first player to accept draw offer', (done) => {
        request(app).post('/api/answer-draw').send({token: firstPlayerData.token, accept: true}).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should end game with draw', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('status', 1);
            expect(game.points).to.have.lengthOf(2);
            expect(game.points[0]).to.equal(0.5);
            expect(game.points[1]).to.equal(0.5);
            sse.close();
            done();
        };
    });
});
