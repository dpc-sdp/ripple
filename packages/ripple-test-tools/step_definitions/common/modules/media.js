/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`there should be {int} embedded videos`, (number) => {
  cy.get('.rpl-embedded-video').its('length').should('eq', number)
})

Then(`there should be a embedded video transcript link`, (number) => {
  const link = cy.get('.rpl-embed-video__link').find('a')
  link.its('href').should('eq', '/media/7008')
  link.contains('View transcript')
})
