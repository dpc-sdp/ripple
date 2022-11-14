import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'a search banner with ID {string} should exist with the placeholder {string}',
  (id: string, placeholder: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageSearchBanner'
    )
    cy.get('@component').within(() => {
      cy.get('input').should('have.attr', 'placeholder', placeholder)
    })
  }
)

Then(
  'in a search banner with ID {string}, searching for {string} should take me to {string}',
  (id: string, query: string, destination: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageSearchBanner'
    )
    cy.get('@component').within(() => {
      cy.get('input').type(query)
      cy.get('button[type="submit"]').click()
    })

    cy.location('search').should('eq', destination)
  }
)
