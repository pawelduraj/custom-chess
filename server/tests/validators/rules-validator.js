const chai = require('chai');
const {expect} = chai;

const areRulesValid = require('../../utils/validators/rules-validator');

describe('Rules Validator', () => {
    it('should return false if rules are null', () => {
        expect(areRulesValid(null)).to.be.false;
    });

    it('should return false if rules are not an array', () => {
        expect(areRulesValid({})).to.be.false;
        expect(areRulesValid('')).to.be.false;
        expect(areRulesValid(1)).to.be.false;
    });

    it('should return false if any rule hasn\'t id property', () => {
        expect(areRulesValid([{value: 5}])).to.be.false;
        expect(areRulesValid([{value: 5}, {id: 'castling', value: true}])).to.be.false;
    });

    it('should return false if any rule hasn\'t value property', () => {
        expect(areRulesValid([{id: 'castling'}])).to.be.false;
        expect(areRulesValid([{id: 'castling'}, {id: 'atomic', value: 2}])).to.be.false;
    });
});
