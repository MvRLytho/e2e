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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('setBaseUrl', () => {
  Cypress.config('baseUrl', Cypress.env(`settings-${Cypress.env('test-env')}`).redirect_uri);
});

Cypress.Commands.add('lyLogin', () => {
  cy.login(Cypress.env(`settings-${Cypress.env('test-env')}`));
});

Cypress.Commands.add('lyLogout', () => {
  cy.logout(Cypress.env(`settings-${Cypress.env('test-env')}`));
});

Cypress.Commands.add('dataE2e', (value, options?) => {
  return cy.get(`[data-e2e=${value}]`, options);
});
