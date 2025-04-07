it("Transaction", () => {
  cy.visit("http://127.0.0.1:5500/HTML/guidTransactionFlow.html");
  cy.contains("Start Transaction").click();
});
