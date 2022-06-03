const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('Berolina Pawn', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[10] = {id: 'BP', checkable: false, color: 0, moved: false};

    it('should have 4 possible moves if not moved before', () => {
        expect(getAllPossibleMoves(10, board, STANDARD_VARIANT)).to.have.lengthOf(4);
    });

    it('should be able to move 1 place forward and 1 place to the left', () => {
        expect(isMoveValid({from: 10, to: 17, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 place forward and 2 place to the left', () => {
        expect(isMoveValid({from: 10, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place forward and 1 place to the right', () => {
        expect(isMoveValid({from: 10, to: 19, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 place forward and 2 place to the right', () => {
        expect(isMoveValid({from: 10, to: 28, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 1 place forward', () => {
        expect(isMoveValid({from: 10, to: 18, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 2 places forward', () => {
        expect(isMoveValid({from: 10, to: 26, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should have 2 possible move if moved', () => {
        board[10] = {id: 'BP', checkable: false, color: 0, moved: true};
        expect(getAllPossibleMoves(10, board, STANDARD_VARIANT)).to.have.lengthOf(2);
    });

    it('should not be able to move 2 places forward and 2 places to the left', () => {
        expect(isMoveValid({from: 10, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 2 places forward and 2 places to the right', () => {
        expect(isMoveValid({from: 10, to: 28, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to take piece 1 place forward', () => {
        board[18] = {id: 'BP', checkable: false, color: 1, moved: false};
        expect(isMoveValid({from: 10, to: 18, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        board[18] = '-';
    });

    it('should have 4 possible moves if not moved before', () => {
        board = [...EMPTY_STARTING_BOARD];
        board[50] = {id: 'BP', checkable: false, color:1, moved: false};
        expect(getAllPossibleMoves(50, board, STANDARD_VARIANT)).to.have.lengthOf(4);
    });

    it('should be able to move 1 place forward and 1 place to the left', () => {
        expect(isMoveValid({from: 50, to: 43, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 place forward and 2 place to the left', () => {
        expect(isMoveValid({from: 50, to: 36, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 1 place forward and 1 place to the right', () => {
        expect(isMoveValid({from: 50, to: 41, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should be able to move 2 place forward and 2 place to the right', () => {
        expect(isMoveValid({from: 50, to: 32, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 1 place forward', () => {
        expect(isMoveValid({from: 50, to: 42, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 2 places forward', () => {
        expect(isMoveValid({from: 50, to: 34, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should have 2 possible move if moved', () => {
        board[50] = {id: 'BP', checkable: false, color: 1, moved: true};
        expect(getAllPossibleMoves(50, board, STANDARD_VARIANT)).to.have.lengthOf(2);
    });

    it('should not be able to move 2 places forward and 2 places to the left', () => {
        expect(isMoveValid({from: 50, to: 36, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should not be able to move 2 places forward and 2 places to the right', () => {
        expect(isMoveValid({from: 50, to: 32, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to take piece 1 place forward', () => {
        board[42] = {id: 'BP', checkable: false, color: 0, moved: false};
        expect(isMoveValid({from: 50, to: 42, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
        board[42] = '-';
    });
});
