const chai = require('chai');
const {expect} = chai;

const isVariantValid = require('../../utils/validators/variant-validator');

describe('Variant Validator', () => {
    it('should return false if variant is null', () => {
        expect(isVariantValid(null)).to.be.false;
    });

    it('should return false if variant is not an object', () => {
        expect(isVariantValid('string')).to.be.false;
    });

    it('should return false if variant hasn\'t players property', () => {
        expect(isVariantValid({
            board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]}, rules: [], pieces: []
        })).to.be.false;
    });

    it('should return false if players property is not a number', () => {
        expect(isVariantValid({
            players: 'string', rules: [], pieces: [],
            board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]}
        })).to.be.false;
    });

    it('should return false if variant hasn\'t board property', () => {
        expect(isVariantValid({players: 2, rules: [], pieces: []})).to.be.false;
    });

    it('should return false if board property is invalid', () => {
        expect(isVariantValid({players: 2, board: 'string', rules: [], pieces: []})).to.be.false;
    });
});
