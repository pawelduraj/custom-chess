// noinspection JSUnresolvedFunction

describe('Castle', () => {
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
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play Nf3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play Nc6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(3) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Play Bc4 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(3) > img').should('have.attr', 'src', 'img/bishop_w.png');
    });

    it('Play Nf6 as white', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_b.png');
    });

    it('Castle as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/rook_w.png');
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7) > img').should('have.attr', 'src', 'img/king_w.png');
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(8) > img').should('have.attr', 'src', '');
    });
});
