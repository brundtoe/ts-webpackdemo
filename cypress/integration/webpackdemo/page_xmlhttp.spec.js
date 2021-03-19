describe('Webpack page xmlhttp', () => {

  beforeEach(() => {
    cy.visit('/xmlhttp.html')
  })

  it('Successfully load page xmlhttp', () => {
    cy.get('h1').contains('Vælg en forespørgsel')

    cy.get('jbr-menu')
      .shadow()
      .find('nav > a')
      .should('have.length', 5)
  })

  it('Select AJAX callback',() => {

    cy.get('#callback').focus()
      .click()

    cy.get('#cmdButton')
      .click()

    cy.get('ajax-callback')
      .shadow()
      .find('h2')
      .contains('XMLHttp request med callback')

    cy.get('ajax-callback')
      .shadow()
      .find('tbody > tr')
      .should('have.length',3)
      .and('contain','AJAX stands for')
  })

  it('select CD album', () => {

    cy.get('#cdalbum').focus()
      .click()

    cy.get('#cmdButton')
      .click()

    cy.get('cd-album')
      .shadow()
      .find('h2')
      .contains('XMLHttpRequest af CD album en xml fil')

    cy.get('cd-album')
      .shadow()
      .find('tbody > tr')
      .should(($tr) => {
        expect($tr).to.have.length(10)
        const bob = $tr[0].children
        expect(bob[0].innerText).to.equal('Bob Dylan')
        expect(bob[1].innerText).to.equal('Empire Burlesque')
        const percy = $tr[9].children
        expect(percy[0].innerText).to.equal('Percy Sledge')
        expect(percy[1].innerText).to.equal('When a man loves a woman')
      })
  })

  it('Fetch JSON', () => {
    cy.get('#fetchJson').focus()
      .click()

    cy.get('#cmdButton')
      .click()

    cy.get('fetch-component')
      .shadow()
      .find('h2')
      .contains('Window.fetch JSON file')

    cy.get('fetch-component')
      .shadow()
      .find('tbody > tr')
      .should(($tr) => {
          expect($tr).to.have.length(4)
          expect($tr[0].children[0].innerText).to.match(/^Ajax State*/)
          expect($tr[1].children[0].innerText).to.match(/^AJAX is not*/)
          expect($tr[2].children[0].innerText).to.match(/^AJAX is a*/)
          expect($tr[3].children[0].innerText).to.match(/^AJAX stands*/)
        })
  })
})
