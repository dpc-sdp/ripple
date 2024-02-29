import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the news page should display the featured image {string}',
  (alt: string) => {
    cy.get('[data-cy="featured-image"]').should('have.attr', 'alt', alt)
  }
)

Then('the news page details should include {string}', (text: string) => {
  cy.get('[data-cy="details"] dd').should('contain', text)
})

Then(
  'the news page details should include {string} {string}',
  (term: string, description: string) => {
    cy.get('.tide-news__details dt').contains(term).parents('dt').as('term')
    cy.get('@term').next('dd').contains(description)
  }
)

Then(
  'the news page details should display only the description for {string} {string}',
  (term: string, description: string) => {
    cy.get('.tide-news__details dd').contains(description).as('description')
    cy.get('@description')
      .prev('dt')
      .contains(term)
      .should('have.class', 'rpl-u-visually-hidden')
  }
)
