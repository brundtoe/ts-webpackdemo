describe('Webpack page bookstore ', () => {

  beforeEach(() => {
    cy.visit('/bookstore.html')
  })

  it('Successfully load page bookstore', () => {
    cy.get('.display-5').contains('Bookstore')
  })

  it('Bookstore Section is a container', () => {
    cy.get('#bookstoreSection').should('have.class', 'container')
  })

  it('Bookstore contains 4 selections', () => {
    cy.get('bookstore-customers > ul')
      .children('li')
      .should('have.length', 4)
  })

  it('Contains element California', () => {
    cy.get('bookstore-customers > ul')
      .children('li')
      .first()
      .contains('California')
  })
  it('Has button Show all customers', () => {
    cy.get('bookstore-customers')
      .shadow()
      .find('#readCustomers')
      .click()

    cy.get('bookstore-customers')
      .shadow()
      .find('table.show > tbody')
      .children('tr.row')
      .should('have.length',30)

  })

})
