describe('desafio técnico - GitHub', () => {
    // Abre a home do GitHub antes de cada teste
    beforeEach(() => {
        cy.visit('/')
    })
    it('abre aba repositories e um repo aleatorio e tab pull requests', () => {
        cy.contains('Sign in').click()
        cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        cy.get('img.avatar.circle').click().should('be.visible')
        cy.contains('span', 'Repositories').click()

        cy.get('a[data-hovercard-type="repository"], a[itemprop="name codeRepository"]', { timeout: 15000 })
            .should('have.length.greaterThan', 0)
            .then(($repos) => {
                const n = $repos.length;
                const idx = Math.floor(Math.random() * n);
                const href = $repos[idx].getAttribute('href')
                cy.visit(href);
            });
        cy.contains('a', 'Pull requests').click();
        cy.url().should('include', '/pulls');

    })

    it('cria novo repositório usando XPath', () => {
        cy.contains('Sign in').click()
        cy.get('#login_field').type(Cypress.env('USER_EMAIL'))
        cy.get('#password').type(Cypress.env('USER_PASSWORD'))
        cy.get('input[name="commit"]').click()

        cy.visit('/new')

        const repoName = `repo-xpath-${Date.now()}`

        cy.xpath('//input[@id="repository-name-input"]', { timeout: 15000 })
            .should('be.visible')
            .type(repoName)

        cy.xpath('//button[contains(., "Create repository")]')
            .should('be.visible')

        cy.wait(500)
        cy.get('button:contains("Create repository")', { timeout: 15000 })
            .scrollIntoView()
            .should('be.visible')
            .click()

        cy.url({ timeout: 30000 }).then((url) => {
            cy.xpath(`//a[contains(@href, '${repoName}')]`, { timeout: 10000 }).should('exist')
        })


    })

})