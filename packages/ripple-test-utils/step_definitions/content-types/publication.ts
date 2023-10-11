import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'there should be a page link with a title of {string} and description text of {string}',
  (title: string, desc: string) => {
    cy.get('.rpl-page-links__link-label').contains(title).should('exist')
    cy.get('.rpl-page-links__link-text').contains(desc).should('exist')
  }
)
