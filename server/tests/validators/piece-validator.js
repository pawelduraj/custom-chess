const chai = require('chai');
const {expect} = chai;

const isPieceValid = require('../../utils/validators/piece-validator');

describe('Piece Validator', () => {
    it('should return false if piece is null', () => {
        expect(isPieceValid(null, 64, 2)).to.be.false;
    });

    it('should return false if piece is not an object', () => {
        expect(isPieceValid(1, 64, 2)).to.be.false;
    });

    it('should return false if piece hasn\'t id property', () => {
        expect(isPieceValid({checkable: true, field: 4, color: 0}, 64, 2)).to.be.false;
    });

    it('should return false if piece id is not a string', () => {
        expect(isPieceValid({id: 1, checkable: true, field: 4, color: 0}, 64, 2)).to.be.false;
    });

    it('should return false if piece hasn\'t checkable property', () => {
        expect(isPieceValid({id: 'K', field: 4, color: 0}, 64, 2)).to.be.false;
    });

    it('should return false if piece checkable property is not a boolean', () => {
        expect(isPieceValid({id: 'K', checkable: 'not a boolean', field: 4, color: 0}, 64, 2)).to.be.false;
    });

    it('should return false if piece hasn\'t field property', () => {
        expect(isPieceValid({id: 'K', checkable: true, color: 1}, 64, 2)).to.be.false;
    });

    it('should return false if piece field property is not a number', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 'not a number', color: 0}, 64, 2)).to.be.false;
    });

    it('should return false if piece field property is not a number between 0 and number of fields minus 1', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 64, color: 0}, 64, 2)).to.be.false;
    });

    it('should return false if piece hasn\'t color property', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 24}, 64, 2)).to.be.false;
    });

    it('should return false if piece color property is not a number', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 4, color: 'not a number'}, 64, 2)).to.be.false;
    });

    it('should return false if piece color property is not a number between 0 and number of colors minus 1', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 8, color: 64}, 64, 2)).to.be.false;
    });

    it('should return true if piece is valid', () => {
        for (let i = 0; i < 64; i++) for (let j = 0; j < 2; j++) for (let k = false; k === false; k = true)
            expect(isPieceValid({id: 'K', checkable: k, field: i, color: j}, 64, 2)).to.be.true;
    });

    it('should return true if piece id exists in piece list', () => {
        ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(id => {
            expect(isPieceValid({id, checkable: true, field: 41, color: 1}, 64, 2)).to.be.true;
        });
    });

    it('should return false if piece id doesn\'t exist in piece list', () => {
        ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(id => {
            expect(isPieceValid({id: '-' + id, checkable: false, field: 41, color: 1}, 64, 2)).to.be.false;
        });
    });
});
