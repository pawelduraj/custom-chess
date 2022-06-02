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

    it('should allow to give up for second player', (done) => {
       request(app).post('/api/give-up').send({token: secondPlayerData.token}).end((err, res) => {
           expect(res.body).to.have.property('message', 'OK');
           expect(res).to.have.status(200);
           done();
       });
    });

    it('should end game and first player should be winner', (done) => {
        const sse = new EventSource(`http://localhost:3000/api/listen?gameId=${firstPlayerData.gameId}`);
        sse.onmessage = (event) => {
            const game = JSON.parse(event.data);
            expect(game).to.have.property('status', 1);
            expect(game.points).to.have.lengthOf(2);
            expect(game.points[0]).to.equal(1);
            expect(game.points[1]).to.equal(0);
            sse.close();
            done();
        };
    });

    it('should not allow for first player to give up again', (done) => {
        request(app).post('/api/give-up').send({token: firstPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });

    it('should not allow for second player to give up again', (done) => {
        request(app).post('/api/give-up').send({token: secondPlayerData.token}).end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res).to.have.status(400);
            done();
        });
    });
});
