/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`there should be {int} embedded videos`, (number) => {
  cy.get('.rpl-embedded-video').its('length').should('eq', number)
})

Then(`there should be a embedded video transcript link {string}`, (href) => {
  const link = cy.get('.rpl-embed-video__link a')
  link.should('have.attr', 'href', href)
  link.contains('View transcript')
})

Then(`the embedded video transcript should contain the text {string}`, (transcript) => {
  cy.get('.rpl-embed-video__transcript').contains(transcript)
})

Then(`the embedded video transcript should not exist`, () => {
  cy.get('.rpl-embed-video__transcript').should('not.exist')
})
