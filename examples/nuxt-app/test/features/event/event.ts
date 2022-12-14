import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

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
