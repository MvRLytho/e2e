describe('dam-collections', () => {
  beforeEach(() => {
    cy.setBaseUrl();
    cy.lyLogin();
    cy.visit('/collections');
  });

  // perform some checks on collections page
  it('should display Collections list', () => {
    cy.dataE2e('collectionsOpt').should('exist');
    cy.contains('Collections').click();
    cy.url().should('include', '/collections');
    cy.dataE2e('collectionsListHasResults').should('exist');
  });

  // create a new collection
  it('should Create a new collection', () => {
    cy.dataE2e('addCollection').click();
    cy.get('input[id="collection-name"]').type('E2e Test name');
    cy.get('textarea[id="collection-description"]').type('E2e Test description');
    cy.get('div.ly-tile-content').click();
    cy.wait(400);
    // select an image as header
    cy.get('app-asset-select').should('exist');
    cy.get('app-asset-select').within(() => {
      cy.get('ly-grid-tile')
        .eq(5)
        .click();
      cy.get('ly-dialog-actions').within(() => {
        cy.get('button')
          .contains('Select')
          .click();
        cy.wait(2000);
      });
    });

    // adding 5 assets to the collection
    cy.get('button')
      .contains('Add')
      .click();
    cy.dataE2e('noResult').should('exist');
    cy.dataE2e('addAssets').click();
    cy.get('app-asset-select').should('exist');
    cy.get('app-asset-select').within(() => {
      cy.get('ly-grid-tile')
        .eq(2)
        .click();
      cy.get('ly-grid-tile')
        .eq(4)
        .click();
      cy.get('ly-grid-tile')
        .eq(6)
        .click();
      cy.get('ly-grid-tile')
        .eq(8)
        .click();
      cy.get('ly-grid-tile')
        .eq(10)
        .click();
      cy.get('ly-dialog-actions').within(() => {
        cy.get('button')
          .contains('Select')
          .click();
      });
    });

    // editing the collection settings -> header background color
    cy.dataE2e('assetsListHasResults');
    cy.get('app-collection-navigation').within(() => {
      cy.get('ly-icon[name="settings"]').click();
    });
    cy.get('app-add-collection-dialog').within(() => {
      cy.get('[type=checkbox]')
        .first()
        .check({ force: true });
    });
    cy.get('button')
      .contains('Save')
      .click();

    // check if background color has been changed correctly
    cy.get('div.collection-heading').should('have.css', 'background-color', 'rgb(0, 0, 0)');

    // delete the just created collection
    cy.get('app-collection-navigation').within(() => {
      cy.get('ly-icon[name="delete"]').click();
    });
    cy.get('button')
      .contains('Delete')
      .click();

    // check for main collections list
    cy.dataE2e('collectionsOpt').should('exist');
  });

  afterEach(() => {
    cy.lyLogout();
  });
});
