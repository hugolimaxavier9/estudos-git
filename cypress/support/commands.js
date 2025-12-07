// Selectors
const LOGIN_EMAIL_FIELD = '#login_field';
const LOGIN_PASSWORD_FIELD = '#password';
const LOGIN_SUBMIT_BUTTON = 'input[name="commit"]';
const USER_AVATAR = 'img[class*="avatar"][class*="circle"]';
const USER_AVATAR_XPATH = '/html/body/div[1]/div[2]/header/div/div[2]/div[4]/deferred-side-panel/include-fragment/react-partial-anchor/button/span/span/img';
const SIGN_OUT_BUTTON = 'Sign out';
const LOGOUT_CONFIRMATION_BUTTON = 'input[type="submit"][value="Sign out"]';
const REPOSITORY_NAME_INPUT = '//input[@id="repository-name-input"]';
const CREATE_REPO_BUTTON = '//button[contains(., "Create repository")]';

// Commands
Cypress.Commands.add('login', (email = Cypress.env('USER_EMAIL'), password = Cypress.env('USER_PASSWORD')) => {
    cy.session(
        [email, password],
        () => {
            cy.visit('/login');
            cy.get(LOGIN_EMAIL_FIELD).clear().type(email, { delay: 30 });
            cy.get(LOGIN_PASSWORD_FIELD).clear().type(password, { delay: 30 });
            cy.get(LOGIN_SUBMIT_BUTTON).click();
            cy.url({ timeout: 30000 }).should('not.include', '/login');
        },
        {
            validate: () => {
                cy.visit('/');
                cy.get(USER_AVATAR, { timeout: 10000 }).should('exist');
            }
        }
    );
    cy.visit('/');
});

Cypress.Commands.add('logout', () => {
    cy.wait(5000);
    cy.xpath(USER_AVATAR_XPATH, { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

    cy.contains(SIGN_OUT_BUTTON, { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });
    cy.location('pathname').should('include', '/logout');

    cy.get(LOGOUT_CONFIRMATION_BUTTON, { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

});

Cypress.Commands.add('createRepository', (repoName) => {
    cy.visit('/new');
    cy.xpath(REPOSITORY_NAME_INPUT, { timeout: 15000 })
        .should('be.visible')
        .type(repoName);
    cy.wait(5000)
    cy.xpath(CREATE_REPO_BUTTON, { timeout: 15000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
});
