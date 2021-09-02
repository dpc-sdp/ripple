/* global cy */

import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given(`I visit the Vue router path {string}`, url => {
  cy.visit(url, {
    failOnStatusCode: false
  })
})

Then(`the example ripple components should exist`, () => {
  cy.get('.rpl-link').should('exist')
  cy.get('.rpl-text-link').should('exist')
  cy.get('svg.rpl-icon').should('exist')
  cy.get('.rpl-card-nav').should('exist')
  cy.get('.rpl-button').should('exist')
})
