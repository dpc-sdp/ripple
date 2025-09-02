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
      cy.get('.rpl-card, .rpl-search-result').as('items')
    })

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.content)
          cy.get('@item').find('a').should('contain', row.title)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)

          if (row.type) {
            cy.get('@item').should('have.attr', 'data-type', row.type)
          }
          if (row.meta) {
            cy.get('@item').find('dd').contains(row.meta)
          }

          if (row.image) {
            cy.get('@item')
              .find('img')
              .invoke('attr', 'src')
              .should((src) => {
                const [baseSrc] = src.split('?')
                expect(baseSrc).to.eq(row.image)
              })
          } else {
            cy.get('@item').find('img').should('not.exist')
          }
        })
    })
  }
)
