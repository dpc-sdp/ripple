import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the dataLayer should include the following events',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    let eventIndex: { [key: string]: number } = {}

    table.forEach((row) => {
      cy.window().then((window) => {
        const dataLayer = window.dataLayer
        const events = dataLayer?.filter((i) => i.event === row.event)

        eventIndex[row.event] =
          eventIndex[row.event] !== undefined ? eventIndex[row.event] + 1 : 0

        const columns = Object.entries(row).reduce(
          (
            acc: Record<string, any>,
            [key, value]: [string, string | boolean | undefined]
          ) => {
            if (value === 'true') value = true
            if (value === 'false') value = false

            return {
              ...acc,
              [key]: value
            }
          },
          {}
        )

        Object.keys(columns).forEach((key) => {
          if (typeof columns[key] === 'boolean') {
            expect(events?.[eventIndex[row.event]][key]).to.equal(columns[key])
          } else if (columns[key]) {
            expect(events?.[eventIndex[row.event]][key]).to.contain(
              columns[key]
            )
          } else {
            expect(events?.[eventIndex[row.event]][key]).to.be.undefined
          }
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
        expect(event?.breadcrumbs[index]).to.contain(row.title)
      })
    })
  }
)

Then(
  'the dataLayer form data for {string} should include the following values',
  (name: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.window().then((window) => {
      const event = window.dataLayer?.find((i) => i.event === name)

      table.forEach((row) => {
        let value = event?.form_data[row.key]

        if (value === 'true') value = true
        if (value === 'false') value = false

        expect(value).to.equal(value)
      })
    })
  }
)
