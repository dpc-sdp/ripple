import { When, Given } from '@badeball/cypress-cucumber-preprocessor'

Given(`the mock server has started`, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

Given(
  `the endpoint {string} with query {string} returns fixture {string} with status {int}`,
  (route: string, query: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRouteWithQuery', { route, status, response, query })
    })
  }
)

When('I visit the page {string}', (route: string) => {
  cy.visit(route)
})
