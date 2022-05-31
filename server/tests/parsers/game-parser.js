const chai = require('chai');
const {expect} = chai;

const {parseGame} = require('../../utils');

describe('Game Parser', () => {
    const parsedGame = parseGame({
        board: '[]',
        draw: '[0,0]',
        moves: '[]',
        players: '["Jane Doe","-"]',
        points: '[0,0]',
        rematch: '[0,0]',
        status: '-1',
        time: '{"limit":3,"increment":2,"last":0,"remaining":[3000,3000]}',
        turn: '0',
        variant: '{"players":2,"board":{"id":"s","params":[{"id":"w","value":8},{"id":"h","value":8}]},"pieces":[{"id":"R","checkable":false,"color":0,"field":0},{"id":"R","checkable":false,"color":0,"field":7},{"id":"N","checkable":false,"color":0,"field":1},{"id":"N","checkable":false,"color":0,"field":6},{"id":"B","checkable":false,"color":0,"field":2},{"id":"B","checkable":false,"color":0,"field":5},{"id":"Q","checkable":false,"color":0,"field":3},{"id":"K","checkable":true,"color":0,"field":4},{"id":"P","checkable":false,"color":0,"field":8},{"id":"P","checkable":false,"color":0,"field":9},{"id":"P","checkable":false,"color":0,"field":10},{"id":"P","checkable":false,"color":0,"field":11},{"id":"P","checkable":false,"color":0,"field":12},{"id":"P","checkable":false,"color":0,"field":13},{"id":"P","checkable":false,"color":0,"field":14},{"id":"P","checkable":false,"color":0,"field":15},{"id":"R","checkable":false,"color":1,"field":56},{"id":"R","checkable":false,"color":1,"field":63},{"id":"N","checkable":false,"color":1,"field":57},{"id":"N","checkable":false,"color":1,"field":62},{"id":"B","checkable":false,"color":1,"field":58},{"id":"B","checkable":false,"color":1,"field":61},{"id":"Q","checkable":false,"color":1,"field":59},{"id":"K","checkable":true,"color":1,"field":60}],"rules":[{"id":"capture-all","value":false},{"id":"castling","value":true},{"id":"multimove","value":[1]}]}',
    });

    it('should parse board to array', () => {
        expect(parsedGame.board).to.be.an('array');
    });

    it('should parse draw to array of integers', () => {
        expect(parsedGame.draw).to.deep.equal([0, 0]);
    });

    it('should parse moves to array', () => {
        expect(parsedGame.moves).to.be.an('array');
    });

    it('should parse players to array of strings', () => {
        expect(parsedGame.players).to.deep.equal(['Jane Doe', '-']);
    });

    it('should parse points to array of integers', () => {
        expect(parsedGame.points).to.deep.equal([0, 0]);
    });

    it('should parse rematch to array of integers', () => {
        expect(parsedGame.rematch).to.deep.equal([0, 0]);
    });

    it('should parse status to number', () => {
        expect(parsedGame.status).to.be.a('number');
    });

    it('should parse time to object', () => {
        expect(parsedGame.time).to.be.an('object');
    });

    it('should parse time.limit, time.increment, time.last to number', () => {
        expect(parsedGame.time.limit).to.be.a('number');
        expect(parsedGame.time.increment).to.be.a('number');
        expect(parsedGame.time.last).to.be.a('number');
    });

    it('should parse time.remaining to array of numbers', () => {
        expect(parsedGame.time.remaining).to.be.an('array');
        expect(parsedGame.time.remaining).to.have.lengthOf(2);
        expect(parsedGame.time.remaining[0]).to.be.a('number');
        expect(parsedGame.time.remaining[1]).to.be.a('number');
    });

    it('should parse turn to number', () => {
        expect(parsedGame.turn).to.be.a('number');
    });

    it('should parse variant to object', () => {
        expect(parsedGame.variant).to.be.an('object');
    });
});
