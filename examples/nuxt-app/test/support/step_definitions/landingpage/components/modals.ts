import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the modal for gallery {string} should be {string}',
  (id: string, state: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      const check = state === 'visible' ? 'be.visible' : 'not.exist'
      cy.get(`[data-cy="modal"]`).should(check)
    })
  }
)
