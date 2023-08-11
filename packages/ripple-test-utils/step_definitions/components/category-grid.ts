import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a category grid with ID {string} should exist with the following cards',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component')
      .should('exist')
      .should('have.attr', 'data-component-type', 'TideLandingPageCategoryGrid')

    cy.get('@component').within(() => {
      cy.get('.rpl-card--category-grid').as('items')
    })

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find('.rpl-card__cta').should('contain', row.title)
          cy.get('@item')
            .find('.rpl-card__content')
            .should('contain', row.content)
          cy.get('@item')
            .find('.rpl-image')
            .should('have.attr', 'src')
            .and('contain', row.image)
        })
    })
  }
)
