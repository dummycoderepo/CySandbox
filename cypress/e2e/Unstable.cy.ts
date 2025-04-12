it("Verify stable guid", () => {
  cy.visit("http://127.0.0.1:5500/HTML/unstableGuid.html");
  cy.contains("Get new guid").click();

  cy.get("#guidDisplay").should("not.have.text", "Click button to generate GUID");

  let guids = new Set()
  cy.get("#guidDisplay").then((guid) => {
    const guidText = guid.text();
    guids.add(guidText);
    cy.get("#guidDisplay").should('have.text', guidText);
  })
});
