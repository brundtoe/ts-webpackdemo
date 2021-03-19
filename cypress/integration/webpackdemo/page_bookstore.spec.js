describe('Webpack page bookstore with LitElement ', () => {

  beforeEach(() => {
    cy.visit('/bookstore.html')
  })

  it('Successfully load page bookstore', () => {
    cy.get('.display-5').contains('Bookstore')
    cy.get('#topnavbar > ul > li')
      .should('have.length',8)
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
  it('Has button Show all 29 customers', () => {
    cy.get('bookstore-customers')
      .shadow()
      .find('#readCustomers')
      .click()

    cy.get('bookstore-customers')
      .shadow()
      .find('table.show > tbody')
      .children('tr.row')
      .should('have.length',29)
  })
  it('Indiana should have 4 customers', () => {
    cy.get('bookstore-customers')
      .find('#IN')
      .click()

    cy.get('bookstore-customers')
      .shadow()
      .find('table.show > tbody')
      .children('tr.row')
      .should('have.length',4)

  })

})
