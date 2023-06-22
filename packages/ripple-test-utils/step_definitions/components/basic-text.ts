import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a wysiwyg content area with ID {string} should exist with the content {string}',
  (id: string, content: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageContent'
    )
    cy.get('@component').should('contain', content)
  }
)
