/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the page should scroll to {string}`, (selector) => {
  cy.get(selector).then($el => $el[0].getBoundingClientRect()).its('y').should('lessThan', 1)
})
