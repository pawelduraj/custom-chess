const chai = require('chai');
const {expect} = chai;

const isBoardValid = require('../../utils/validators/board-validator');

describe('Board Validator', () => {
    it('should return false if the board is null', () => {
        expect(isBoardValid(null)).to.be.false;
    });

    it('should return false if the board is not an object', () => {
        expect(isBoardValid('not an object')).to.be.false;
    });

    it('should return false if the board hasn\'t id property', () => {
        expect(isBoardValid({params: [{id: 'w', value: 8}, {id: 'h', value: 8}]})).to.be.false;
    });

    it('should return false if id is not a string', () => {
        expect(isBoardValid({id: 8, params: [{id: 'w', value: 8}, {id: 'h', value: 8}]})).to.be.false;
    });

    it('should return false if the board hasn\'t params property', () => {
        expect(isBoardValid({id: 's'})).to.be.false;
    });

    it('should return false if the board params property is not an array', () => {
        expect(isBoardValid({id: 's', params: 'not an array'})).to.be.false;
    });

    it('should return false if board id is not a \'s\'', () => {
        expect(isBoardValid({id: 'not a s', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]})).to.be.false;
    });

    it('should return false if board id is a \'s\' but params is empty', () => {
        expect(isBoardValid({id: 's', params: []})).to.be.false;
    });

    it('should return false if board id is a \'s\' but there is no param with id \'w\'', () => {
        expect(isBoardValid({id: 's', params: [{id: 'h', value: 8}]})).to.be.false;
    });

    it('should return false if board id is a \'s\' but there is no param with id \'h\'', () => {
        expect(isBoardValid({id: 's', params: [{id: 'w', value: 8}]})).to.be.false;
    });

    it('should return false if board id is a \'s\' but param with id \'w\' is not a number', () => {
        expect(isBoardValid({id: 's', params: [{id: 'w', value: 'not a number'}, {id: 'h', value: 8}]})).to.be.false;
    });

    it('should return false if board id is a \'s\' but param with id \'h\' is not a number', () => {
        expect(isBoardValid({id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 'not a number'}]})).to.be.false;
    });

    it('should return false if board id is a \'s\' but param with id \'w\' is not a number from range [4, 5, ..., 14]', () => {
        expect(isBoardValid({id: 's', params: [{id: 'w', value: -2}, {id: 'h', value: 8}]})).to.be.false;
    });

    it('should return false if board id is a \'s\' but param with id \'h\' is not a number from range [5, 6, ..., 14]', () => {
        expect(isBoardValid({id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 16}]})).to.be.false;
    });

    it('should return true if board id is a \'s\' and params are valid', () => {
        for (let i = 4; i <= 14; i++) for (let j = 5; j <= 14; j++)
            expect(isBoardValid({id: 's', params: [{id: 'w', value: i}, {id: 'h', value: j}]})).to.be.true;
    });
});
