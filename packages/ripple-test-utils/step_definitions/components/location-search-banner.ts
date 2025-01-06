import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the location search banner should have the following content',
  (dataTable: DataTable) => {
    const data = dataTable.hashes()[0]

    cy.get(`[data-component-type="TideLandingPageMapSearchBanner"]`).as(
      'component'
    )
    cy.get(`@component`).should('contain', data.description)
    cy.get('@component').within(() => {
      cy.get(`h2`).should('have.text', data.title)
      cy.get(`img`).should('have.attr', 'src', data.image)
      cy.get(`input`).should('have.attr', 'placeholder', data.placeholder)
    })
  }
)
