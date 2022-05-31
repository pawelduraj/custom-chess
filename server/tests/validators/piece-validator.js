const chai = require('chai');
const {expect} = chai;

const {isPieceValid} = require('../../utils');
const {STANDARD_VARIANT} = require('../consts');

describe('Piece Validator', () => {
    it('should return false if piece is null or undefined', () => {
        expect(isPieceValid(null, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece is not an object', () => {
        expect(isPieceValid(1, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece has not id property', () => {
        expect(isPieceValid({checkable: true, field: 4, color: 0}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece id is not a string', () => {
        expect(isPieceValid({id: 1, checkable: true, field: 4, color: 0}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece has not checkable property', () => {
        expect(isPieceValid({id: 'K', field: 4, color: 0}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece checkable property is not a boolean', () => {
        expect(isPieceValid({id: 'K', checkable: 'not a boolean', field: 4, color: 0}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece has not field property', () => {
        expect(isPieceValid({id: 'K', checkable: true, color: 1}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece field property is not a number', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 'not a number', color: 0}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece field property is not a field id from standard board', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 64, color: 0}, STANDARD_VARIANT)).to.be.false;
        expect(isPieceValid({id: 'K', checkable: true, field: -1, color: 0}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece has not color property', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 24}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece color property is not a number', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 4, color: 'not a number'}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return false if piece color property is not a number between 0 and number of players minus 1', () => {
        expect(isPieceValid({id: 'K', checkable: true, field: 8, color: 64}, STANDARD_VARIANT)).to.be.false;
        expect(isPieceValid({id: 'K', checkable: true, field: 8, color: -1}, STANDARD_VARIANT)).to.be.false;
        expect(isPieceValid({id: 'K', checkable: true, field: 8, color: 2}, STANDARD_VARIANT)).to.be.false;
    });

    it('should return true if piece is valid', () => {
        for (let i = 0; i < 64; i++) for (let j = 0; j < 2; j++) for (let k = false; k === false; k = true)
            expect(isPieceValid({id: 'K', checkable: k, field: i, color: j}, STANDARD_VARIANT)).to.be.true;
    });

    it('should return true if piece id exists in piece list', () => {
        ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(id => {
            expect(isPieceValid({id, checkable: true, field: 41, color: 0}, STANDARD_VARIANT)).to.be.true;
        });
    });

    it('should return false if piece id does not exist in piece list', () => {
        ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(id => {
            expect(isPieceValid({id: '-' + id, checkable: false, field: 41, color: 1}, STANDARD_VARIANT)).to.be.false;
        });
    });
});
