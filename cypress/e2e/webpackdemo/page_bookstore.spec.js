describe('Webpack page bookstore with LitElement ', () => {

  beforeEach(() => {
    cy.visit('/bookstore.html')
  })

  it('Successfully load page bookstore', () => {
    cy.get('.display-5').contains('Bookstore')
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)
  })

  it('Bookstore Section is a container', () => {
    cy.get('#bookstoreSection').should('have.class', 'container')
  })

  it('Bookstore contains 4 selections', () => {
    cy.get('bookstore-customers')
      .as('slots')
      .find('ul > li')
      .should('have.length', 4)

    cy.get('@slots')
      .find('ul > li')
      .first()
      .contains('California')
  })

  describe('Checking web component bookstore-customersd', () => {

    beforeEach(() => {
      cy.get('bookstore-customers')
        .as('customers')
    })

    it('Has button Show all 29 customers', () => {
      cy.get('@customers')
        .shadow()
        .find('[data-test=readCustomers]')
        .click()

      cy.get('@customers')
        .shadow()
        .find('table.show > tbody')
        .children('tr.row')
        .should('have.length', 29)
    })

    it('There are 4 customers i Inidiana', () => {

      cy.get('@customers')
        .find('[data-test=IN]')
        .click()

      cy.get('@customers')
        .shadow()
        .find('table.show > tbody')
        .children('tr.row')
        .should('have.length', 4)

    })
  })
})
