/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then('should verify the lighthouse scores', (dataTable) => {
  if (!dataTable) {
    cy.lighthouse()
  } else {
    const thresholdsTable = dataTable.rawTable.slice(1)
    const thresholds = {}
    thresholdsTable.forEach((expected, index) => {
      const metric = expected[0]
      const threshold = expected[1]
      thresholds[metric] = threshold
    })
    cy.lighthouse(thresholds)
  }
})

Then(`the page title should be {string}`, title => {
  cy.title().should('include', title)
})

Then(`the page title should be set`, () => {
  cy.title().should('exist')
})

Then(`the h1 should be {string}`, title => {
  cy.get('h1').should('contain', title)
})

Then(`the h1 should be set`, () => {
  cy.get('h1').should('exist')
})

Then(`the site header is visible`, () => {
  cy.get('.rpl-site-header').should('be.visible')
})

Then(`the site footer is visible`, () => {
  cy.get('.rpl-site-footer').should('be.visible')
})

// Global Notifications (Alerts)

Then(`I should see {int} global notification`, (alertCount) => {
  cy.get('.tide-alert .rpl-alert').should('have.length', alertCount)
})

Then(`there should be the following global notifications:`, (dataTable) => {
  const alerts = dataTable.rawTable.slice(1)
  alerts.forEach((expected, index) => {
    const title = expected[0]
    const type = expected[1]
    const url = expected[2]
    const linkText = expected[3]
    cy.get('.rpl-alert').contains(title).parent().parent().as('alert')

    cy.get('@alert').find('.rpl-alert__title').should('contain', title)
    cy.get('@alert').find('.rpl-alert__link').should('have.attr', 'href', url)
    cy.get('@alert').find('.rpl-alert__link').should('contain', linkText)
    cy.get('@alert').should('have.attr', 'data-alert-type', type)
  })
})

Then(`the following section title ids should exist:`, (dataTable) => {
  const sections = dataTable.rawTable.slice(1)
  sections.forEach((section) => {
    cy.get(`h2#${section}`).should('exist')
  })
})

Then(`the menu should have {int} top level items`, (number) => {
  cy.get('.rpl-menu__items--root').children().should('have.length', number)
})

Then(`the page should scroll to {string}`, (selector) => {
  cy.get(selector).then($el => $el[0].getBoundingClientRect()).its('y').should('lessThan', 1)
})
