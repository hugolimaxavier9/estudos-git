const USER_AVATAR_BUTTON_XPATH = '/html/body/div[1]/div[2]/header/div/div[2]/div[4]/deferred-side-panel/include-fragment/react-partial-anchor/button/span/span/img';
const DASHBOARD_TEXT = 'Dashboard';
const USERNAME = 'hugo-xavier';

describe('desafio técnico - GitHub', () => {
  describe('Fluxo de login', () => {
    it('Deve exibir a página de login ao clicar em "Sign in"', () => {
      cy.visit('/');
      cy.contains('Sign in').click();
      cy.url().should('include', '/login');
    });
  });

  describe('Operações autenticadas', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Deve fazer login com sucesso usando credenciais válidas', () => {
      cy.contains('span', DASHBOARD_TEXT).should('be.visible');
      cy.xpath(USER_AVATAR_BUTTON_XPATH, { timeout: 20000 })
        .should('be.visible')
        .scrollIntoView()
        .click();
      cy.contains('div', USERNAME).should('be.visible');
      cy.url().should('not.include', '/login');
    });
  });
});
