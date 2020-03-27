/* global cy */

const { Then, When } = require('cypress-cucumber-preprocessor/steps')

Then(`the quick exit button should be present`, () => {
  cy.get('.rpl-quick-exit').should('exist')
})

When(`I click the quick exit button`, () => {
  cy.get('.rpl-quick-exit').click()
})

Then(`the quick exit url should be {string}`, (url) => {
  cy.get('.rpl-quick-exit__button').invoke('attr', 'href').should('contain', url)
})
