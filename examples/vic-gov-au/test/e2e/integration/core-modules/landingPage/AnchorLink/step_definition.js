/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the anchor linked item goes to the top of the page`, () => {
  cy.get('#accordion-header-basic').then($el => $el[0].getBoundingClientRect()).its('y').should('lessThan', 1)
})
