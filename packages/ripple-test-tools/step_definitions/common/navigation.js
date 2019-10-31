/* global cy, Cypress */

const { Then, Given } = require('cypress-cucumber-preprocessor/steps')

Given(`I visit the page {string}`, url => {
  cy.visit(url, {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: true
  })
})

Given(`I attempt to visit the page {string}`, url => {
  cy.visit(url, {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  })
})

Then(`I should be redirected to the page {string}`, path => {
  cy.wait(3000)
  cy.url().should('eq', `${Cypress.config().baseUrl}${path}`)
})

Then(`I should see a 404 page`, () => {
  cy.get('.app-error').should('exist')
})

Then(`the current page should not be an error page`, () => {
  cy.get('.app-error').should('not.exist')
})

Given(`I have created a node with the YAML fixture {string}`, fixture => {
  cy.TideCreateNode(fixture)
})

Given(`the {string} page exists with fixture {string} data`, (slug, fixture) => {
  const site = Cypress.env('SITE_ID') || '4'
  cy.request({
    url: `/api/v1/route?site=${site}&path=${slug}`,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  }).then(routeResponse => {
    cy.log(routeResponse)
    if (routeResponse.status !== 200) {
      cy.TideCreateNode(fixture)
    }
  })
})

Given(`I click the link {string}`, (href) => {
  cy.get(`a[href="${href}"]`).click()
})
