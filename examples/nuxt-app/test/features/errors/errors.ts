import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given(
  'the error page {string} has a status of {int}',
  (route: string, status: number) => {
    cy.request({
      url: route,
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(status)
    })
  }
)

Then('the error page displays the title {string}', (text: string) => {
  cy.get('[data-cy="error-message"] .rpl-error-message__title').should(
    'contain',
    text
  )
})
