describe('dam-assets', () => {
  beforeEach(() => {
    cy.setBaseUrl();
    cy.lyLogin();
    cy.visit('/assets');
  });

  it('should display asset list', () => {
    cy.dataE2e('assetsListHasResults').should('exist');
  });

  it('should make several changes in the asset detail and check if its processed properly', () => {
    cy.get('ly-tile-asset')
      .first()
      .click();
    cy.url().should('include', '/preview');
    cy.dataE2e('asset-preview-info-title').should('exist');
    cy.dataE2e('asset-preview-info-description').should('exist');
    cy.get('ly-icon[name=edit]').click();
    cy.url().should('include', '?editMode=true');
    cy.dataE2e('assetDetailsView').should('exist');
    cy.wait(150);
    // switch to Manage tab
    cy.get('div.ly-tab-label')
      .contains('Manage')
      .click();
    cy.wait(200);
    // Add the first available tag
    cy.get('div.tags-group-content')
      .children('ly-chip')
      .eq(0)
      .click();
    // Remove the previously added tag
    cy.get('div.tags-selected')
      .children('ly-chip')
      .eq(0)
      .click();
    // Switch to Protection tab
    cy.get('div.ly-tab-label')
      .contains('Protection')
      .click();
    // Select a starting publish date
    cy.get('div.input-date-trigger')
      .children('ly-icon')
      .eq(0)
      .click();
    cy.get('div.mat-calendar-body-cell-content')
      .eq(1)
      .click();
    // Check if publish date is set
    cy.get('div.date-select')
      .eq(0)
      .children('button')
      .should('not.have.class', 'ly-btn-disabled');
    // Check if publish date is removed
    cy.get('div.date-select')
      .eq(0)
      .children('button')
      .click();
    cy.get('div.date-select')
      .eq(0)
      .children('button')
      .should('be.disabled');
    // Select a ending visibility date in the next month
    cy.get('div.input-date-trigger')
      .eq(3)
      .children('ly-icon')
      .eq(0)
      .click();
    cy.get('div.ly-calendar-heading-item')
      .children('ly-icon[name=chevron_right]')
      .click();
    cy.get('div.mat-calendar-body-cell-content')
      .eq(20)
      .click();
    // Check if visibility date is set
    cy.get('div.date-select')
      .eq(1)
      .children('button')
      .not('disabled');
    // Check if visibility date is removed
    cy.get('div.date-select')
      .eq(1)
      .children('button')
      .click();
    cy.get('div.date-select')
      .eq(1)
      .children('button')
      .should('be.disabled');
    // Switch to Meta tab
    cy.get('div.ly-tab-label')
      .contains('Meta')
      .click();
    // Add custom metadata field
    cy.get('.ly-btn')
      .contains('Add custom field')
      .click();
    cy.get('.ly-dropdown-item')
      .eq(0)
      .click();
    cy.get('input').should('exist');
    cy.get('[id^=meta-')
      .type('TestValue');
    // Check if added metadata is saved to asset detail
    cy.get('ly-icon[name=edit]').click();
    cy.get('ly-grid-list.custom-fields-list')
      .contains('TestValue')
      .should('be.visible');
    cy.get('ly-icon[name=edit]').click();
    // Remove the added metadatafield
    cy.get('ly-grid-tile')
      .eq(2)
      .children('button')
      .click();
    cy.get('ly-icon[name=edit]').click();
  });

  afterEach(() => {
    cy.lyLogout();
  });
});
