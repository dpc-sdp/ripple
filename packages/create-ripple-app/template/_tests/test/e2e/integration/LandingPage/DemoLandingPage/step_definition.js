/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the campaign title should be {string}`, title => {
  cy.get('.rpl-campaign-primary__title').should('contain', title)
})

Then(`the anchor link title should be {string}`, title => {
  cy.get('.rpl-anchor-links__title').should('contain', title)
})

Then(`there should be {int} anchor links`, length => {
  cy.get('.rpl-anchor-links__items').children().should('have.length', length)
  cy.log('test')
})
