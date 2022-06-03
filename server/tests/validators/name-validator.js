const chai = require('chai');
const {expect} = chai;

const {isNameValid} = require('../../utils');

describe('Name Validator', () => {
  it('should return false if name is null or undefined', () => {
    expect(isNameValid(null)).to.be.false;
    expect(isNameValid(undefined)).to.be.false;
  });

  it('should return false if name is empty', () => {
    expect(isNameValid('')).to.be.false;
  });

  it('should return false if name is not a string', () => {
    expect(isNameValid(123)).to.be.false;
    expect(isNameValid(true)).to.be.false;
    expect(isNameValid(false)).to.be.false;
    expect(isNameValid(NaN)).to.be.false;
    expect(isNameValid(Infinity)).to.be.false;
    expect(isNameValid({})).to.be.false;
    expect(isNameValid([])).to.be.false;
  });

  it('should return false if name is shorter than 3 characters', () => {
    expect(isNameValid('ab')).to.be.false;
    expect(isNameValid('a')).to.be.false;
  });

  it('should return false if name is longer than 16 characters', () => {
    expect(isNameValid('abcdefghijklmnopqrstuvwxyz')).to.be.false;
    expect(isNameValid('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz')).to.be.false;
  });

  it('should return false if name starts with a space', () => {
    expect(isNameValid(' abc def')).to.be.false;
  });

  it('should return false if name ends with a space', () => {
    expect(isNameValid('abc def ')).to.be.false;
  });

  it('should return true if name starts and ends with a non-space character', () => {
    expect(isNameValid('abc def')).to.be.true;
  });

  it ('should return true if name length is between 4 and 16 characters', () => {
    expect(isNameValid('abcd')).to.be.true;
    expect(isNameValid('abcdefghijklmnop')).to.be.true;
  });
});
