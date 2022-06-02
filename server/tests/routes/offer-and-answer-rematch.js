const chai = require('chai');   // TODO
chai.use(require('chai-http')); // TODO
const {expect, request} = chai; // TODO

const {STANDARD_VARIANT} = require('../consts');
const EventSource = require("eventsource");

describe('POST /api/offer-rematch | POST /api/answer-rematch', () => {
    let firstPlayerData = {}, secondPlayerData = {}, newGameId = '';

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

    it('should allow to give up for first player', (done) => {
        request(app).post('/api/give-up').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should allow to offer rematch for first player', (done) => {
        request(app).post('/api/offer-rematch').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message', 'OK');
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should not allow to offer rematch again for first player', (done) => {
        request(app).post('/api/offer-rematch').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow to offer rematch for second player', (done) => {
        request(app).post('/api/offer-rematch').send({token: secondPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow to reject rematch offer for first player', (done) => {
        request(app).post('/api/answer-rematch').send({token: firstPlayerData.token, accept: false}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow to accept rematch offer for first player', (done) => {
        request(app).post('/api/answer-rematch').send({token: firstPlayerData.token, accept: true}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should allow to accept draw offer for second player and new game data should be sent', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            if (!game.hasOwnProperty('new')) return;
            expect(game.new).to.have.property('gameId');
            expect(game.new.gameId).to.not.equal(firstPlayerData.gameId);
            expect(game.new).to.have.property('tokens');
            expect(game.new.tokens).to.have.lengthOf(game.players.length);
            newGameId = game.new.gameId;
            sse.close();
            done();
        };
        setTimeout(() => {
            request(app).post('/api/answer-rematch').send({
                token: secondPlayerData.token,
                accept: true
            }).end((err, res) => {
                expect(res.body).to.have.property('message');
                expect(res).to.have.status(200);
            });
        }, 200);
    });

    it('should start new game before waiting for players', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${newGameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('status', 0);
            sse.close();
            done();
        };
    });
});
