// noinspection JSUnresolvedFunction

describe('Pins', () => {
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

    it('Play Qh5 as white', () => {
        cy.get('#chessBoard > div:nth-child(8) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Pawn on f7 is pinned', () => {
       cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
       cy.get('#chessBoard > div:nth-child(3) > div:nth-child(6) > img').should('have.attr', 'src', '');
       cy.get('#chessBoard > div:nth-child(4) > div:nth-child(6) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(6)').click();
    });

    it('Play Bb4 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(2) > img').should('have.attr', 'src', 'img/bishop_b.png');
    });

    it('Pawn on d2 is pinned', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(4) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(4)').click();
    });

    it('Play f4 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Play exf4 as black', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6)').click();
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(6) > img').should('have.attr', 'src', 'img/pawn_b.png');
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

    it('Play Qe5+ as white', () => {
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(8)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/queen_w.png');
    });

    it('Play Qe7 as black', () => {
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Play c3 as white', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(3) > img').should('have.attr', 'src', 'img/pawn_w.png');
    });

    it('Queen on e7 is pinned', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(5) > img').should('have.attr', 'src', 'img/dot.png');
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(4) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(1) > div:nth-child(6) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(3) > div:nth-child(4) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(3) > img').should('have.attr', 'src', '');
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
    });

    it('Play Qe5 as black', () => {
        cy.get('#chessBoard > div:nth-child(2) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5)').click();
        cy.get('#chessBoard > div:nth-child(4) > div:nth-child(5) > img').should('have.attr', 'src', 'img/queen_b.png');
    });

    it('Pawn on d2 is not pinned', () => {
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(4)').click();
        cy.get('#chessBoard > div:nth-child(6) > div:nth-child(4) > img').should('have.attr', 'src', 'img/dot.png');
        cy.get('#chessBoard > div:nth-child(5) > div:nth-child(4) > img').should('have.attr', 'src', 'img/dot.png');
        cy.get('#chessBoard > div:nth-child(7) > div:nth-child(4)').click();
    });
});
