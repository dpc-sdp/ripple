import { Then, Given, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Given('a data table with ID {string}', (id: string) => {
  cy.get(`[data-component-id="${id}"]`).as('component')
  cy.get('@component')
    .should('exist')
    .should('have.attr', 'data-component-type', 'TideLandingPageDataTable')
})

Then(
  'have {int} rows and {int} columns',
  (rowCount: number, colCount: number, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('@component').within(() => {
      cy.get(`table tr`).as('rows')
    })

    cy.get('@rows').should('have.length', rowCount)

    table.forEach((row, i: number) => {
      cy.get('@rows')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find(row.type).as('cell')
          cy.get('@cell').should('have.length', colCount)
          cy.get('@cell').eq(0).should('contain', row['cell-one'])
          cy.get('@cell').eq(1).should('contain', row['cell-two'])
          cy.get('@cell').eq(2).should('contain', row['cell-three'])
        })
    })
  }
)

Then('it should have a heading', () => {
  cy.get('@component').within(() => {
    cy.get('table thead tr').should('exist')
  })
})

Then('it should have no heading', () => {
  cy.get('@component').within(() => {
    cy.get('table thead tr').should('not.exist')
  })
})
