/* global cy */

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

Then(`the form title should be {string}`, (title) => {
  cy.get('.rpl-form__title').should('contain', title)
})

Given(`I have entered the form correctly`, () => {
  cy.csvFixture('Forms/Grant/tc9c').as('sampleFormSubmission')
  cy.get('@sampleFormSubmission').then(sampleFormSubmission => {
    cy.log(sampleFormSubmission)
    cy.get(':nth-child(5) > .rpl-fieldset__inner > .form-group > .field-wrap > .rpl-checkbox > .rpl-checkbox__box').click()
    cy.get('#name-of-grant-or-program').type(sampleFormSubmission.name)
    cy.get('#describe-the-grant-or-program').type(sampleFormSubmission.description)
    cy.get('[for="open-date"] + div input').type(sampleFormSubmission.openDate)
    cy.get('#describe-the-grant-or-program').click()
    cy.get('[for="close-date"] + div input').type(sampleFormSubmission.closeDate)
    cy.get('#describe-the-grant-or-program').click()

    cy.get('[for="topic"] + div .rpl-select__trigger').click()
    cy.get('[for="topic"] + div .rpl-select__listbox').type('{downarrow}')
    cy.get('[for="topic"] + div .rpl-select__trigger').click()

    cy.get('[for="who-is-the-grant-or-program-for"] + div .rpl-select__trigger').click()
    cy.get('[for="who-is-the-grant-or-program-for"] + div .rpl-select__listbox').type('{downarrow}')
    cy.get('[for="who-is-the-grant-or-program-for"] + div .rpl-select__trigger').click()

    cy.get('#funding-amount-from').type(sampleFormSubmission.amountFrom)
    cy.get('#funding-amount-to').type(sampleFormSubmission.amountTo)

    cy.get('#website-url-to-apply-for-grant-or-program').type(sampleFormSubmission.applyUrl)
    // cy.get('[id^="this-grant-program-is-ongoing-and-does-have-an-open-close-dates-"]').check({force: true})
    cy.get('#website-url-for-grant-or-program-information').type(sampleFormSubmission.infoUrl)
    cy.get('#contact-person').type(sampleFormSubmission.contactName)
    cy.get('[for="department-agency-or-provider-organisation"] + div .rpl-select__trigger').click()
    cy.get('[for="department-agency-or-provider-organisation"] + div .rpl-select__listbox').type('{downarrow}')
    cy.get('[for="department-agency-or-provider-organisation"] + div .rpl-select__trigger').click()

    cy.get('#contact-email-address').type(sampleFormSubmission.contactEmail)
    cy.get('#contact-telephone-number').type(sampleFormSubmission.contactPhone)

    if (sampleFormSubmission.acknowledge === 'TRUE') {
      cy.get('[id^="agree-privacy-statement-"]').check({force: true})
    }
  })
})

When('I submit the form', () => {
  cy.fixture('/Forms/Grant/tc9c_submission.json').as('formSubmissionResponse')
  cy.server() // enable response stubbing
  cy.route('POST', '/api/v1/webform_submission/tide_grant_submission', '@formSubmissionResponse').as('formSubmissionRequest')
  cy.get('form.rpl-form').first().submit()
  cy.get('@formSubmissionRequest').then(submissionData => {
    cy.log(submissionData)
  })
})

Then('I should see the form success message', () => {
  cy.get('.rpl-form-alert', { timeout: 10000 }).should('have.class', 'rpl-form-alert--success')
})
Then('I should see the failure message', () => {
  cy.get('.rpl-form-alert', { timeout: 10000 }).should('have.class', 'rpl-form-alert--error')
})

Then('I should see {int} validation errors', (errors) => {
  cy.get('.form-group.error').should('have.length', errors)
})

Given(`I have navigated to the created test page`, function () {
  cy.visit(`/node/${this.nodeId}`, {failOnStatusCode: false})
})

Given(`I dont fill out any fields`, () => {
  // doesn't do nothing to nobody
})

Then(`the form submission should be saved`, () => {
  cy.wait('@formSubmissionRequest')
  cy.get('@formSubmissionRequest').then(submissionData => {
    cy.wrap(submissionData.request.body.data.attributes.data).should('equal', `{"name_of_grant_or_program":"Extra special grant","describe_the_grant_or_program":"this is the description","open_date":null,"close_date":null,"this_grant_program_is_ongoing_and_does_have_an_open_close_dates_":true,"topic":"2","who_is_the_grant_or_program_for_":["82"],"funding_level_from":123123,"funding_level_to":234234,"website_url_to_apply_for_grant_or_program":"http://www.google.com","website_url_for_grant_or_program_information":"http://www.google.com","horizontal_rule_1":null,"required_contact_details":null,"contact_person":"Stan Grant","department_agency_or_provider_organisation":"99","contact_email_address":"stan@mailinator.com","contact_telephone_number":"03 91222222","horizontal_rule_2":null,"privacy_statement_disclaimer":null,"agree_privacy_statement":true,"actions":null}`)
  })
})
