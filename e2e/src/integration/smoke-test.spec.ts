import { exists } from 'fs';

describe('smoke-test', () => {
  beforeEach(() => {
    cy.setBaseUrl();
    cy.lyLogin();
    cy.visit('/');
  });

  it('should perfom a smoke test on three main modules', () => {
    cy.dataE2e('tenantLogo').should('exist');

    // Check Asset manager
    cy.dataE2e('assetManagerOpt').click();
    cy.wait(1000);
    cy.dataE2e('assetsListHasResults').should('exist');
    // Check asset detail
    cy.get('ly-tile-asset')
      .first()
      .click();
    cy.url().should('include', '/preview');
    cy.dataE2e('asset-preview-info-title').should('exist');

    // Check Collections
    cy.dataE2e('collectionsOpt').click();
    cy.wait(1000);
    cy.dataE2e('collections').should('exist');
    // Check collection content
    cy.get('ly-tile-collection')
      .first()
      .click();
    cy.wait(1000);
    cy.dataE2e('assets').should('exist');
    // Check asset detail in collection
    cy.get('ly-tile-asset')
      .first()
      .click();
    cy.url().should('include', '/preview');
    cy.dataE2e('asset-preview-info-title').should('exist');
    cy.get('button')
      .contains('Back')
      .click();

    // Check Waiting room upload page
    cy.dataE2e('waitingRoom').click();
    cy.get('.drop-upload').should('exist');
    cy.url().should('include', '/waiting');
    // Check waiting for approval
    cy.get('ly-radio-button')
      .eq(1)
      .click({ force: true });
    cy.url().should('include', '/approval');

    // Check tamplates page
    cy.dataE2e('publishOpt').click();
    cy.wait(2000);
    cy.dataE2e('templatesListHasResults').should('exist');
    // Check template detail page
    cy.get('ly-grid-tile')
      .eq(0)
      .within(() => {
        cy.get('ly-dropdown').click();
      });
    cy.get('button')
      .contains('View template')
      .click();
    cy.url().should('include', '/detail');
    cy.get('button')
      .contains('Back')
      .click();

    // Check publications page
    cy.dataE2e('publicationsOpt').click();
    cy.dataE2e('publicationsListHasResults').should('exist');

    // Check publiation detail page
    cy.get('ly-grid-tile')
      .eq(0)
      .within(() => {
        cy.get('ly-dropdown').click();
      });
    cy.get('button')
      .contains('Edit publication')
      .click();
    cy.url().should('include', '/publication/');
    // Check publications detail -> tags
    cy.get('div.ly-tab-label')
      .contains('Tags')
      .click();
    cy.get('ly-input-search').should('exist');
    cy.get('button')
      .contains('Back')
      .click();

    // Check Brand center page
    cy.dataE2e('brandCenterOpt').click();
    cy.dataE2e('brandGuidesListHasResults').should('exist');

    // Check Settings page
    cy.dataE2e('settingsOpt').click();
    // Check Shared Links
    cy.get('a[href*="/links"]').click();
    // Check shared assets within Shared Links
    cy.url().should('include', '/shared-assets');
    cy.get('app-links').should('exist');

    // Check upload requests within Shared Links
    cy.get('a[href*="/links/upload-requests"]').click();
    cy.url().should('include', 'links/upload-requests');
    cy.get('app-links').should('exist');

    // Check shared publications within Shared Links
    cy.get('a[href*="/links/publications"]').click();
    cy.url().should('include', 'links/publications');
    cy.get('app-links').should('exist');

    // Check shared brand-guides within Shared Links
    cy.get('a[href*="/links/brand-guides"]').click();
    cy.url().should('include', 'links/brand-guides');
    cy.get('app-links').should('exist');

    // DataE2e [attr.data-e2e]="'navbar-' + item.label" in Maintenance-navbar.component.html not working
    // cy.dataE2e('navbar-menu.organize').should('exist');

    // Check Theme Design page
    cy.get('a[href*="/styles"]').click();
    // Check Logos page within 'Theme Design'
    cy.url().should('include', 'styles/logos');
    cy.get('div.preview-label')
      .contains('Preview Login screen')
      .should('exist');
    cy.get('div.preview-label')
      .contains('Preview Navigation bar')
      .should('exist');
    cy.get('app-logos-page').should('exist');
    // Check Brand colors page within 'Theme Design'
    cy.get('a[href*="/styles/brand-colors"]').click();
    cy.url().should('include', 'styles/brand-colors');
    cy.get('app-brand-colors-page').should('exist');
    // Check Login screen page within 'Theme Design'
    cy.get('a[href*="/styles/login-screen"]').click();
    cy.url().should('include', 'styles/login-screen');
    cy.get('app-login-screen-page').should('exist');
    // Check Homepage page within 'Theme Design'
    cy.get('a[href*="/styles/homepage"]').click();
    cy.url().should('include', 'styles/homepage');
    cy.get('app-homepage-page').should('exist');

    // Check Advanced page
    cy.get('a[href*="/advanced"]').click();
    // Check Import-export page within 'Advanced'
    cy.url().should('include', 'advanced/import-export');
    cy.get('.import-panel')
      .eq(0)
      .click();
    cy.get('.ly-panel-body').should('be.visible');

    // Check API-management page within 'Advanced'
    cy.get('a[href*="/advanced/api-management"]').click();
    cy.url().should('include', 'advanced/api-management');
    cy.get('app-api-management').should('exist');

    // Check Presets page
    cy.get('a[href*="/presets"]').click();
    // Check Download settings page within 'Presets'
    cy.url().should('include', 'presets/download-settings');
    cy.get('app-download-settings').should('exist');

    // Check Job options page within 'Presets'
    cy.get('a[href*="/presets/job-options"]').click();
    cy.url().should('include', 'presets/job-options');
    cy.get('app-job-options').should('exist');

    // Check Translations page
    cy.get('a[href*="/translate"]').click();
    // Check Generic info page within 'Translate'
    cy.url().should('include', 'translate/info');
    cy.get('app-translate-info').should('exist');

    // Check Tag translations page within 'Translate'
    cy.get('a[href*="/translate/tags"]').click();
    cy.url().should('include', 'translate/tags');
    cy.get('app-translate-page').should('exist');
    cy.get('.maintenance-no-list-data').should('exist');
    cy.get('.maintenance-sidebar-item')
      .contains('Tag groups')
      .click();
    cy.get('app-translate-group').should('exist');

    // Check Template translations page within 'Translate'
    cy.get('a[href*="/translate/templates"]').click();
    cy.url().should('include', 'translate/templates');
    cy.get('app-translate-page').should('exist');
    cy.get('.maintenance-no-list-data').should('exist');
    cy.get('.maintenance-sidebar-item')
      .contains('Template field default texts')
      .click();
    cy.get('app-translate-group').should('exist');

    // Check Organize page
    cy.get('a[href*="/organize"]').click();
    // Check tags page within 'Organize'
    cy.get('a[href*="/organize/tags"]').click();
    cy.url().should('include', 'organize/tags');
    cy.get('app-tags').should('exist');

    // Check menus page within 'Organize'
    cy.get('a[href*="/organize/menus"]').click();
    cy.url().should('include', 'organize/menus');
    cy.get('app-menus').should('exist');

    // Check Custom fields page within 'Organize'
    cy.get('a[href*="/organize/metadata"]').click();
    cy.url().should('include', 'organize/metadata');
    cy.get('app-metadata').should('exist');

    // Check User settings page
    cy.get('a[href*="/user-settings"]').click();
    // Check users page within 'Organize'
    cy.get('a[href*="/user-settings/accounts"]').click();
    cy.url().should('include', 'user-settings/accounts');
    cy.get('app-accounts-page').should('exist');

    // Check roles page within 'Organize'
    cy.get('a[href*="/user-settings/roles"]').click();
    cy.url().should('include', 'user-settings/roles');
    cy.get('app-roles-page').should('exist');

    // Check groups page within 'Organize'
    cy.get('a[href*="/user-settings/groups"]').click();
    cy.url().should('include', 'user-settings/groups');
    cy.get('app-groups-page').should('exist');

    // Check permissions page within 'Organize'
    cy.get('a[href*="/user-settings/permissions"]').click();
    cy.url().should('include', 'user-settings/permissions');
    cy.get('app-permissions-page').should('exist');

    // Check Dashboard and all its charts
    cy.dataE2e('dashboardOpt').click();
    cy.url().should('include', '/dashboard');
    cy.get('app-statistics').should('exist');
    cy.get('app-list-chart-top-assets').should('exist');
    cy.get('app-list-chart-top-tags').should('exist');
    cy.get('app-list-chart-top-templates').should('exist');
    cy.get('app-list-chart-top-users').should('exist');
    cy.get('app-area-chart-asset-growth').should('exist');
    cy.get('app-stacked-limited-chart-users').should('exist');

    // Check Account profile settings
    cy.get('ly-avatar').click();
    cy.get('app-sidebar-menu').should('exist');
    cy.get('.ly-text-link')
      .contains('Account')
      .click();
    cy.url().should('include', '/account/profile/settings');
    cy.get('app-profile').should('exist');

    // Check Account shared links
    cy.get('a[href*="/account/links"]').click();
    cy.url().should('include', 'account/links/shared-assets');
    cy.get('app-links').should('exist');

    // Check upload requests within Account Shared Links
    cy.get('a[href*="/account/links/upload-requests"]').click();
    cy.url().should('include', 'account/links/upload-requests');
    cy.get('app-links').should('exist');

    // Check shared publications within Account Shared Links
    cy.get('a[href*="/account/links/publications"]').click();
    cy.url().should('include', 'account/links/publications');
    cy.get('app-links').should('exist');

    // Check shared brand-guides within Account Shared Links
    cy.get('a[href*="/account/links/brand-guides"]').click();
    cy.url().should('include', 'account/links/brand-guides');
    cy.get('app-links').should('exist');

    // Check notifications panel
    cy.dataE2e('notificationsOpt').click();
    cy.get('app-notifications').should('exist');
    cy.get('.sidebar-menu-heading-title').should('include.text', 'Notifications');

    // Check To do panel
    cy.dataE2e('actionsOpt').click();
    cy.get('app-action-list').should('exist');
    cy.get('.sidebar-menu-heading-title').should('include.text', 'To do');
    cy.get('.sidebar-menu-heading-close').click();
  });

  afterEach(() => {
    cy.lyLogout();
  });
});
