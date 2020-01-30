/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

// This can only test css, can't test if the fonts got loaded.
// I have tried to use 'https://github.com/bramstein/fontfaceobserver' but couldn't make it work here.
Then('the h1 heading should have the fonts {string}', (font) => {
  cy.get('h1').should('have.css', 'font-family', font)
})
