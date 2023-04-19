import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

const componentID = 'TideLandingPageKeyDatesCard'

Then(
  'a key dates card with ID {string} should exist with the title {string}',
  (id: string, title: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should('have.attr', 'data-component-type', componentID)
    cy.get('@component').within(() => {
      cy.get(`[data-cy="title"]`).should('have.text', title)
    })
  }
)

Then(
  'a key dates card with ID {string} should exist with cta text {string} and link to {string}',
  (id: string, ctaText: string, ctaLink: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should('have.attr', 'data-component-type', componentID)
    cy.get('@component').within(() => {
      cy.get(`[data-cy="cta"]`).should('have.text', ctaText)
      cy.get(`[data-cy="cta"]`).should('have.attr', 'href', ctaLink)
      cy.get(`[data-cy="cta"]`).click()
    })

    cy.location('pathname').should('eq', ctaLink)
  }
)

Then(
  'a key dates card with ID {string} should exist with the following dates',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should('have.attr', 'data-component-type', componentID)
    cy.get('@component').within(() => {
      cy.get(`.rpl-card__keydate`).as('dateItems')
    })

    table.forEach((row, i: number) => {
      cy.get('@dateItems')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)
          cy.get('@item').should('contain', row.date)
          cy.get('@item').should('contain', row.summary)
        })
    })
  }
)
