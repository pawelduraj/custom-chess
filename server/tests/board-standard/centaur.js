const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('Centaur', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[18] = {id: 'CT', checkable: false, color: 0, moved: false};

    it('should have 16 possible moves', () => {
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(16);
    });

    it('should not be able to move 3 places forward', () => {
        expect(isMoveValid({from: 18, to: 42, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 3 places forward and 3 places to the right', () => {
        expect(isMoveValid({from: 18, to: 45, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to move 5 place in any direction', () => {
        expect(isMoveValid({from: 18, to: 19, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 17, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 25, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 26, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 27, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 9, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 10, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        expect(isMoveValid({from: 18, to: 11, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 2 places backward and 2 places to the right', () => {
        expect(isMoveValid({from: 18, to: 4, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to move 2 places to the left and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places to the right and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 28, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should have 15 possible moves', () => {
        board[9] = {id: 'CT', checkable: false, color: 0, moved: false};
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(15);
    });

    it('should be able to move 2 places to the left and 1 place backward', () => {
        expect(isMoveValid({from: 18, to: 8, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places backward and 1 place to the left', () => {
        expect(isMoveValid({from: 18, to: 1, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 1 place backward and 1 place to the left', () => {
        expect(isMoveValid({from: 18, to: 9, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });
});
