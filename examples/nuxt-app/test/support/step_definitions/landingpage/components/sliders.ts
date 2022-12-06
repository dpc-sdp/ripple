import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

When(
  'I click the button {string} on the component with ID {string}',
  (label: string, id: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`button`).contains(label).click()
    })
  }
)

Then(
  'the active slide on {string} should be {string}',
  (id: string, index: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`.swiper-slide-active:nth-child(${index})`)
        .should('have.attr', 'class')
        .and('contain', 'swiper-slide-active')
    })
  }
)

Then(
  'the pagination button {string} on {string} should be disabled',
  (label: string, id: string) => {
    cy.get(`[data-component-id="${id}"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`button`).contains(label).should('have.attr', 'disabled')
    })
  }
)
