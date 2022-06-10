// noinspection JSUnresolvedFunction

describe('The Game of the Century', () => {
    before(() => {
        cy.setUserName('JSON');
        cy.goToNewGame();
        cy.selectModeAndVariant('Offline', 'Standard');
    });

    it('Play Nf3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play Nf6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play c4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play g6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(7) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Nc3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play Bg7 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play d4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play O-O as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6) > img').should('have.attr', 'src', 'img/rook_b.png');
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_b.png');
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(8) > img').should('have.attr', 'src', '');
    });

    it('Play Bf4 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play d5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Qb3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play dxc4 as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Qxc4 as white', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play c6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(3) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play e4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play Nbd7 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(4) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Rd1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4) > img').should('have.attr', 'src', 'img/rook_w.png');
    });

    it('Play Nb6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Qc5 as white', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Bg4 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(7) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Bg5 as white', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Na4 as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(1) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Qa3 as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(1) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Nxc3 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play bxc3 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play Nxe4 as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Bxe7 as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Qb6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Play Bc4 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Nxc3 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Bc5 as white', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Rfe8+ as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5) > img').should('have.attr', 'src', 'img/rook_b.png');
    });

    it('Play Kf1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Be6 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Bxb6 as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Bxc4+ as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Kg1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Ne2+ as black', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Kf1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Nxd4+ as black', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Kg1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Ne2+ as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Kf1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Nc3+ as black', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Kg1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play axb6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Qb4 as white', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Ra4 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(1) > img').should('have.attr', 'src', 'img/rook_b.png');
    });

    it('Play Qxb6 as white', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Nxd1 as black', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play h3 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(8) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play Rxa2 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(1) > img').should('have.attr', 'src', 'img/rook_b.png');
    });

    it('Play Kh2 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(8) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Nxf3 as black', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Re1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5) > img').should('have.attr', 'src', 'img/rook_w.png');
    });

    it('Play Rxe1 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5) > img').should('have.attr', 'src', 'img/rook_b.png');
    });

    it('Play Qd8+ as white', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Bf8 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Nxe1 as white', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play Bd5 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Nf3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play Ne4 as black', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Qb8 as white', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(2) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play b5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(2) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play h4 as white', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play h5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Ne5 as white', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play Kg7 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play Kg1 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Bc5+ as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Kf1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Ng3+ as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(7) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Ke1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Bb4+ as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Kd1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Bb3+ as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Kc1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Ne2+ as black', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Kb1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(2) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Nc3+ as black', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Kc1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play Rc2# as black', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(3) > img').should('have.attr', 'src', 'img/rook_b.png');
    });

    it('End game', () => {
        cy.get('.endScreen').should('exist');
        cy.get('.endScreen .v-card__title').should('contain', 'Czarny wygrał');
    });
});
