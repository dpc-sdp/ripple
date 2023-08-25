import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the media page should display content which includes {string}',
  (text: string) => {
    cy.get('.tide-media__content').should('contain', text)
  }
)

Then('the media page should have the timestamp of {string}', (date: string) => {
  cy.get('[data-cy="updated-date"] time').should('have.attr', 'datetime', date)
})

Then(
  'the media page should include a video embed with source {string}',
  (url: string) => {
    cy.get('.tide-media__embedded-video .rpl-media-embed__video')
      .should('have.attr', 'src')
      .should('contain', url)
  }
)

Then(
  'the media page should include a audio embed with source {string}',
  (url: string) => {
    cy.get('.tide-media__audio').should('have.attr', 'src', url)
  }
)
