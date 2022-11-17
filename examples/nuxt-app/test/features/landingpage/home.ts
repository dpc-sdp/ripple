import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then('the hero title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

Then('the hero intro text should be {string}', (introText: string) => {
  cy.get('[data-cy="hero-summary"]').should('have.text', introText)
})

Then(
  'the {string} campaign title should be {string}',
  (campaign: string, title: string) => {
    cy.get(`[data-cy="${campaign}-campaign"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`[data-cy="title"]`).should('have.text', title)
    })
  }
)

Then(
  'the {string} campaign summary should be {string}',
  (campaign: string, summary: string) => {
    cy.get(`[data-cy="${campaign}-campaign"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`[data-cy="summary"]`).should('have.text', summary)
    })
  }
)

Then(
  'the {string} campaign image src should be {string}',
  (campaign: string, image: string) => {
    cy.get(`[data-cy="${campaign}-campaign"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`[data-cy="image"]`).should('have.attr', 'src', image)
    })
  }
)

Then(
  'the {string} campaign CTA label should be {string}',
  (campaign: string, ctaText: string) => {
    cy.get(`[data-cy="${campaign}-campaign"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`[data-cy="cta"]`).should('have.text', ctaText)
    })
  }
)

Then(
  'clicking the {string} campaign CTA should take me to {string}',
  (campaign: string, url: string) => {
    cy.get(`[data-cy="${campaign}-campaign"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`[data-cy="cta"]`).click()
    })

    cy.location('pathname').should('eq', url)
  }
)

Then(
  'the in page nav should have the following items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-cy="in-page-nav"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`a`).as('links')
    })

    table.forEach((row, i: number) => {
      cy.get('@links')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').should('have.attr', 'href', row.url)
        })
    })
  }
)

Then('the hero acknowledgement of country should exist on the page', () => {
  cy.get(`[data-cy="hero-ack"]`).should(
    'contain',
    'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.'
  )
})
