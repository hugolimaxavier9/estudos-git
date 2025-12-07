const USER_AVATAR_BUTTON_XPATH = '/html/body/div[1]/div[2]/header/div/div[2]/div[4]/deferred-side-panel/include-fragment/react-partial-anchor/button/span/span/img';
const DASHBOARD_TEXT = 'Dashboard';
const REPOSITORIES_TAB = 'Repositories';
const PULL_REQUESTS_SELECTOR = 'a.UnderlineNav-item[data-tab-item="pull-requests-tab"], a.UnderlineNav-item[href$="/pulls"]';
const REPOSITORY_LINK_SELECTOR = 'a[data-hovercard-type="repository"], a[itemprop="name codeRepository"]';

describe('desafio técnico - GitHub - Integração', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve abrir aba repositories, selecionar um repositório aleatório e acessar pull requests', () => {
    cy.contains('span', DASHBOARD_TEXT, { timeout: 15000 }).should('be.visible');
    cy.wait(5000);
    cy.xpath(USER_AVATAR_BUTTON_XPATH, { timeout: 20000 })
      .should('be.visible')
      .scrollIntoView()
      .click();

    cy.contains('span', REPOSITORIES_TAB).click();

    cy.get(REPOSITORY_LINK_SELECTOR, { timeout: 15000 })
      .should('have.length.greaterThan', 0)
      .then(($repos) => {
        const randomIndex = Math.floor(Math.random() * $repos.length);
        const repoHref = $repos[randomIndex].getAttribute('href');
        cy.visit(repoHref);
      });

    cy.get(PULL_REQUESTS_SELECTOR, { timeout: 15000 }).click();
    cy.location('pathname', { timeout: 10000 }).should('include', '/pulls');
  });

  it.only('Deve criar um novo repositório', () => {
    const repoName = `repo-${Date.now()}`;
    cy.createRepository(repoName);
    cy.url({ timeout: 30000 }).then((url) => {
      cy.xpath(`//a[contains(@href, '${repoName}')]`, { timeout: 10000 }).should('exist');
      // temporary screenshot for visual validation of the created repository
      cy.screenshot('repo-created', { capture: 'viewport' });
    });
  });
});