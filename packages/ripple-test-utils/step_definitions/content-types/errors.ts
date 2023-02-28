import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
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

Then('the error content contains the status {int}', (status: number) => {
  cy.get(`[data-cy="error-${status}"]`).should('exist')
})
