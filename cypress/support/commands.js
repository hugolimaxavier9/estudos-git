// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get('#login_field').type(email)
    cy.get('#password').type(password)
    cy.get('input[name="commit"]').click()

})


Cypress.Commands.add('logout', () => {
    cy.get('img.avatar.circle').click().should('be.visible')
    cy.contains('Sign out').should('be.visible').click({ force: true })
    cy.url().should('include', '/logout')
    cy.get('input[type="submit"][value="Sign out"]').click({ force: true });
})
