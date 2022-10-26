import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="title"]').should('have.text', title)
})

Then(
  'the media should display content which includes {string}',
  (text: string) => {
    cy.get('.tide-media__content').should('contain', text)
  }
)

Then('the media should have a date of {string}', (date: string) => {
  cy.get('.tide-media__date').should('contain', date)
})
