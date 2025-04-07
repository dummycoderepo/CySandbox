it("Verify the airline statuses", function () {
  cy.visit("http://127.0.0.1:5500/HTML/airlineChart.html");

  //Go through the first column and see if JetBlue is present
  cy.get("tr > td:nth-child(1)").should("contain", "JetBlue");

  cy.get("tr").each((element, index) => {
    if (element.text().includes("JetBlue")) {
      cy.log("index is: " + index);

      //Check if the status is stable
      function pollStatus() {
        checkStatusStability().then((isStable) => {
          cy.log("Is stable: " + isStable);
          if (isStable) {
            cy.log("Status is stable");
          } else {
            cy.log("Status is not stable");
            pollStatus();
          }
        });
      }
      //Triggger the polling function
      pollStatus();

      //Print row for JetBlue
      cy.wrap(element).map("innerText").print();
    }
  });
});

function checkStatusStability(): Cypress.Chainable<boolean> {
  return cy
    .get("#airlinesTable > tbody > tr:nth-child(1) > td:nth-child(4)")
    .then((statusElement: JQuery<HTMLElement>) => statusElement.text())
    .then((statusBeforeDelay) => {
      return cy.wait(500).then(() => {
        return cy
          .get("#airlinesTable > tbody > tr:nth-child(1) > td:nth-child(4)")
          .then((statusElement: JQuery<HTMLElement>) => {
            const statusAfterDelay = statusElement.text();
            return statusBeforeDelay === statusAfterDelay;
          });
      });
    });
}
