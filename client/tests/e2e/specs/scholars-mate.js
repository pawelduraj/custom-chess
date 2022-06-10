// noinspection JSUnresolvedFunction

describe('Scholar\'s Mate', () => {
    before(() => {
        cy.setUserName('JSON');
        cy.goToNewGame();
        cy.selectModeAndVariant('Offline', 'Standard');
    });

    it('Play e4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play e5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Bc4 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Bc5 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Play Qh5 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Nf6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Qf7# as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('End game', () => {
       cy.get('.endScreen').should('exist');
       cy.get('.endScreen .v-card__title').should('contain', 'Biały wygrał');
    });
});
