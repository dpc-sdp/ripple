/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the Description should be {string}`, (description) => {
  cy.get('.tide-event-content .rpl-col:nth-child(1) .rpl-markup .rpl-markup__inner').should('contain', description)
})

Then(`the Dates should be {string}`, (dates) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(1) .rpl-list__text`).should('contain', dates)
})

Then(`the Address should be {string}`, (address) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(2) .rpl-list__text`).should('contain', address)
})

Then(`the Price should be {string}`, (price) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(3) .rpl-list__text`).should('contain', price)
})

Then(`the Web url should be {string}`, (webUrl) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(4) .rpl-list__text`).should('contain', webUrl)
})

Then(`the Requirements the should be {string}`, (requirements) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(5) .rpl-list__text`).should('contain', requirements)
})

Then(`the Body should be {string}`, (body) => {
  cy.get('.tide-event-content .rpl-col:nth-child(3) .rpl-markup .rpl-markup__inner').should('contain', body)
})

Then(`the Image is asserted to be present`, () => {
  cy.get('.tide-event-content .embedded-entity--media--image').should('exist')
})

Then(`the Booking Url link should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('have.attr', 'href', value)
})

Then(`the Booking Text should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('contain', value)
})

Then(`the Booking Button should open in a new window`, () => {
  cy.get('.tide-event-content .rpl-button').should('have.attr', 'target', '_blank')
})
