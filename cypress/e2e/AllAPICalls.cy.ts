import { Interception } from "cypress/types/net-stubbing";

describe('Log XHR Responses', () => {
  beforeEach(() => {
    cy.intercept('**/*.json').as('apiCall');
  });
  
  it('logs all XHR responses', () => {
    cy.visit('https://coffee-cart.app/');
  
    cy.wait('@apiCall').then((interception: Interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      cy.writeFile('cypress/fixtures/apiResponse.json', interception.response.body);
    } else {
      expect(interception.response).to.exist;
    }
    });
  });
});

