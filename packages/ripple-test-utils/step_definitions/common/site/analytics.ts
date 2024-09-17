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

        Object.keys(updatedRow).forEach((key) => {
          expect(event[key]).to.contain(updatedRow[key])
        })
      })
    })
  }
)

Then(
  'the dataLayer should have the following breadcrumbs',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.window().then((window) => {
      const event = window.dataLayer?.find((i) => i.event === 'routeChange')

      table.forEach((row, index) => {
        expect(event.breadcrumbs[index]).to.contain(row.title)
      })
    })
  }
)
