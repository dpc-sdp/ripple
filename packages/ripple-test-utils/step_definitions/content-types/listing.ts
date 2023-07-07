import { Then, Given, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the search listing page should have {int} results',
  (resultCount: number) => {
    cy.get(`.rpl-result-listing-item`).should('have.length', resultCount)
  }
)

Then(
  'the search listing results should have following items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-result-listing-item`).as('result')

    table.forEach((row, i: number) => {
      cy.get('@result')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
          cy.get('@item').should('contain', row.content)
        })
    })
  }
)
