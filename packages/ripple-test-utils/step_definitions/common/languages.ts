import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  `the section {string} should be display {string} in {string} with the font {string}`,
  (selector: string, direction: string, language: string, font: string) => {
    cy.get(selector).as('section')

    cy.get('@section').should('have.class', `rpl-u-font-lang--${language}`)
    cy.get('@section').should('have.attr', 'dir', direction)

    cy.document().then((doc) => {
      cy.wrap(doc.fonts).invoke('check', `16px ${font}`).should('be.true')
    })
  }
)
