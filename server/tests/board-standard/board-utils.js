const chai = require('chai');
const {expect} = chai;

const {
    positionToField,
    isPositionEmpty,
    isEnemyAtPosition,
    isAllyAtPosition,
    isPositionEmptyOrEnemy
} = require('../../utils/board-standard/board-utils');
const {EMPTY_STARTING_BOARD} = require('../consts');

describe('Board Utils', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[17] = {id: 'K', checkable: false, color: 0, moved: false};
    board[45] = {id: 'K', checkable: false, color: 1, moved: false};

    it('should convert position (1, 2) to field 17', () => {
        expect(positionToField(1, 2, 8, 8)).to.equal(17);
    });

    it('should convert position (5, 5) to field 45', () => {
        expect(positionToField(5, 5, 8, 8)).to.equal(45);
    });

    it('should return true if opponent is at position (1, 2)', () => {
        expect(isEnemyAtPosition(1, 2, 8, board, 1)).to.be.true;
    });

    it('should return false if ally is at position (1, 2)', () => {
        expect(isAllyAtPosition(1, 2, 8, board, 1)).to.be.false;
    });

    it('should return true if position (5, 4) is empty', () => {
        expect(isPositionEmpty(5, 4, 8, board)).to.be.true;
    });

    it('should return true if enemy is at position (5, 5)', () => {
        expect(isEnemyAtPosition(5, 5, 8, board, 0)).to.be.true;
    });

    it('should return false if ally is at position (5, 5)', () => {
        expect(isAllyAtPosition(5, 5, 8, board, 0)).to.be.false;
    });

    it('should return -1 if position is invalid', () => {
        expect(positionToField(-1, 4, 8, 8)).to.be.equal(-1);
        expect(positionToField(5, -1, 8, 8)).to.be.equal(-1);
        expect(positionToField(8, 8, 8, 8)).to.be.equal(-1);
        expect(positionToField(2, 9, 8, 8)).to.be.equal(-1);
        expect(positionToField(12, 0, 8, 8)).to.be.equal(-1);
        expect(positionToField(-1, 0, 8, 8)).to.be.equal(-1);
        expect(positionToField(5, -4, 8, 8)).to.be.equal(-1);
    });
});
