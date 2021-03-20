/**
 * page xmldemo er ikke designet til en omfattende test
 */
describe('Webpack page Authors', () => {

  beforeEach(() => {
    cy.visit('/xmldemo.html')
  })

  it('Successfully load page xmldemo', () => {

    cy.get('.display-5').contains('Xmldemo')
    cy.get('#topnavbar > ul > li')
      .should('have.length',8)

    cy.get('authors-xmldemo').shadow()
      .find('h3')
      .contains('Filerne er indlæst')
  })

  it('Queries component loaded',() => {
    cy.get('authors-xmldemo > ul')
      .children('li')
      .should('have.length',11)
  })
  it('Show all authors',() => {
    cy.get('authors-xmldemo > ul > :nth-child(7)')
      .click()

    cy.get('authors-xmldemo')
      .shadow()
      .find('div')
      .should('have.length',7)
      .contains('Cynthia Randall')
  })

  it.only('Show element name',() => {
    cy.get('authors-xmldemo > ul > :nth-child(4)')
      .click()

    cy.get('authors-xmldemo')
      .shadow()
      .find('div')
      .should('have.length',38)
  })

})
