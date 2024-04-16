import { When, Given } from '@badeball/cypress-cucumber-preprocessor'

Given(`I am using a {string} device`, (deviceString: any) => {
  cy.viewport(deviceString)
})

Given(`the viewport is set to {int} x {int}`, (w: number, h: number) => {
  cy.viewport(w, h)
})

When('I visit the page {string}', (route: string) => {
  cy.visit(route, { failOnStatusCode: false })
  cy.get('body', { timeout: 10000 }).should(
    'have.attr',
    'data-nuxt-hydrated',
    'true'
  )
  cy.wait(200)
})

Given('I wait {int} seconds', (seconds: number) => {
  cy.wait(seconds * 1000)
})
Given('I pause the test', () => {
  cy.pause()
})
