it("Country Data Table", () => {
  cy.visit("http://127.0.0.1:5500/HTML/countryData.html");
  cy.get("table").should("exist");

  cy.contains('tr', 'Bahamas').invoke('index').print()
  cy.contains('tr', 'Bahamas').then((row) => {
    let rowVal = row.text();
    cy.log(JSON.stringify(rowVal.split("\t")))
  })

})