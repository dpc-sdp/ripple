import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a custom data driven component with ID {string} should exist with title {string} and have the properties',
  (id: string, title: string, dataTable: DataTable) => {
    const data = dataTable.hashes()[0]

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'ExampleDDC'
    )
    cy.get('@component').within(() => {
      cy.get(`h3`).should('have.text', title)
    })

    cy.get('@component').should('contain', data.description)
    cy.get('@component').should('contain', data.testCustomProp)
  }
)
