import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
const componentID = 'TideLandingPageTimeline'

Then(
  'a timeline with ID {string} should exist with the title {string}',
  (id: string, title: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should('have.attr', 'data-component-type', componentID)
    cy.get('@component').within(() => {
      cy.get(`[data-cy="page-component-title"]`).should('have.text', title)
    })
  }
)

Then(
  'a timeline with ID {string} should exist with the following items',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should('have.attr', 'data-component-type', componentID)
    cy.get('@component').within(() => {
      cy.get(`.rpl-timeline__item`).as('timelineItems')
    })

    table.forEach((row, i: number) => {
      cy.get('@timelineItems')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)
          cy.get('@item').should('contain', row.date)
          cy.get('@item').should('contain', row.summary)
          if (row.url) {
            cy.get('@item').find('a').should('have.attr', 'href', row.url)
          }

          if (row.image) {
            cy.get('@item')
              .find('img')
              .should('have.attr', 'srcset')
              .and('contain', row.image)
          }
        })
    })
  }
)
