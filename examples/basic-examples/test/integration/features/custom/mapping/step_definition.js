/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the example filter is applied`, () => {
  cy.get('.rpl-hero-banner__title span').should('contain', '[demo]')
})

Then(`the example async filter is applied`, () => {
  cy.get('.rpl-hero-banner__description').should('contain', '[demo]')
})

Then(`the core filter is overrode`, () => {
  cy.get('.rpl-hero-banner__link-list-item .rpl-text-label span span').should('contain', '[demo]')
})
