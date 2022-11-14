import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a stats grid with ID {string} should exist with the following items',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageStatsGrid'
    )
    cy.get('@component').within(() => {
      cy.get(`.rpl-stats-grid-item`).as('items')
    })

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.label)
          cy.get('@item').should('contain', row.value)
        })
    })
  }
)
