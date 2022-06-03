const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, EMPTY_STARTING_BOARD} = require('../consts');

describe('Chancellor', () => {
    let board = [...EMPTY_STARTING_BOARD];
    board[18] = {id: 'CC', checkable: false, color: 0, moved: false};

    it('should have 22 possible moves', () => {
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(22);
    });

    it('should be able to move 3 places forward', () => {
        expect(isMoveValid({from: 18, to: 42, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 3 places forward and 3 places to the right', () => {
        expect(isMoveValid({from: 18, to: 45, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to move 5 places to the right', () => {
        expect(isMoveValid({from: 18, to: 23, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should not be able to move 2 places backward and 2 places to the right', () => {
        expect(isMoveValid({from: 18, to: 4, promote: '-'}, board, STANDARD_VARIANT)).to.be.false;
    });

    it('should be able to move 2 places to the left and 1 place forward', () => {
        expect(isMoveValid({from: 18, to: 24, promote: '-'}, board, STANDARD_VARIANT)).to.be.true;
    });

    it('should have 21 possible moves', () => {
        board[8] = {id: 'CC', checkable: false, color: 0, moved: false};
        expect(getAllPossibleMoves(18, board, STANDARD_VARIANT)).to.have.lengthOf(21);
    });

    it('should have 16 possible moves', () => {
        expect(getAllPossibleMoves(8, board, STANDARD_VARIANT)).to.have.lengthOf(16);
    });
});
