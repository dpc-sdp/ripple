import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import { set } from 'lodash-es'

Then('the html language should be {string}', (language: string) => {
  cy.get('html').should('have.attr', 'lang', language)
})

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

Given('the page language is set to {string}', (language: string) => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'meta.langcode', language)
  })
})
