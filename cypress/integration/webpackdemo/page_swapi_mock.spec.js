const swapi_url = 'https://swapi.dev/api/people/9'

describe('Mocking swapi', () => {

  beforeEach(() => {
  })

  it('Mocking swapi it worked', () => {
    cy.intercept('GET', swapi_url, {
      statusCode: 200,
      body: {
        message: 'It worked'
      }
    }).as('swapi')

    cy.visit('/promise.html')

    cy.wait('@swapi')
      .then((xhr) => {
        expect(xhr.response.statusCode).to.equal(200)
        expect(xhr.response.body).to.eql({ message: 'It worked' })
      })
  })
})
describe('mock and return luke skywalker', () => {

  beforeEach(() => {

    cy.fixture('luke-skywalker').as('person').then((person) => {
      cy.intercept('GET', swapi_url, person
      ).as('skywalker')
    })
    cy.visit('/promise.html')

  })

  it('mocked request', () => {
    cy.wait('@skywalker')
      .then(xhr => {
        expect(xhr.request.body).to.equal('')
        expect(xhr.request.url).to.equal(swapi_url)
      })
  })

  it('response should have a headers and body', () => {
    cy.wait('@skywalker')
      .its('response')
      .should('have.a.property', 'body')
      .should('have.a.property', 'name')
      .should('equal', 'Luke Skywalker')

  })

  it('Body should have a property name', () => {
    cy.wait('@skywalker')
      .its('response')
      .its('body')
      .should('have.a.property', 'name')
  })

  it('it should be Luke skywalker', () => {
    cy.wait('@skywalker')
      .its('response.body.name')
      .should('match', /Luke Skywalker/)
  })

  it('should show 16 lines', () => {
    cy.get('swapi-component')
      .shadow()
      .find('#resultTable > tbody')
      .children('tr')
      .should('have.length', 16)
  })

  it('should show Luke Skywalker', () => {

    cy.get('swapi-component')
      .shadow()
      .find('#resultTable > tbody')
      .find('tr:first() > td:nth-child(2)')
      .contains('Luke Skywalker')
  })
})
