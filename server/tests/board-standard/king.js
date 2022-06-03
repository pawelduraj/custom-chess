const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('King', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[10] = {id: 'K', checkable: false, color: 0, moved: false};

    it('should have 8 possible moves', () => {
        expect(getAllPossibleMoves(10, board, STANDARD_VARIANT)).to.have.lengthOf(8);
    });

    it('should be able to move 1 place forward', () => {
        expect(isMoveValid({from: 10, to: 18, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place backward', () => {
        expect(isMoveValid({from: 10, to: 2, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place to the left', () => {
        expect(isMoveValid({from: 10, to: 9, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place to the right', () => {
        expect(isMoveValid({from: 10, to: 11, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place to the top-left', () => {
        expect(isMoveValid({from: 10, to: 17, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place to the top-right', () => {
        expect(isMoveValid({from: 10, to: 19, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place to the bottom-left', () => {
        expect(isMoveValid({from: 10, to: 1, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place to the bottom-right', () => {
        expect(isMoveValid({from: 10, to: 3, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 2 places in any direction', () => {
        expect(isMoveValid({from: 10, to: 26, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
        expect(isMoveValid({from: 10, to: 8, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
        expect(isMoveValid({from: 10, to: 12, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should have 7 possible moves', () => {
        board[11] = {id: 'K', checkable: false, color: 0, moved: false};
        expect(getAllPossibleMoves(10, board, STANDARD_VARIANT)).to.have.lengthOf(7);
    });

    it('should not be able to take own piece', () => {
        expect(isMoveValid({from: 10, to: 11, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });
});
