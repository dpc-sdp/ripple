import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the content collection with ID {string} exist with the following cards',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component')
      .should('exist')
      .should(
        'have.attr',
        'data-component-type',
        'TideLandingPageContentCollection'
      )

    cy.get('@component').within(() => {
      cy.get('.rpl-card').as('items')
    })

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
          cy.get('@item').find('.rpl-card__cta').should('contain', row.title)
          cy.get('@item')
            .find('.rpl-card__content')
            .should('contain', row.content)

          if (row.image) {
            cy.get('@item')
              .find('.rpl-image')
              .invoke('attr', 'src')
              .should((src) => {
                const [baseSrc] = src.split('?')
                expect(baseSrc).to.eq(row.image)
              })
          } else {
            cy.get('@item').find('.rpl-image').should('not.exist')
          }
        })
    })
  }
)
