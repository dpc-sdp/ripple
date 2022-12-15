import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})
