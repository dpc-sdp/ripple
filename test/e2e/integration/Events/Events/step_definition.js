/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the description should be {string}`, (description) => {
  cy.get('.tide-event-content .rpl-col:nth-child(1) .rpl-markup .rpl-markup__inner').should('contain', description)
})

Then(`the list item {int} should be {string}`, (index, item) => {
  cy.get(`.tide-event-content .rpl-list .rpl-list__list-item:nth-child(${index}) .rpl-list__text`).should('contain', item)
})

Then(`the body should be {string}`, (body) => {
  cy.get('.tide-event-content .rpl-col:nth-child(3) .rpl-markup .rpl-markup__inner').should('contain', body)
})

Then(`the image is present`, () => {
  cy.get('.tide-event-content .embedded-entity--media--image').should('exist')
})

Then(`the booking button text should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('contain', value)
})

Then(`the booking button link should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('have.attr', 'href', value)
})

Then(`the booking button target should be {string}`, (value) => {
  cy.get('.tide-event-content .rpl-button').should('have.attr', 'target', value)
})
