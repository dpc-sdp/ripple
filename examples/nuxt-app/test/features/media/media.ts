import { Before, After, Then } from '@badeball/cypress-cucumber-preprocessor'

Before({ tags: '@mockserver' }, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

After({ tags: '@mockserver' }, () => {
  cy.log('the mock server has stopped')
  cy.task('stopMockServer')
})

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

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
    cy.get('.tide-media__embedded-video').should('have.attr', 'src', url)
  }
)

Then(
  'the media page should include a audio embed with source {string}',
  (url: string) => {
    cy.get('.tide-media__audio').should('have.attr', 'src', url)
  }
)
