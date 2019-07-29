/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the example message has custom background color`, () => {
  cy.get('.example-message').should('have.css', 'background-color', 'rgb(217, 217, 217)')
})
