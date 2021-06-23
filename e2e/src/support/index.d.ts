declare namespace Cypress {
  interface Logout {
    root: string;
    realm: string;
    redirect_uri: string;
    client_id: string;
  }
  interface Login {
    root: string;
    realm: string;
    username: string;
    password: string;
    client_id: string;
    path_prefix?: string;
    redirect_uri: string;
  }
  interface Chainable {
    /**
     * Custom command to select DOM element by data-e2e attribute.
     * @example cy.dataE2E('greeting')
     */
    dataE2e(value: string): Chainable;

    login({ root, realm, username, password, client_id, redirect_uri }: Login): Chainable;

    logout({ root, realm, redirect_uri }: Logout): Chainable;

    lyLogin(): Chainable;

    lyLogout(): Chainable;

    setBaseUrl(): Chainable;
  }
}
