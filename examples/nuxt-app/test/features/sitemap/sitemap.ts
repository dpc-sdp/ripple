import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the sitemap should be rendered with these items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-sitemap`).as('component')

    cy.get('@component').within(() => {
      cy.get(`a`).as('links')
    })

    table.forEach((row, i: number) => {
      cy.get('@links')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
        })
    })
  }
)
