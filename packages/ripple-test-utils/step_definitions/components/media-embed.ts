import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('a media embed with ID {string} should exist', (id: string) => {
  cy.get(`[data-component-id="${id}"]`).as('component')
  cy.get('@component').should('exist')
  cy.get(`@component`).should(
    'have.attr',
    'data-component-type',
    'TideLandingPageMediaEmbed'
  )
})

Then(
  'I click the action {string} for media embed {string}',
  (label: string, id: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.contains('.rpl-media-embed__action', label).click()
    })
  }
)

Then(
  'I trigger a click for the action {string} on the media embed {string}',
  (label: string, id: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.contains('.rpl-media-embed__action', label).trigger('click')
    })
  }
)

Then(
  'the media embed image for {string} should be {string}',
  (id: string, image: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get('.rpl-media-embed__image').should('have.attr', 'src', image)
    })
  }
)

Then(
  'the extra data for media embed {string} should be visible',
  (id: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get('.rpl-media-embed__view-data-content').should('be.visible')
    })
  }
)

Then(
  'the extra data for media embed {string} should be hidden',
  (id: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get('.rpl-media-embed__view-data-content').should('be.hidden')
    })
  }
)
