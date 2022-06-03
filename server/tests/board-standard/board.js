const chai = require('chai');
const {expect} = chai;

const {isMoveValid, getAllPossibleMoves, goToNextTurnAndReturnGame} = require('../../utils').boardStandard;
const makeValidMoveAndReturnBoard = require('../../utils/board-standard/board-valid-move-maker');
const {STANDARD_VARIANT, STANDARD_STARTING_BOARD} = require('../consts');

describe('General', () => {
    it('should be invalid to make move from place without piece', () => {
        let board = [...STANDARD_STARTING_BOARD], variant = {...STANDARD_VARIANT};
        expect(isMoveValid({from: 30, to: 31, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 40, to: 49, promote: '-'}, board, variant)).to.be.false;
    });

    it('should be invalid to make a move in place', () => {
        let board = [...STANDARD_STARTING_BOARD], variant = {...STANDARD_VARIANT};
        expect(isMoveValid({from: 0, to: 0, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 1, to: 1, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 2, to: 2, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 3, to: 3, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 4, to: 4, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 5, to: 5, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 6, to: 6, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 7, to: 7, promote: '-'}, board, variant)).to.be.false;
        expect(isMoveValid({from: 8, to: 8, promote: '-'}, board, variant)).to.be.false;
    });

    it('should be valid to move pawn 1 or 2 places forward at the beginning of the game', () => {
        let board = [...STANDARD_STARTING_BOARD], variant = {...STANDARD_VARIANT};
        expect(isMoveValid({from: 10, to: 18, promote: '-'}, board, variant)).to.be.true;
        expect(isMoveValid({from: 10, to: 26, promote: '-'}, board, variant)).to.be.true;
        expect(getAllPossibleMoves(10, board, variant)).to.have.lengthOf(2);
    });

    it('should be invalid to move pawn 2 places forward after first move', () => {
        let board = [...STANDARD_STARTING_BOARD], variant = {...STANDARD_VARIANT};
        expect(isMoveValid({from: 12, to: 20, promote: '-'}, board, variant)).to.be.true;
        board = makeValidMoveAndReturnBoard({from: 12, to: 20, promote: '-'}, board, variant);
        expect(isMoveValid({from: 20, to: 36, promote: '-'}, board, variant)).to.be.false;
    });

    it('should be impossible to move king, queen, rook and bishop at beginning', () => {
        let board = [...STANDARD_STARTING_BOARD], variant = {...STANDARD_VARIANT};
        expect(getAllPossibleMoves(0, board, variant)).to.have.lengthOf(0);
        expect(getAllPossibleMoves(2, board, variant)).to.have.lengthOf(0);
        expect(getAllPossibleMoves(3, board, variant)).to.have.lengthOf(0);
        expect(getAllPossibleMoves(4, board, variant)).to.have.lengthOf(0);
    });

    it('should return 2 possible moves for knight at beginning', () => {
        let board = [...STANDARD_STARTING_BOARD], variant = {...STANDARD_VARIANT};
        expect(getAllPossibleMoves(1, board, variant)).to.have.lengthOf(2);
    });
});
