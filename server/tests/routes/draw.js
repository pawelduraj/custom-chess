const chai = require('chai');
chai.use(require('chai-http'));
const {expect, request} = chai;

const NEW_GAME_PAYLOAD = {
    name: 'John Doe', time: {limit: 3, increment: 2}, color: 0, variant: {
        players: 2, rules: [], pieces: [],
        board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]}
    }
};

describe('Draw Routes', () => {
    it('should allow the player making the move to offer a draw', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        const drawOfferResponse = await request(app).post('/api/offer-draw').send({token: newGameResponse.body.token});
        expect(drawOfferResponse).to.have.status(200);
    });

    it('should not allow the player not making the move to offer a draw', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        const drawOfferResponse = await request(app).post('/api/offer-draw').send({token: joinResponse.body.token});
        expect(drawOfferResponse).to.have.status(400);
    });

    it('should not allow a draw offer to be sent by player who did not create or join the game', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        const drawOfferResponse = await request(app).post('/api/offer-draw').send({token: 'invalid token'});
        expect(drawOfferResponse).to.have.status(401);
    });

    it('should not be possible to accept draw if no draw offer had been sent', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        let answerDrawResponse;
        answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: newGameResponse.body.token,
            accept: true
        });
        expect(answerDrawResponse).to.have.status(400);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: joinResponse.body.token,
            accept: true
        });
        expect(answerDrawResponse).to.have.status(400);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({token: 'invalid token', accept: true});
        expect(answerDrawResponse).to.have.status(401);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: newGameResponse.body.token,
            accept: false
        });
        expect(answerDrawResponse).to.have.status(400);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: joinResponse.body.token,
            accept: false
        });
        expect(answerDrawResponse).to.have.status(400);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({token: 'invalid token', accept: false});
        expect(answerDrawResponse).to.have.status(401);
    });

    it('should not be possible to send draw offer if game has not started', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);

        const drawOfferResponse = await request(app).post('/api/offer-draw').send({token: newGameResponse.body.token});
        expect(drawOfferResponse).to.have.status(400);
    });

    it('should not allow to accept or decline draw offer for player who made the offer', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        let drawOfferResponse, answerDrawResponse;
        drawOfferResponse = await request(app).post('/api/offer-draw').send({token: newGameResponse.body.token});
        expect(drawOfferResponse).to.have.status(200);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: newGameResponse.body.token,
            accept: true
        });
        expect(answerDrawResponse).to.have.status(400);
        answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: newGameResponse.body.token,
            accept: false
        });
        expect(answerDrawResponse).to.have.status(400);
    });

    it('should be possible to accept draw offer by another player', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        const drawOfferResponse = await request(app).post('/api/offer-draw').send({token: newGameResponse.body.token});
        expect(drawOfferResponse).to.have.status(200);
        const answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: joinResponse.body.token,
            accept: true
        });
        expect(answerDrawResponse).to.have.status(200);
    });

    it('should be possible to decline draw offer by another player', async () => {
        const newGameResponse = await request(app).post('/api/create-new-game').send(NEW_GAME_PAYLOAD);
        const gameId = newGameResponse.body.invitation.split('/')[newGameResponse.body.invitation.split('/').length - 1];
        const JOIN_PAYLOAD = {name: 'Donald Duck', gameId: gameId};
        const joinResponse = await request(app).post('/api/join-game').send({JOIN_PAYLOAD, gameId});

        const drawOfferResponse = await request(app).post('/api/offer-draw').send({token: newGameResponse.body.token});
        expect(drawOfferResponse).to.have.status(200);
        const answerDrawResponse = await request(app).post('/api/answer-draw').send({
            token: joinResponse.body.token,
            accept: false
        });
        expect(answerDrawResponse).to.have.status(200);
    });

    // TODO add tests for sending draw offer several times in one turn (should not be possible, move route required)
});
