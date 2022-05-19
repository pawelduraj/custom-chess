const chai = require('chai');
chai.use(require('chai-http'));
const {expect, request} = chai;

describe('POST /api/join-game', () => {
    it('second player should join to 2 player game', (done) => {
        request(app).post('/api/create-new-game').send({
            name: 'John Doe', time: {limit: 3, increment: 2}, color: 0, variant: {
                players: 2, rules: [], pieces: [],
                board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]}
            }
        }).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('invitation');
            let gameId = res.body.invitation.split('/');
            gameId = gameId[gameId.length - 1];
            request(app).post('/api/join-game').send({
                name: 'Jane Doe', gameId
            }).then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('invitation');
                done();
            }).catch(err => done(err));
        }).catch(err => done(err));
    });

    it('third player shouldn\'t join to 2 player game', (done) => {
        request(app).post('/api/create-new-game').send({
            name: 'John Doe', time: {limit: 3, increment: 2}, color: 0, variant: {
                players: 2, rules: [], pieces: [],
                board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]}
            }
        }).then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('invitation');
            let gameId = res.body.invitation.split('/');
            gameId = gameId[gameId.length - 1];
            request(app).post('/api/join-game').send({
                name: 'Jane Doe', gameId
            }).then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('invitation');
                request(app).post('/api/join-game').send({
                    name: 'Anonymous', gameId
                }).then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                }).catch(err => done(err));
            }).catch(err => done(err));
        }).catch(err => done(err));
    });
});
