import { Given, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Given(
  'a media gallery with ID {string} should exist with the following gallery items',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-component-id="${id}"]`).as('component')
    cy.get('@component').should('exist')
    cy.get(`@component`).should(
      'have.attr',
      'data-component-type',
      'TideLandingPageMediaGallery'
    )

    table.forEach((row, i: number) => {
      cy.get('@component').within(() => {
        cy.get(`[data-cy="gallery-content"]`).as('contentSlider')
        cy.get(`[data-cy="gallery-images"]`).as('imageSlider')

        cy.get('@contentSlider')
          .find('[data-cy="title"]')
          .eq(i)
          .should('have.text', row.title)
        cy.get('@contentSlider')
          .find('[data-cy="caption"]')
          .eq(i)
          .should('have.text', row.caption)
        cy.get('@imageSlider')
          .find(`[data-cy="image"]`)
          .eq(i)
          .should('have.attr', 'src', row.image)
      })
    })
  }
)
