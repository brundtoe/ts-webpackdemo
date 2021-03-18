describe('Webpack homepage', () => {
  it('Successfully load home page', () => {
    cy.visit('/')
  })

  it('Homepage has menuitems', () => {
    cy.visit('/')
    cy.get('#topnavbar > ul > li')
      .should('have.length',8)
    cy.get('#menuHome').contains('Home')
    cy.get('#menuBookstore').contains('Bookstore')
    cy.get('#menuGeoloc').contains('Geoloc')
    cy.get('#menuPromises').contains('Promise')
    cy.get('#menuXmldemo').contains('xmldemo')
    cy.get('#menuXmlhttp').contains('xmlhttp')
    cy.get('#menuAuthors').contains('Authors')
  })
})
