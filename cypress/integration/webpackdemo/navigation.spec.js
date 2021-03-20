describe('ts-webpack topnavn Navigation', () => {
  it('navigate to homepages', () => {
    cy.visit('/')
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)
  })

  it('Navigate using topnav', () => {
    cy.visit('/')
    cy.get('#menuBookstore').click()
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)

    cy.get('#menuGeoloc').click()
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)

    cy.get('#menuPromises').click()
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)

    cy.get('#menuXmldemo').click()
    cy.get('#topnavbar > ul > li')
      .should('have.length', 8)

    cy.get('#menuXmlhttp').click()
    cy.get('jbr-menu ').shadow()
      .find('nav > a')
      .then(($nav) => {
        expect($nav).to.have.length(5)
        expect($nav[2].dataset.test).to.equal('authors')
      })
  })

  it('from jbr-menu select authors', () => {
    cy.visit('/xmlhttp.html')

    cy.get('jbr-menu ').shadow()
      .find('[data-test=authors]')
      .click()

    cy.get('jbr-element-menu').shadow()
      .find('nav > a')
      .should('have.length', 6)
  })

})
