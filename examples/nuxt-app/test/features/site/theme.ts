import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the site header background color should be {string}', (colour: string) => {
  cy.get(`.rpl-nav-primary`).should('have.css', 'background-color', colour)
})

