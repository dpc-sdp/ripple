/* global cy, Cypress */
/* eslint jest/valid-expect: "off" */

const { Then, Given, When } = require('cypress-cucumber-preprocessor/steps')

Given(`that the current date is {string}`, (datestring) => {
  cy.task('stubDate', datestring)
  const now = new Date(datestring).getTime()
  if (datestring) {
    cy.clock(now)
  }
})

Given(`the current date is today`, () => {
  cy.task('resetDate')
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

Given(`a valid test request is made to the search endpoint`, () => {
  cy.request({
    url: Cypress.env('SEARCH_ENDPOINT'),
    auth: {
      username: Cypress.env('SEARCH_AUTH_USERNAME'),
      password: Cypress.env('SEARCH_AUTH_PASSWORD')
    }
  }).as('request')
})

Then(`the response code should be {int}`, (statusExp) => {
  cy.get('@request').should((response) => {
    expect(response.status).to.eq(statusExp)
  })
})

Then(`the response header {string} should has value {string}`, (header, value) => {
  cy.get('@request').should((response) => {
    expect(response.headers[header]).to.eq(value)
  })
})

Then(`the response has header {string}`, (header) => {
  cy.get('@request').should((response) => {
    expect(response.headers).to.have.property(header)
  })
})

Then(`I should be on the page {string}`, (url) => {
  cy.url().should('contain', url)
})

When(`I wait for {int} seconds`, seconds => {
  cy.wait(seconds * 1000)
})

When(`I type {string}`, command => {
  cy.type(command)
})

When(`I scroll to the {string} of the page`, (place) => {
  cy.scrollTo(place)
})

Given(`I am using a {string} device`, (deviceString) => {
  cy.viewport(deviceString)
})

Then(`All stubbed routes should be removed`, () => {
  cy.server({ enable: false })
})

Then(`{string} image snapshot matches`, (selector) => {
  cy.wait(2000)
  cy.get(selector)
    .toMatchImageSnapshot()
})
