it("Bigno", () => {
  cy.visit("http://127.0.0.1:5500/HTML/bingoGame.html");

  let bingoFound = false;

  cy.get("button").each((btn, index) => {
    cy.then(() => {
      if (bingoFound) {
        return; // Stop iterating if bingo is found
      } else {
        cy.wrap(btn).click();
        cy.contains("Bingo!")
          .should(Cypress._.noop)
          .then((bing): void => {
            if (bing.length > 0) {
              bingoFound = true;
              cy.log("Bingo found at index: " + index);
            }
          });
      }
    });
  });
});
