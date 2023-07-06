import { When, Given } from '@badeball/cypress-cucumber-preprocessor'

Given(`I am using a {string} device`, (deviceString: any) => {
  cy.viewport(deviceString)
})

When('I visit the page {string}', (route: string) => {
  cy.visit(route, { failOnStatusCode: false })
  cy.get('body').should('have.attr', 'data-nuxt-hydrated', 'true')
  cy.wait(200)
})
