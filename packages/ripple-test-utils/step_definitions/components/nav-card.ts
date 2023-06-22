import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a nav card with ID {string} should exist with the following properties',
  (id: string, dataTable: DataTable) => {
    const data = dataTable.hashes()[0]

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageNavCard'
    )
    cy.get('@component').within(() => {
      cy.get(`[data-cy="title"]`).should('have.text', data.title)
      cy.get(`[data-cy="content"]`).should('have.text', data.content)

      if (data.image) {
        cy.get(`[data-cy="image"]`)
          .should('have.attr', 'srcset')
          .and('contain', data.image)
      } else {
        cy.get(`[data-cy="image"]`).should('not.exist')
      }
    })
  }
)
