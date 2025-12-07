describe('desafio técnico - GitHub - Logout', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve fazer logout com sucesso', () => {
    cy.logout();
    
  });
});
