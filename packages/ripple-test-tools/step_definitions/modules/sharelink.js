/* global cy, Cypress */

const { Given } = require('cypress-cucumber-preprocessor/steps')

Given(`in the backend there is a share link token at {string} with {string} data`, (url, fixture) => {
  cy.request({
    url: `/api/v1/${url}`,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  }).then(routeResponse => {
    cy.log(routeResponse)
    if (routeResponse.status !== 200) {
      cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/content/import_demo_content', {
        auth: {
          username: Cypress.env('CONTENT_API_AUTH_USER'),
          password: Cypress.env('CONTENT_API_AUTH_PASS')
        }
      })
      cy.fixture(fixture + '.yml').then(yaml => {
        cy.get('[data-drupal-selector="edit-import"]').invoke('val', yaml)
        cy.get('[data-drupal-selector="edit-submit"]').click()
      })
    }
  })
})
