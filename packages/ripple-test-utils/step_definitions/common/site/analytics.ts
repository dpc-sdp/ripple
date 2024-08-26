import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the dataLayer should include the following events',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row) => {
      cy.window().then((window) => {
        const dataLayer = window.dataLayer

        const event = dataLayer.find((i) => i.event === row.event)

        const updatedRow = Object.entries(row).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: value
          }
        }, {})

        cy.wrap(event).should('include', updatedRow)
      })
    })
  }
)
