const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('Bishop', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[18] = {id: 'B', checkable: false, color: 0, moved: false};

    it('should have 11 possible moves', () => {
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(11);
    });

    it('should not be able to move 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 26, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 1 place backward', () => {
        expect(isMoveValid({from: 18, to: 10, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 1 place to the left', () => {
        expect(isMoveValid({from: 18, to: 17, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 1 place to the right', () => {
        expect(isMoveValid({from: 18, to: 19, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 2 places to the left and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to move 2 places backward and 2 places to the left', () => {
        expect(isMoveValid({from: 18, to: 0, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 5 places forward and 5 places to the right', () => {
        expect(isMoveValid({from: 18, to: 63, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places forward and 2 places to the left', () => {
        expect(isMoveValid({from: 18, to: 32, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should have 7 possible moves', () => {
        board[36] = {id: 'B', checkable: false, color: 0, moved: false};
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(7);
    });

    it('should not be able to move 2 places forward and 2 places to the right', () => {
        expect(isMoveValid({from: 18, to: 36, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 3 places forward and 3 places to the right', () => {
        expect(isMoveValid({from: 18, to: 45, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 4 places forward and 4 places to the right', () => {
        expect(isMoveValid({from: 18, to: 54, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 5 places forward and 5 places to the right', () => {
        expect(isMoveValid({from: 18, to: 63, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });
});
