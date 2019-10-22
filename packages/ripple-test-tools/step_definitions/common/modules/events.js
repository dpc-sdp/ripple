/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`the event page Description should be {string}`, (description) => {
  cy.get('.tide-event-content .rpl-col:nth-child(1) .rpl-markup .rpl-markup__inner').should('contain', description)
})

Then(`the event page Dates should be {string}`, (dates) => {
  cy.get('.tide-event-content .rpl-list').screenshot('event')
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(1) .rpl-list__text`, { timeout: 10000 }).should('contain', dates)
})

Then(`the event page Address should be {string}`, (address) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(2) .rpl-list__text`).should('contain', address)
})

Then(`the event page Price should be {string}`, (price) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(3) .rpl-list__text`).should('contain', price)
})

Then(`the event page Web url should be {string}`, (webUrl) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(4) .rpl-list__text`).should('contain', webUrl)
})

Then(`the event page Requirements should be {string}`, (requirements) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(5) .rpl-list__text`).should('contain', requirements)
})

Then(`the event page Body should be {string}`, (body) => {
  cy.get('.tide-event-content .rpl-col:nth-child(3) .rpl-markup .rpl-markup__inner').should('contain', body)
})

Then(`the event page Image should be present`, () => {
  cy.get('.tide-event-content .embedded-entity--media--image').should('exist')
})

Then(`the event page Booking Url link should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('have.attr', 'href', value)
})

Then(`the event page Booking Text should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('contain', value)
})

Then(`the event page Booking Button should open in a new window`, () => {
  cy.get('.tide-event-content .rpl-button').should('have.attr', 'target', '_blank')
})
