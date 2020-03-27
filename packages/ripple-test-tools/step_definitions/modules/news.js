/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`the publish date and author component should exist`, () => {
  cy.get('.rpl-publish-date-and-author').should('exist')
})

Then(`the publish date and location should read {string}`, (value) => {
  cy.get('.rpl-publish-date-and-author__date-location').should('contain', value)
})

Then(`the publish author should be {string}`, (value) => {
  cy.get('.rpl-publish-date-and-author__author').should('contain', value)
})
