const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('Queen', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[18] = {id: 'Q', checkable: false, color: 0, moved: false};

    it('should have 25 possible moves', () => {
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(25);
    });

    it('should be able to move 2 places forward', () => {
        expect(isMoveValid({from: 18, to: 32, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places forward and 2 places to the left', () => {
        expect(isMoveValid({from: 18, to: 0, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 5 places to the right', () => {
        expect(isMoveValid({from: 18, to: 23, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places backward and 2 places to the right', () => {
        expect(isMoveValid({from: 18, to: 4, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 2 places to the left and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should have 23 possible moves', () => {
       board[9] = {id: 'Q', checkable: false, color: 0, moved: false};
       expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(23);
    });

    it('should not be able to move 2 places backward and 2 places to the left', () => {
       expect(isMoveValid({from: 18, to: 0, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 1 place backward and 1 place to the left', () => {
        expect(isMoveValid({from: 18, to: 9, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });
});
