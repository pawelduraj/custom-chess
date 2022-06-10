// noinspection JSUnresolvedFunction

describe('Perfect Chess', () => {
    before(() => {
        cy.setUserName('JSON');
        cy.goToNewGame();
        cy.selectModeAndVariant('Offline', 'Perfect Chess');
    });

    it('Play e4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play ABa6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(1) > img').should('have.attr', 'src', 'img/archbishop_b.png');
    });

    it('Play CCb3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2) > img').should('have.attr', 'src', 'img/chancellor_w.png');
    });

    it('Play AZe6 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5) > img').should('have.attr', 'src', 'img/amazon_b.png');
    });

    it('Play AZc3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/amazon_w.png');
    });

    it('Play AZxb3 as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2) > img').should('have.attr', 'src', 'img/amazon_b.png');
    });

    it('Play axb3 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(2) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play ABxf1+ as black', () => {
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(6) > img').should('have.attr', 'src', 'img/archbishop_b.png');
    });

    it('Play Kd1 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4) > img').should('have.attr', 'src', 'img/king_w.png');
    });

    it('Play d5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_b.png');
    });

    it('Play exd5 as white', () => {
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(4) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play Qg4+ as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(7) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Play Nf3 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(7)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(6) > img').should('have.attr', 'src', 'img/knight_w.png');
    });

    it('Play CCd8 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(1)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4) > img').should('have.attr', 'src', 'img/chancellor_b.png');
    });

    it('Play AZc8# as white', () => {
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(3) > img').should('have.attr', 'src', 'img/amazon_w.png');
    });

    it('End game', () => {
        cy.get('.endScreen').should('exist');
        cy.get('.endScreen .v-card__title').should('contain', 'Biały wygrał');
    });
});
