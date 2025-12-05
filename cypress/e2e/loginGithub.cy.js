
describe('desafio técnico - GitHub', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Deve exibir a página de login ao clicar em "Sign in"', () => {
    cy.contains('Sign in').click()
    cy.url().should('include', '/login')

  })
  it('Deve fazer login com sucesso usando credenciais válidas', () => {
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.contains('span', 'Dashboard').should('be.visible')
    cy.get('img.avatar.circle').click().should('be.visible')
    cy.contains('div', 'hugolimaxavier9').should('be.visible')
    cy.url().should('not.include', '/login')
  })


  it.only('Deve fazer logout com sucesso', () => {
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.logout()
  })
})
