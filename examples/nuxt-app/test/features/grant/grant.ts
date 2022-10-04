import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the landing page component with ID {int} should exist', (id: number) => {
  cy.get(`[data-component-id="${id}"]`).should('exist')
})

Then('the landing page component {string} should exist', (type: string) => {
  cy.get(`[data-component-type="${type}"]`).should('exist')
})

Then('the title should be {string}', (title: string) => {
  cy.get('.tide-header h1').should('have.text', title)
})

Then('the overview should display a status of {string}', (status: string) => {
  cy.get('.tide-overview__item--status').should('have.text', status)
})

Then('the overview should display funding of {string}', (funding: string) => {
  cy.get('.tide-overview__item--funding').should('have.text', funding)
})

Then(
  'the overview should display an audience of {string}',
  (audience: string) => {
    cy.get('.tide-overview__item--audience').should('have.text', audience)
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
    cy.get(`[id="${id}"]`)
      .find('li > button')
      .each(($btn) => {
        cy.wrap($btn).should('have.attr', 'aria-expanded', 'true')
      })
    cy.get(`[id="${id}"]`)
      .find('.rpl-accordion__item-content')
      .each(($el) => {
        cy.wrap($el).should('be.visible')
      })
  }
)
