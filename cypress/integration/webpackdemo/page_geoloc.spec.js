describe('Webpack page geoloc ', () => {

  beforeEach(() => {
    cy.visit('/geoloc.html')
  })

  it('Successfully load page geoloc', () => {
    cy.get('.display-5').contains('Geoloc')
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)
  })

  it('Has webcomponent geoloc-cities', () =>{
    cy.get('geoloc-cities > ul')
      .children('li')
      .should('have.length', 5)
  })

  it('Contains element Syddanmark', () => {
    cy.get('geoloc-cities > ul')
      .find('li:nth-child(3)')
      .first()
      .contains('Syddanmark')
  })

  it('Region Nordjylland has 10 cities', () => {
    cy.get('geoloc-cities > ul')
      .find('li:first')
      .contains('Nordjylland')
      .click()

    cy.get('geoloc-cities')
      .shadow()
      .find('table.show > tbody')
      .children('tr.row')
      .should('have.length',10)
  })
})
