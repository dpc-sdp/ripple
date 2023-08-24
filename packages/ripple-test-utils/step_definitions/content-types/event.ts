import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the overview should list the following details',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-component-type="tide-event__details"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`.tide-event__feature`).as('links')
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

Then(
  'the event search listing results should have following items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row, i: number) => {
      cy.get('.tide-event-search-result')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)
          cy.get('@item').should('contain', row.content)
          cy.get('@item')
            .find('a')
            .should('have.attr', 'href')
            .should('contain', row.url)
          cy.get('@item').find('.rpl-card__meta').should('contain', row.date)
          cy.get('@item')
            .find('.tide-event-search-result__location')
            .should('contain', row.location)
        })
    })
  }
)
