/* global cy */

import { Then, When, Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have navigated to the created preview page`, () => {
  cy.get('@previewLink').then(previewLink => {
    cy.visit(previewLink, {failOnStatusCode: false})
  })
})

Then(`there should be a redirect to {string}`, (url) => {
  cy.window().its('location.pathname').should('equal', url)
})

Then(`there should be a preview destination query string`, () => {
  cy.get('@previewLink').then(previewLink => {
    cy.window().its('location.search').should('equal', `?destination=${encodeURIComponent(previewLink)}`)
  })
})

Then(`I should be redirected to the preview page`, () => {
  cy.get('@previewLink').then(previewLink => {
    cy.window().its('location.href').should('contain', previewLink)
  })
})

Given(`there is a user in the system with the following credentials:`, (dataTable) => {
  const user = dataTable.hashes()[0]
  const active = Boolean(dataTable.hashes()[0].active === 'true')

  cy.task('createUser', { ...user, active }).as('userId')
})

When(`I enter the the following login credentials:`, (dataTable) => {
  const login = dataTable.hashes()[0].login
  const password = dataTable.hashes()[0].password
  cy.get('#username').type(login)
  cy.get('#password').type(password)
})

When(`I submit the login form`, () => {
  cy.get('.field-wrap > input[value="Submit"]').click()
})

Then(`there should be a draft banner`, () => {
  cy.get('.rpl-alert-base.app-preview').should('exist')
})

Then(`there should be a header logout button`, () => {
  cy.get('.rpl-site-header__btn--logout').should('exist')
})

Then(`the created user should be removed`, () => {
  cy.get('@userId').then(userId => {
    if (userId) {
      cy.task('deleteUser', userId)
    }
  })
})
