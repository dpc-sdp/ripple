import { When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'an accordion with ID {string} should exist with title {string} and have the following accordion items',
  (id: string, title: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageAccordion'
    )
    cy.get('@component').within(() => {
      cy.get(`[data-cy="page-component-title"]`).should('have.text', title)
      cy.get(`.rpl-accordion__item`).as('accordionItems')
    })

    table.forEach((row, i: number) => {
      cy.get('@accordionItems')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find('.rpl-accordion__item-toggle').click()
          cy.get('@item')
            .find('.rpl-accordion__item-toggle')
            .should('contain', row.title)

          cy.get('@item')
            .find('.rpl-accordion__item-content')
            .should('contain', row.content)
        })
    })
  }
)

Then(
  'the accordion with ID {string} should display the description {string}',
  (id: string, description: string) => {
    cy.get(`[data-component-id="${id}"] .tide-accordion-description`).contains(
      description
    )
  }
)

When(
  'I click the open all button on accordion with ID {string}',
  (id: string) => {
    cy.get(`[id="${id}"]`).contains('Open all').click()
  }
)

Then(
  'all accordion items in accordion ID {string} should be visible',
  (id: string) => {
    cy.get(`#${id}`)
      .find('li > button')
      .each(($btn) => {
        cy.wrap($btn).should('have.attr', 'aria-expanded', 'true')
      })
    cy.get(`#${id}`)
      .find('.rpl-accordion__item-content')
      .each(($el) => {
        cy.wrap($el).should('be.visible')
      })
  }
)

When(
  'I click the close all button on accordion with ID {string}',
  (id: string) => {
    cy.get(`[id="${id}"]`).contains('Close all').click()
  }
)

Then(
  'all accordion items in accordion ID {string} should be hidden',
  (id: string) => {
    cy.get(`#${id}`)
      .find('li > button')
      .each(($btn) => {
        cy.wrap($btn).should('have.attr', 'aria-expanded', 'false')
      })
    cy.get(`#${id}`)
      .find('.rpl-accordion__item-content')
      .each(($el) => {
        cy.wrap($el).should('not.be.visible')
      })
  }
)
