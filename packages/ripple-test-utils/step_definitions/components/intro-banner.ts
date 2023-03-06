import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'an intro banner with ID {string} should exist with the title {string}',
  (id: string, title: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageIntroBanner'
    )
    cy.get('@component').within(() => {
      cy.get(`[data-cy="title"]`).should('have.text', title)
    })
  }
)

Then(
  'an intro banner with ID {string} should exist with the summary {string}',
  (id: string, summary: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageIntroBanner'
    )
    cy.get('@component').within(() => {
      cy.get(`[data-cy="summary"]`).should('have.text', summary)
    })
  }
)

Then(
  'an intro banner with ID {string} should exist with the following links',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageIntroBanner'
    )
    cy.get('@component').within(() => {
      cy.get(`.rpl-header-links__item`).as('linkItems')
    })

    table.forEach((row, i: number) => {
      cy.get('@linkItems')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
        })
    })
  }
)
