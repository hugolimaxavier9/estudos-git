
describe('desafio técnico - GitHub', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Deve exibir a página de login ao clicar em "Sign in"', () => {
    cy.contains('Sign in').click()
    cy.url().should('include', '/login')

  })
  it('Deve fazer login com sucesso usando credenciais válidas', () => {
    cy.visit('/login')
    cy.get('#login_field').type(Cypress.env('USER_EMAIL'))
    cy.get('#password').type(Cypress.env('USER_PASSWORD'))
    cy.get('input[name="commit"]').click()
    cy.contains('span', 'Dashboard').should('be.visible')
    cy.get('img.avatar.circle').click().should('be.visible')
    cy.contains('div', 'hugolimaxavier9').should('be.visible');
    cy.url().should('not.include', '/login')
  })
  
  it('Deve fazer logout com sucesso', () => {
   cy.visit('/login')
    cy.get('#login_field').type(Cypress.env('USER_EMAIL'))
    cy.get('#password').type(Cypress.env('USER_PASSWORD'))
    cy.get('input[name="commit"]').click()
    cy.get('img.avatar.circle').click().should('be.visible')
    cy.contains('Sign out').should('be.visible').click(), { force: true }
    cy.url().should('include', '/logout')
    cy.get('input[type="submit"][value="Sign out"]').click({ force: true });
  })
})
