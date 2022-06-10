// noinspection JSUnresolvedFunction

describe('Perfect Chess', () => {
    before(() => {
        cy.setUserName('JSON');
        cy.goToNewGame();
        cy.selectModeAndVariant('Offline', 'Nightrider Chess');
    });

    it('Play f4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play e5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play NRd5 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/nightrider_w.png');
    });

    it('Play Qf4+ as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Play g3 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(7) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play Qe7 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Play NRxc7 as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3) > img').should('have.attr', 'src', 'img/nightrider_w.png');
    });

    it('Play Kd1 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play NRxa8 as white', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(1) > img').should('have.attr', 'src', 'img/nightrider_w.png');
    });

    it('Play NRa6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(1) > img').should('have.attr', 'src', 'img/nightrider_b.png');
    });

    it('Play NRxe5 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/nightrider_w.png');
    });

    it('Play Qxe5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Play fxe5 as white', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play NRa5 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(1) > img').should('have.attr', 'src', 'img/nightrider_b.png');
    });

    it('Play d4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play NRc4 as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/nightrider_b.png');
    });

    it('Play Bg5+ as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play f6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play exf6 as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play gxf6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Bxf6+ as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Ke8 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play Bg7 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(7) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play NRxb2 as black', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(2) > img').should('have.attr', 'src', 'img/nightrider_b.png');
    });

    it('Play Rf1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/rook_w.png');
    });

    it('Play NRxa4 as black', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4) > img').should('have.attr', 'src', 'img/nightrider_b.png');
    });

    it('Play NRc7+ as white', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3) > img').should('have.attr', 'src', 'img/nightrider_w.png');
    });

    it('Play Kf7 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play Bd5+ as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Kg6 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play Bxh8 as white', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(8) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play NRxc7 as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3) > img').should('have.attr', 'src', 'img/nightrider_b.png');
    });

    it('Play Rf6+ as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/rook_w.png');
    });

    it('Play Kh5 as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play Bf3+ as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Kg5 as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_b.png');
    });

    it('Play h4# as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(8) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('End game', () => {
        cy.get('.endScreen').should('exist');
        cy.get('.endScreen .v-card__title').should('contain', 'Biały wygrał');
    });
});
