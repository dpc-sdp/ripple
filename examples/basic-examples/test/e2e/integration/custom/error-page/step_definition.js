/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the example 404 error content is added`, () => {
  cy.get('.app-error-intro').should('contain', 'This is a custom 404 error message')
  cy.get('.app-error-main').should('contain', 'Your custom main 404 error message')
  cy.get('.app-error-cta .rpl-link__inner').should('contain', 'Go to 500 error')
})

Then(`the example 500 error content is added`, () => {
  cy.get('.app-error-intro').should('contain', 'This is a custom 500 error message')
  cy.get('.app-error-main').should('contain', 'Your custom main 500 error message')
  cy.get('.app-error-cta .rpl-link__inner').should('contain', 'Go to 404 error')
})
