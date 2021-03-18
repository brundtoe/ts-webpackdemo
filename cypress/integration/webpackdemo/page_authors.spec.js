describe('Webpack page Authors', () => {

  beforeEach(() => {
    cy.visit('/authors.html')
  })

  it('Successfully load page authors', () => {
    cy.get('h1').contains('Authors from Bookstore')

    cy.get('jbr-element-menu')
      .shadow()
      .find('nav')
      .children('a')
      .should('have.length',6)

    cy.get('template')

  })

  it('page contains five names', () => {
    cy.get('bookstore-authors')
      .find('#firstnames')
      .children('li')
      .should('have.length',4)

    cy.get('bookstore-authors > ul' )
      .children('li')
      .should('have.text','AlexBrianChrisDavid')
      .and('contain','Brian')
  })

  it('Show all 12 authors',() =>{

    cy.get('#readAuthors')
      .click()

    cy.get('#res > tbody')
      .children('tr')
      .should('have.length',12)

  })

  it('Four authors should have name like Alex',() => {
    cy.get('#firstnames > :nth-child(1)' )
      .click()

    cy.get('#res > tbody')
      .children('tr')
      .should('have.length',4)
  })

  it('Four authors should have name like Alex',() => {
    cy.get('#firstnames > :nth-child(1)' )
      .click()

    cy.get('#res > tbody')
      .children('tr')
      .should(($tr) => {
        expect($tr).to.have.length(4)
        const federov = $tr[0].children
        expect(federov[0].innerText).to.equal('2')
        expect(federov[1].innerText).to.equal('Alex')
        expect(federov[2].innerText).to.equal('Federov')
        expect(federov[3].innerText).to.equal('Federov@mail.com')
      })
  })

})
