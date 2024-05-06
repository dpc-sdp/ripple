import { When, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given(`I am using a {string} device`, (deviceString: any) => {
  cy.viewport(deviceString)
})

When('I visit the page {string}', (route: string) => {
  cy.visit(route, { failOnStatusCode: false })
  cy.get('body', { timeout: 20000 }).should(
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

When('I click the primary nav button labelled {string}', (label: string) => {
  cy.get('.rpl-primary-nav__nav-bar-action')
    .contains(label)
    .click({ force: true })
})

Then('I submit the primary nav search form', () => {
  cy.get('.rpl-primary-nav .rpl-search-bar').submit()
})

Then('the current path should be {string}', (path: string) => {
  cy.location().should((loc) => {
    expect(path).to.eq(loc.pathname)
  })
})
