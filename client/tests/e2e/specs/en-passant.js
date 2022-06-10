// noinspection JSUnresolvedFunction

describe('En Passant', () => {
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

    it('Play d5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play e5 as white', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play dxe4 as black is not possible', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5) > img').should('have.attr', 'src', '');
    });

    it('Play d4 as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play c4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play f5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play exf3 as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/dot.png');
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play dxc3 as black is not possible', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', '');
    });
});
