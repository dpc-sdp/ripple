import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a call to action with ID {string} should exist with the following properties',
  (id: string, dataTable: DataTable) => {
    const data = dataTable.hashes()[0]

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageCallToAction'
    )
    cy.get('@component').within(() => {
      cy.get(`[data-cy="title"]`).should('have.text', data.title)
      cy.get(`[data-cy="summary"]`).should('have.text', data.summary)
      cy.get(`[data-cy="cta"]`).should('have.text', data.ctaText)
      cy.get(`[data-cy="image"]`).should('have.attr', 'src', data.image)
    })
  }
)
