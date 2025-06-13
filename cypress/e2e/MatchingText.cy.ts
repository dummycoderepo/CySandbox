it("Debug", () => {
  cy.visit("http://127.0.0.1:5500/HTML/textList.html");
  const textToFind = (el: { innerText: string }) => el.innerText === "B";
  cy.get("li").findOne(textToFind).should("have.text", "B");

  cy.contains("li", new RegExp("^B$")).should("have.text", "B");
});
