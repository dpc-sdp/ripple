/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`there should be a honour roll profile image containing url {string}`, (imgPath) => {
  cy.get('.rpl-profile-highlight__image').should('have.attr', 'src').should('include', imgPath)
})
