describe('Save Auth State for SauceDemo', () => {
    it('should log in and save state', () => {
      cy.visit('https://www.saucedemo.com/v1/');
  
      // Perform login
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('#login-button').click();
  
      // Verify successful login by checking the URL
      cy.url().should('include', '/inventory.html');
  
      // Save local storage and cookies
      cy.window().then((win) => {
        const storage = {
          localStorage: win.localStorage,
          sessionStorage: win.sessionStorage,
          cookies: [],
        };
  
        cy.getCookies().then((cookies) => {
          storage.cookies = cookies;
          cy.writeFile('cypress/storage/auth.json', storage);
        });
      });
    });
  });
  