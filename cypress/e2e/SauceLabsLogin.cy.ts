import { SauceDemoPage } from "../pageObjects/SauceDemoPage";

describe("template spec", () => {
  const page = new SauceDemoPage();

  beforeEach(() => {
    cy.log('Starting new test case');
  });

  it("passes", () => {
    cy.log('Running successful login test');
    cy.visit("https://www.saucedemo.com/v1/");
    cy.log('Attempting login with standard_user');
    page.login("standard_user", "secret_sauce");
    cy.log('Verifying Products label');
    page.verifyProductLabel("Products");
  });

  it("fails", () => {
    cy.log('Running failing test case');
    cy.visit("https://www.saucedemo.com/v1/");
    cy.log('Attempting login with standard_user');
    page.login("standard_user", "secret_sauce");
    cy.log('Attempting to verify incorrect Product label');
    page.verifyProductLabel("Product");
  });

  it("selects a product", () => {
    cy.log('Running product selection test');
    cy.visit("https://www.saucedemo.com/v1/");
    cy.log('Attempting login with standard_user');
    page.login("standard_user", "secret_sauce");
    cy.log('Verifying Products label');
    page.verifyProductLabel("Products");
    cy.log('Selecting Sauce Labs Backpack');
    page.selectProduct("Sauce Labs Backpack");
  });

  afterEach(() => {
    cy.log('Test case completed');
  });
});
