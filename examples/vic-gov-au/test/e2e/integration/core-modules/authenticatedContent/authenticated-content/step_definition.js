/* global cy */

import { Then, When, Given } from 'cypress-cucumber-preprocessor/steps'

Then(`there should be a login form with the title {string}`, (title) => {
  cy.get('.tide-login__form .tide-login__wrapper h2').should('contain', title)
})

Then(`there should be a form field with the label {string}`, (label) => {
  cy.get('.tide-login__form label').contains(label).should('exist')
})

Then(`there should be a submit button with the text {string}`, (label) => {
  cy.get('.tide-login__form .field-submit').contains(label).should('exist')
})

Then(`there should be a login form button with the text {string}`, (label) => {
  cy.get('.tide-login__switch-list .rpl-button').contains(label).should('exist')
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

Then(`the login status colour should should be {string}`, (status) => {
  switch (status) {
    case 'green':
      cy.get('.rpl-form-alert').should('have.class', 'rpl-form-alert--success')
      break
    case 'red':
      cy.get('.rpl-form-alert').should('have.class', 'rpl-form-alert--danger')
      break
  }
})

Then(`the login status message should be {string}`, (status) => {
  cy.get('.rpl-form-alert').should('contain', status)
})

Given(`the role {string} exists in the backend`, (role) => {
  cy.task('createUserRole', role).as('authContentRole')
})

Given(`the authenticated content module is configured with:`, (dataTable) => {
  const expected = dataTable.hashes()[0]
  cy.task('configureAuthContent', expected).as('authContentTerm')
})

Given(`there is a user in the system with the following credentials:`, (dataTable) => {
  const user = dataTable.hashes()[0]
  const active = Boolean(dataTable.hashes()[0].active === 'true')

  cy.task('createUser', { ...user, active }).as('userId')
})

Then(`the created user should be removed`, () => {
  cy.get('@userId').then(userId => {
    if (userId) {
      cy.task('deleteUser', userId)
    }
  })
})

Given(`I have configured authenticated content in the backend`, (dataTable) => {
  const options = {
    ...dataTable.hashes()[0]
  }
  cy.task('configureProtectedContent', options)
})

Then(`I should reset authenticated content in the backend to :`, (dataTable) => {
  const options = {
    ...dataTable.hashes()[0]
  }
  cy.task('configureProtectedContent', options)
})

Then(`the menu should have {int} top level items`, (number) => {
  cy.get('.rpl-menu__items--root').children().should('have.length', number)
})

Given(`I have navigated to the created test page`, () => {
  cy.get('@nodeId').then(nodeId => {
    cy.visit(`/node/${nodeId}`, { failOnStatusCode: false })
  })
})

// Then(`there are no console errors`, () => {
//   const spy = cy.window().then((win) => { cy.spy(win.console, 'log') }).as('logger')
//   expect(spy).to.be.called // eslint-disable-line
// })

Then(`the logout button should not be visible`, () => {
  cy.get('.rpl-site-header__btn--logout').should('not.be.visible')
})
