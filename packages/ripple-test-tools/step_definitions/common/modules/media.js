/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`there should be {int} embedded videos`, (number) => {
  cy.get('.rpl-embedded-video').its('length').should('eq', number)
})

Then(`there should be a embedded video transcript link`, (number) => {
  const link = cy.get('.rpl-embed-video__link a')
  link.should('have.attr', 'href', '/media/7008')
  link.contains('View transcript')
})
