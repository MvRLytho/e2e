describe('dam-assets', () => {
  beforeEach(() => {
    cy.setBaseUrl();
    cy.lyLogin();
    cy.visit('/assets');
  });

  afterEach(() => {
    cy.lyLogout();
  });
});
