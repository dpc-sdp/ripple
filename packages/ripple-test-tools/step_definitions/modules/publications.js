/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`the publication print component should exist`, () => {
  cy.get('.rpl-publication-download-print').should('exist')
})
