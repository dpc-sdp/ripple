import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a link list with ID {string} should exist with the following items',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageLinkList'
    )
    cy.get('@component').within(() => {
      cy.get(`.rpl-link-list-item__link`).as('items')
    })

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').should('have.attr', 'href', row.url)
        })
    })
  }
)
