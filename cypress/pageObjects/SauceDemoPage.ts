/**
 * This class represents the page object for the Sauce Demo application.
 * It contains methods to interact with the login page and verify elements.
 */
export class SauceDemoPage {
  userName = "#user-name";
  password = "#password";
  loginButton = "#login-button";
  productLabel = ".product_label";

  /**
   * Logs in to the Sauce Demo application using the provided username and password.
   * @param {string} username - The username to log in with.
   * @param {string} password - The password to log in with.
   */
  login(username: string, password: string) {
    cy.get(this.userName).type(username);
    cy.get(this.password).type(password);
    cy.get(this.loginButton).click();
  }

  /**
   * Verifies that the product label contains the expected text.
   * @param {string} expectedText - The text expected to be found in the product label.
   * @returns {void}
   */
  verifyProductLabel(expectedText: string): void {
    cy.get(this.productLabel).should("have.text", expectedText);
  }

  /**
   * Selects a product by its name.
   * @param {string} productName - The name of the product to select.
   */
  selectProduct(productName: string) {
    cy.contains(".inventory_item_name", productName).click();
  }

  /**
   * Logs out of the Sauce Demo application.
   */
  logout() {
    cy.get(".bm-burger-button").click();
    cy.get("#logout_sidebar_link").click();
  }

  /**
   * A dummy method with 5 parameters of any type.
   * @param {any} param1 - The first parameter.
   * @param {any} param2 - The second parameter.
   * @param {any} param3 - The third parameter.
   * @param {any} param4 - The fourth parameter.
   * @param {any} param5 - The fifth parameter.
   * @returns {void}
   */
  dummyMethod(
    param1: any,
    param2: any,
    param3: any,
    param4: any,
    param5: any
  ): void {
    // This is a dummy method and does not perform any actions.
    console.log(param1, param2, param3, param4, param5);
  }
}
