const chai = require('chai');
const {expect} = chai;

const areRulesValid = require('../../utils/validators/rules-validator');

describe('Rules Validator', () => {
    it('should return false if rules are null or undefined', () => {
        expect(areRulesValid(null)).to.be.false;
        expect(areRulesValid(undefined)).to.be.false;
    });

    it('should return false if rules are not an array', () => {
        expect(areRulesValid({})).to.be.false;
        expect(areRulesValid('')).to.be.false;
        expect(areRulesValid(1)).to.be.false;
    });

    it('should return false if any rule has not id property', () => {
        expect(areRulesValid([{value: 5}])).to.be.false;
        expect(areRulesValid([{value: 5}, {id: 'castling', value: true}])).to.be.false;
    });

    it('should return false if any rule has not value property', () => {
        expect(areRulesValid([{id: 'castling'}])).to.be.false;
        expect(areRulesValid([{id: 'castling'}, {id: 'atomic', value: 2}])).to.be.false;
    });

    it('should return false if any rule id is not a string', () => {
        expect(areRulesValid([{id: 5, value: true}])).to.be.false;
        expect(areRulesValid([{id: 'castling', value: true}, {id: 5, value: true}])).to.be.false;
    });
});
