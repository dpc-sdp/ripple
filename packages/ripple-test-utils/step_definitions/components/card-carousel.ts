import { Given, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Given(
  'a card carousel with ID {string} should exist with the following promo cards',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageCardCarousel'
    )

    cy.get('@component').within(() => {
      cy.get(`.rpl-card--promo`).as('promoCards')
    })

    table.forEach((row, i: number) => {
      cy.get('@promoCards')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          cy.get('@item')
            .find('[data-cy="title"]')
            .should('have.text', row.title)
          cy.get('@item')
            .find('[data-cy="content"]')
            .should('have.text', row.content)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
          cy.get('@item').find('[data-cy="date"]').should('contain', row.date)
          cy.get('@item')
            .find(`[data-cy="image"]`)
            .should('have.attr', 'srcset')
            .and('contain', row.image)
        })
    })
  }
)

Then(
  'the card carousel with ID {string} should contain a key dates card with the title {string}, link {string} and the following entries',
  (id: string, title: string, link: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`.rpl-card--key-dates`).as('keyDatesCard')
      cy.get('@keyDatesCard')
        .find('[data-cy="title"]')
        .should('have.text', title)
      cy.get('@keyDatesCard')
        .find('a')
        .should('have.attr', 'href')
        .and('contain', link)
      cy.get('@keyDatesCard').find('.rpl-card__keydate').as('keyDatesEntries')
    })

    table.forEach((row, i: number) => {
      cy.get('@keyDatesEntries')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)
          cy.get('@item').should('contain', row.subtitle)
          cy.get('@item').should('contain', row.content)
        })
    })
  }
)
