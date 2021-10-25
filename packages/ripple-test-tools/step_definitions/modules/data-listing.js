/* global cy */
/* eslint jest/valid-expect: "off" */
// Import shared step_definitions from ripple-test-tools package

require('@dpc-sdp/ripple-test-tools/step_definitions')
const { Given, Before, Then } = require('cypress-cucumber-preprocessor/steps')

Before({ tags: '@mockserver' }, async () => {
  cy.task('startMockServer')
})

Given(`the mock server has started`, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

Given(
  `the endpoint {string} returns fixture {string} with status {int}`,
  (route, fixture, status) => {
    cy.fixture(fixture).then(response => {
      cy.task('setMockRoute', { route, status, response })
    })
  }
)

Given(
  `the endpoint {string} with query {string} returns fixture {string} with status {int}`,
  (route, query, fixture, status) => {
    cy.fixture(fixture).then(response => {
      cy.task('setMockRouteWithQuery', { route, status, response, query })
    })
  }
)

Then(`the data listing component should exist`, () => {
  cy.get('.ch-data-listing').should('exist')
})
