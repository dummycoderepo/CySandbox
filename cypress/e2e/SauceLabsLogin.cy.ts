describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.saucedemo.com/v1/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.product_label').should('have.text', 'Products')
  })

  //Add a test that fails
  it('fails', () => {
    cy.visit('https://www.saucedemo.com/v1/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.product_label').should('have.text', 'Product')
  })
})