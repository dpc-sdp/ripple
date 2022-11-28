import {
  When,
  Given,
  Before,
  After
} from '@badeball/cypress-cucumber-preprocessor'

Before({ tags: '@mockserver' }, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

After({ tags: '@mockserver' }, () => {
  cy.log('the mock server has stopped')
  cy.task('stopMockServer')
})

Given(`the mock server has started`, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

Given(`the mock server has started with proxy`, () => {
  cy.log('the mock server has started, unmatched routes will be proxied')
  cy.task('startMockServer', true)
})

Given(`the mock server has been stopped`, () => {
  cy.task('stopMockServer')
  cy.log('the mock server has been stopped')
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
  cy.visit(route, { failOnStatusCode: false })
  cy.get('body').should('have.attr', 'data-nuxt-hydrated', 'true')
})
