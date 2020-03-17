/* global cy, Cypress */

const { Then, When } = require('cypress-cucumber-preprocessor/steps')

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

// Login

When(`I enter the the following login credentials:`, (dataTable) => {
  const login = dataTable.hashes()[0].login
  const password = dataTable.hashes()[0].password
  cy.get('#username').type(login)
  cy.get('#password').type(password.replace('********', Cypress.env('ADMIN_PASSWORD')))
})

When(`I submit the login form`, () => {
  cy.get('.field-wrap > input[value="Submit"]').click()
})

Then(`the page design should match the snapshot`, () => {
  cy.percySnapshot()
})
