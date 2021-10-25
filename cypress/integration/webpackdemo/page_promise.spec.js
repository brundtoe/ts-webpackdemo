describe('Webpack page Promise', () => {

  beforeEach(() => {
    cy.visit('/promise.html')
  })

  it('Successfully load page Promise', () => {
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)
  })
  it('Page has component swapi-component', () => {
    cy.get('swapi-component')
      .shadow()
      .find('h2')
      .contains('Promise henter Star Wars People')
  })

  it('page shows Biggs Darklighter', () => {
    cy.get('swapi-component')
      .shadow()
      .find('#resultTable > tbody')
      .children('tr')
      .should('have.length', 16)

    cy.get('swapi-component')
      .shadow()
      .find('#resultTable > tbody')
      .find('tr:first > td:nth-child(2)')
      .contains('Biggs Darklighter')

  })

})
