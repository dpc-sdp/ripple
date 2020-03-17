/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`there should be a draft banner`, () => {
  cy.get('.rpl-alert-base.app-preview').should('exist')
})

Then(`there should be a header logout button`, () => {
  cy.get('.rpl-site-header__btn--logout').should('exist')
})
