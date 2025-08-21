import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the following meta tags should exists', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  table.forEach((row) => {
    const [kKey, kValue] = row.key.split('::')
    const [vKey, vValue] = row.value.split('::')

    cy.get(`${row.type}[${kKey}="${kValue}"]`).should('have.attr', vKey, vValue)
  })
})
