const chai = require('chai');
const {expect} = chai;

const isVariantValid = require('../../utils/validators/variant-validator');

const {STANDARD_VARIANT} = require('../consts');

describe('Variant Validator', () => {
    it('should return false if variant is null or undefined', () => {
        expect(isVariantValid(null)).to.be.false;
        expect(isVariantValid(undefined)).to.be.false;
    });

    it('should return false if variant is not an object', () => {
        expect(isVariantValid('string')).to.be.false;
    });

    it('should return false if variant has not players property', () => {
        const variant = structuredClone(STANDARD_VARIANT);
        delete variant.players;
        expect(isVariantValid(variant)).to.be.false;
    });

    it('should return false if players property is not a number', () => {
        const variant = structuredClone(STANDARD_VARIANT);
        variant.players = 'string';
        expect(isVariantValid(variant)).to.be.false;
    });

    it('should return false if variant has not board property', () => {
        const variant = structuredClone(STANDARD_VARIANT);
        delete variant.board;
        expect(isVariantValid(variant)).to.be.false;
    });

    it('should return false if board property is invalid', () => {
        const variant = structuredClone(STANDARD_VARIANT);
        variant.board = {id: 's', params: []};
        expect(isVariantValid(variant)).to.be.false;
    });

    it('should return false if rules property is invalid', () => {
        const variant = structuredClone(STANDARD_VARIANT);
        variant.rules = {id: 'castling', value: false};
        expect(isVariantValid(variant)).to.be.false;
    });
});
