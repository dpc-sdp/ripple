/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the example message is added`, () => {
  cy.get('.example-message').should('exist')
})
