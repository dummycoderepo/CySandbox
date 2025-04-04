import { SauceDemoPage } from "../pageObjects/SauceDemoPage";

describe("template spec", () => {
  const page = new SauceDemoPage();

  it("passes", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    page.login("standard_user", "secret_sauce");
    page.verifyProductLabel("Products");
  });

  //Add a test that fails
  it("fails", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    page.login("standard_user", "secret_sauce");
    page.verifyProductLabel("Product");
  });

  //Add a test that selects a product
  it("selects a product", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    page.login("standard_user", "secret_sauce");
    page.verifyProductLabel("Products");
    page.selectProduct("Sauce Labs Backpack");
  });
});
