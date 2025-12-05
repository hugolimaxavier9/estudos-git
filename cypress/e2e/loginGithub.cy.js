
describe('desafio técnico - GitHub', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Deve exibir a página de login ao clicar em "Sign in"', () => {
    cy.contains('Sign in').click()
    cy.url().should('include', '/login')

  })
  it('Deve fazer login com sucesso usando credenciais válidas', () => {
    cy.intercept('GET', '**/notifications/indicator*').as('indicator')
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.contains('span', 'Dashboard').should('be.visible')
    cy.wait(5000)
    cy.xpath('/html/body/div[1]/div[2]/header/div/div[2]/div[4]/deferred-side-panel/include-fragment/react-partial-anchor/button/span/span/img', { timeout: 20000 })
            .should('be.visible')
            .scrollIntoView()
            .click()
    cy.contains('div', 'hugolimaxavier9').should('be.visible')
    cy.url().should('not.include', '/login')
  })


  it('Deve fazer logout com sucesso', () => {
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.logout()
  })
})
