const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('Nightrider', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[18] = {id: 'NR', checkable: false, color: 0, moved: false};

    it('should have 12 possible moves', () => {
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(12);
    });

    it('should be able to move 2 places forward and 1 place to the left', () => {
        expect(isMoveValid({from: 18, to: 33, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places forward and 1 place to the right', () => {
        expect(isMoveValid({from: 18, to: 35, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places backward and 1 place to the left', () => {
        expect(isMoveValid({from: 18, to: 1, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places backward and 1 place to the right', () => {
        expect(isMoveValid({from: 18, to: 3, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places to the left and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places to the left and 1 place backward', () => {
        expect(isMoveValid({from: 18, to: 8, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places to the right and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 28, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places to the right and 1 place backward', () => {
        expect(isMoveValid({from: 18, to: 12, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 4 places forward and 2 places to the right', () => {
        expect(isMoveValid({from: 18, to: 52, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 places forward and 4 places to the right', () => {
        expect(isMoveValid({from: 18, to: 38, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should have 10 possible moves', () => {
        board[28] = {id: 'NR', checkable: false, color: 0, moved: false};
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(10);
    });

    it('should be able to move 1 place forward and 2 places to the right', () => {
        expect(isMoveValid({from: 18, to: 27, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to move 2 places forward and 4 places to the right', () => {
        expect(isMoveValid({from: 18, to: 38, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });
});
