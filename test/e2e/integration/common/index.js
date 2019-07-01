/* global cy, Cypress */

import { Then, Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I visit the page {string}`, url => {
  cy.visit(url)
})

Then(`the page title should be {string}`, title => {
  cy.title().should('include', title)
})

Then(`the page title should be set`, () => {
  cy.title().should('exist')
})

Then(`the page title should match test data`, () => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-hero-banner__title')
      .should('contain', pageData.title)
  })
})

Given(`I have created a landing page with the json fixture {string}`, (fixture) => {
  cy.fixture(fixture).as('pageData')
  cy.get('@pageData').then(data => {
    cy.task('createLandingPage', data).then(({nodeId, previewLink}) => {
      cy.wrap(nodeId).as('nodeId')
      cy.wrap(previewLink).as('previewLink')
    })
  })
})

Given(`I have navigated to the created page`, () => {
  cy.get('@nodeId').then(nodeId => {
    cy.visit(`/node/${nodeId}`)
  })
})

Then(`the h1 should be {string}`, title => {
  cy.get('h1').should('contain', title)
})

Then(`the h1 should be set`, () => {
  cy.get('h1').should('exist')
})

Then(`I should see a 404 page`, () => {
  cy.get('.app-error').should('exist')
})

Given(`I have navigated to the created test page`, () => {
  cy.get('@nodeId').then(nodeId => {
    cy.visit(`/node/${nodeId}`, { failOnStatusCode: false })
  })
})

Then(`I should be redirected to the page {string}`, (path) => {
  cy.wait(3000)
  cy.url().should('eq', `${Cypress.config().baseUrl}${path}`)
})

Then(`the site header is visible`, () => {
  cy.get('.rpl-site-header').should('be.visible')
})

Then(`the site footer is visible`, () => {
  cy.get('.rpl-site-footer').should('be.visible')
})

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

Then(`the page title should be set`, () => {
  cy.get('@pageData').then(pageData => {
    cy.title().should('include', pageData.title)
  })
})

Then(`the created page should be removed`, () => {
  cy.get('@nodeId').then(nodeId => {
    if (nodeId) {
      cy.task('deleteNode', nodeId)
    }
  })
})
