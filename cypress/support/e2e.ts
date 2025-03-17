// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//Overwrite cy.log function
Cypress.Commands.overwrite('log', (originalFn, message: string) => {
  // Log the message to the console
  //cy.task('log', message);
  // Call the original cy.log to log to the Cypress UI
  originalFn(message);
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
})