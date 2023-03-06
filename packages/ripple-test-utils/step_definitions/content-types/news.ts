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
