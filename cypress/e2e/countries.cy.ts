it("Country Data Table", () => {
  cy.visit("http://127.0.0.1:5500/HTML/countryData.html");
  cy.get("table").should("exist");

  cy.contains("tr", "El Salvador")
    .invoke("index")
    .then((index: number) => {
      cy.log((index + 1).toString());

      getCurrency(index + 1).then((currency: string[]) => {
        cy.log(currency[0]);
      });
    });

  let uniqueCurr = new Set<string>();
  getCurrencyColVals()
    .then((currency: string[]) => {
      currency.forEach((curr, index) => {
        if (!uniqueCurr.has(curr)) {
          uniqueCurr.add(curr);
        } else {
          cy.log(`Duplicate currency: ${curr} + at index ${index}`);
        }
      });
    })
    .then(() => {
      uniqueCurr.forEach((curr) => {
        getCurrencyColVals().then((currency: string[]) => {
          const occurrences = currency.filter((c) => c === curr).length;
          if (occurrences > 1) {
            cy.log(`Currency ${curr} is duplicated ${occurrences} times`);
          }
        });
      });
    });
});

function getCurrency(index: number) {
  return cy.get(`:nth-child(${index}) > :nth-child(4)`).map("innerText");
}

function getCurrencyColVals() {
  return cy.get(`:nth-child(4)`).map("innerText");
}
