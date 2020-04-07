/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`the GTM script should be installed with id {string}`, (gtmid) => {
  cy.window().its('google_tag_manager').should('have.property', gtmid.toUpperCase())
})
