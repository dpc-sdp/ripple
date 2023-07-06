import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the search listing page should have {int} results',
  (resultCount: number) => {
    cy.get(`.rpl-result-listing-item`).should('have.length', resultCount)
  }
)
