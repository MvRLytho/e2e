import { getLoginButton } from '../support/login-page.po';

describe('login-page', () => {
  beforeEach(() => {
    cy.setBaseUrl();
    cy.visit('/');
  });

  it('should have login title', () => {
    cy.title().should('include', 'Log in to');
  });

  it('should display Login button', () => {
    getLoginButton().contains('Lytho login');
  });
});
