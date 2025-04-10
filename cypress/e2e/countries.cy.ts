it("Country Data Table", () => {
  cy.visit("http://127.0.0.1:5500/HTML/countryData.html");
  cy.get("table").should("exist");

  cy.contains('tr', 'Bahamas').invoke('index').print()
  cy.contains('tr', 'Bahamas').then((row) => {
    let rowVal = row.text();
    cy.log(JSON.stringify(rowVal.split("\t")))
  })

})

it("get text of multiple elements into a string array", ()=>{
  cy.get('tr').then((rows) => {
    let rowsText = Cypress._.map(rows, row => { return row.innerText })
    
    let filteredRow = rowsText.filter((row) => {return row.includes('Bahamas')})
    cy.log(JSON.stringify(filteredRow))

    //["11\tBahamas\tNassau\tBahamian Dollar"]
    let capitalCityOfGivenCountry = filteredRow[0].split("\t")[2]
    cy.log(capitalCityOfGivenCountry)
  })
})