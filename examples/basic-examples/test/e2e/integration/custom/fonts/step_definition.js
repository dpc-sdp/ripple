/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

// This can only test css, can't test if the fonts got loaded.
// I have tried to use 'https://github.com/bramstein/fontfaceobserver' but couldn't make it work here.
Then('Custom fonts is applied', () => {
  cy.get('.rpl-hero-banner__title').should('have.css', 'font-family', 'Oswald, Arial, Helvetica, sans-serif')
})
