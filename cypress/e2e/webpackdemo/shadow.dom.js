describe('bookstore wih shadow dom enabled',{"includeShadowDom": true}, () => {

  beforeEach(() => {
    cy.visit('/bookstore.html')
  })

  it('dummy', () => {
    cy.get('[data-test=readCustomers]')
      .click()

    cy.get('table.show > tbody')
      .children('tr.row')
      .should('have.length', 29)
  })
})
