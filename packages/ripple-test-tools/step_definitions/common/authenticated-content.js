/* global cy, Cypress */

const { Then, When } = require('cypress-cucumber-preprocessor/steps')

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

// Then(`there are no console errors`, () => {
//   const spy = cy.window().then((win) => { cy.spy(win.console, 'log') }).as('logger')
//   expect(spy).to.be.called // eslint-disable-line
// })

Then(`the logout button should not be visible`, () => {
  cy.get('.rpl-site-header__btn--logout').should('not.be.visible')
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

Then(`there should be a draft banner`, () => {
  cy.get('.rpl-alert-base.app-preview').should('exist')
})

Then(`there should be a header logout button`, () => {
  cy.get('.rpl-site-header__btn--logout').should('exist')
})
