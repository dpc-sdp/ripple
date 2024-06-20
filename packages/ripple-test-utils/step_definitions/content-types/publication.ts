import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

When('I visit the print all page {string}', (route: string) => {
  cy.visit(route, {
    failOnStatusCode: false,
    onBeforeLoad: (win) => {
      cy.stub(win, 'print')
    }
  })
  cy.get('body', {
    timeout: 20000
  }).should('have.attr', 'data-nuxt-hydrated', 'true')
  cy.wait(200)
})

Then('the print dialog should be shown', () => {
  cy.window().then((win) => {
    expect(win.print).to.be.calledOnce
  })
})

Then(
  'there should be a page link with a title of {string} and description text of {string}',
  (title: string, desc: string) => {
    cy.get('.rpl-page-links__link-label').contains(title).should('exist')
    cy.get('.rpl-page-links__link-text').contains(desc).should('exist')
  }
)
