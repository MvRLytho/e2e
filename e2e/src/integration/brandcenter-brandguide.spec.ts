describe('brandcenter-brandguide', () => {
  beforeEach(() => {
    cy.setBaseUrl();
    cy.lyLogin();
    cy.visit('/brand-center');
  });

  it('should display brandguides list', () => {
    cy.dataE2e('brandGuidesListHasResults').should('exist');
  });

  it('should display create new button', () => {
    cy.dataE2e('addStyleGuide').should('exist');
  });

  it('should create new brand guide', () => {
    cy.dataE2e('addStyleGuide').click();
  });

  afterEach(() => {
    cy.lyLogout();
  });
});
