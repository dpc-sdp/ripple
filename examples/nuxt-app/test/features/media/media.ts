import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="title"]').should('have.text', title)
})

Then(
  'the media page should display content which includes {string}',
  (text: string) => {
    cy.get('.tide-media__content').should('contain', text)
  }
)

Then('the media page should have the timestamp of {string}', (date: string) => {
  cy.get('.tide-media__date time').should('have.attr', 'datetime', date)
})
