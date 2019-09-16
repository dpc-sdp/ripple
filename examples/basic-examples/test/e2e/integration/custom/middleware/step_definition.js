/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the example component is added`, () => {
  cy.get('.example-message').should('exist')
})

Then(`the example class is added`, () => {
  cy.get('.my-example-custom-class').should('exist')
})
