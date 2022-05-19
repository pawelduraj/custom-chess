const chai = require('chai');
chai.use(require('chai-http'));
const {expect, request} = chai;

describe('POST /api/create-new-game', () => {
    it('should create a game', (done) => {
        request(app).post('/api/create-new-game').send({
            name: 'John Doe', time: {limit: 3, increment: 2}, color: 0, variant: {
                players: 2, rules: [], pieces: [],
                board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]}
            }
        }).end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('invitation');
            done();
        });
    });
});
