it("Verify stable guid", () => {
  cy.visit("http://127.0.0.1:5500/HTML/unstableGuid.html");
  cy.contains("Get new guid").click();

  cy.get("#guidDisplay").should("not.have.text", "Click button to generate GUID");

  cy.get("#guidDisplay").then((guid) => {
    let currentGuid = guid.text();
    cy.wrap(guid).should("not.have.text", currentGuid);
  });
});
