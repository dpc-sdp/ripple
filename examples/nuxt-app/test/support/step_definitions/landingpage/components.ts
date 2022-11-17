import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the landing page component with ID {int} should exist', (id: number) => {
  cy.get(`[data-component-id="${id}"]`).should('exist')
})

Then('the landing page component {string} should exist', (type: string) => {
  cy.get(`[data-component-type="${type}"]`).should('exist')
})

Then('the sidebar component with ID {string} should exist', (id: string) => {
  cy.get(`[data-sidebar-component-id="${id}"]`).should('exist')
})
