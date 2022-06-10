// Custom Commands

Cypress.Commands.add('setUserName', (name) => {
    cy.visit('/');
    cy.wait(500);
    cy.get('#input-27').type(name).type('{enter}');
    cy.wait(500);
    cy.get('.v-navigation-drawer__content .v-list-item__title').contains(name).should('exist');
});

Cypress.Commands.add('goToNewGame', () => {
    cy.get('.v-navigation-drawer__content .v-list-item__title').contains('New game').click();
    cy.url().should('include', '/new-game');
});

Cypress.Commands.add('selectModeAndVariant', (mode, variant) => {
    cy.get('#new-game-mode').click({force: true});
    cy.get('.v-menu__content .v-list-item__title').contains(mode).click({force: true});
    cy.get('#new-game-variant').click({force: true});
    cy.get('.v-menu__content .v-list-item__title').contains(variant).click({force: true});
    cy.get('#new-game-create').click();
    cy.url().should('include', '/play-offline');
});
