/* global cy, Cypress */

const { Then, Given } = require('cypress-cucumber-preprocessor/steps')

Given(`that the current date is {string}`, (datestring) => {
  const now = new Date(datestring).getTime()
  if (datestring) {
    cy.clock(now)
  }
})

Then('it has no detectable a11y violations on load', () => {
  // Test the page at initial load
  cy.injectAxe()
  cy.checkA11y({
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa']
    }
  })
})

Given(`a request is made to {string}`, (url) => {
  cy.request({
    url,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    }
  }).as('request')
})

Then(`the response code should be {int}`, (statusExp) => {
  cy.get('@request').should((response) => {
    expect(response.status).to.eq(statusExp) // eslint-disable-line jest/valid-expect
  })
})
