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
  cy.get('[data-cy="title"]').should('have.text', title)
})
