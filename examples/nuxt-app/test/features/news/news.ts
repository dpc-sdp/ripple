import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="title"]').should('have.text', title)
})

Then(
  'the news page should display the featured image {string}',
  (alt: string) => {
    cy.get('.tide-news__image .rpl-image').should('have.attr', 'alt', alt)
  }
)

Then('the news page details should include {string}', (text: string) => {
  cy.get('.tide-news__details .rpl-description-list__description').should(
    'contain',
    text
  )
})
