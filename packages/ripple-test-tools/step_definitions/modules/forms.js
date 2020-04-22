/* global cy, Cypress */
/* eslint jest/valid-expect: "off" */

const { Then, When, Given } = require('cypress-cucumber-preprocessor/steps')

Then(`I enter the following into the content rating form:`, (dataTable) => {
  const { helpful, comment } = dataTable.hashes()[0]
  if (helpful) {
    cy.get(`[name="was_this_page_helpful"][value="${helpful}"]`).click()
  }
  if (comment) {
    cy.get('#please-add-your-comments').type(comment)
  }
})

When('I submit the form named {string}', (formName) => {
  cy.get(`form[name="${formName}"]`).submit()
})

When('I click the form submit button {string}', (label) => {
  cy.get(`.rpl-form [type='submit']`).contains(label).click({ force: true })
})

Then('I should see the form success message', () => {
  cy.get('.rpl-form-alert', { timeout: 20000 }).then($el => {
    expect($el).to.have.class('rpl-form-alert--success')
  })
})
Then('I should see the form failure message', () => {
  cy.get('.rpl-form-alert', { timeout: 20000 }).then($el => {
    expect($el).to.have.class('rpl-form-alert--danger')
  })
})

Then('I should see {int} form validation errors', (errors) => {
  cy.get('.form-group.error').should('have.length', errors)
})

Given(`I stubbed the form {string} response with {string} fixture`, (form, fixture) => {
  cy.fixture(fixture).as('formSubmissionResponse')
  cy.server() // enable response stubbing
  cy.route('POST', `/api/v1/webform_submission/${form}`, '@formSubmissionResponse').as('formSubmissionRequest')
})

Then(`i enter the following information into the form {string}:`, (formName, dataTable) => {
  const items = dataTable.hashes()
  cy.get(`form[name="${formName}"]`).as('form')
  cy.log(items)
  items.forEach(item => {
    switch (item.type) {
      case 'rpl-select':
        cy.get('@form').find('label').contains(item.label).parent().siblings('.field-wrap').as('field')
        cy.get('@field').find('.rpl-select__trigger').click()
        cy.get('@field').find('.rpl-select__dropdown')
          .contains(item.value)
          .click()
        break
      case 'checkbox':
        cy.get('@form').find('label.rpl-checkbox').contains(item.label).parent().as('checkboxField')
        if (item.value === 'true') {
          cy.get('@checkboxField').find('input[type="checkbox"]').check({ force: true })
        }
        break
      case 'radios':
        cy.get('@form').find('label').contains(item.label).parent().siblings('.field-wrap').as('field')
        cy.get('@field').find(`input[value="${item.value}"]`).click()
        break
      case 'date':
        cy.get('@form').find('label').contains(item.label).parent().siblings('.field-wrap').as('field')
        cy.get('@field').find('input')
        break
      default:
        cy.get('@form').find('label').contains(item.label).parent().siblings('.field-wrap').as('field')
        cy.get('@field').find('.form-control').type(item.value)
        break
    }
  })
})

Given(`in the backend there there is a form named {string} with the fixture {string}`, (url, fixture) => {
  cy.request({
    url: `/api/v1/route?site=${Cypress.env('SITE_ID')}&path=/form/${url}`,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  }).then(routeResponse => {
    cy.log(routeResponse)
    if (routeResponse.status !== 200) {
      cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/content/import_demo_content', {
        auth: {
          username: Cypress.env('CONTENT_API_AUTH_USER'),
          password: Cypress.env('CONTENT_API_AUTH_PASS')
        }
      })
      cy.fixture(fixture + '.yml').then(yaml => {
        cy.get('[data-drupal-selector="edit-import"]').invoke('val', yaml)
        cy.get('[data-drupal-selector="edit-submit"]').click()
      })
    }
  })
})
