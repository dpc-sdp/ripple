import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a data table with ID {string} should exist with the following structure',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component')
      .should('exist')
      .should('have.attr', 'data-component-type', 'TideLandingPageDataTable')
    cy.get('@component').within(() => {
      cy.get(`table tr`).as('rows')
    })

    cy.get('@rows').should('have.length', 3)

    table.forEach((row, i: number) => {
      cy.get('@rows')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find(row.type).as('cell')
          cy.get('@cell').should('have.length', 3)
          cy.get('@cell').eq(0).should('contain', row['cell-one'])
          cy.get('@cell').eq(1).should('contain', row['cell-two'])
          cy.get('@cell').eq(2).should('contain', row['cell-three'])
        })
    })
  }
)
