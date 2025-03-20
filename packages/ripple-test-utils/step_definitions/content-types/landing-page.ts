import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then('the landing page component with ID {int} should exist', (id: number) => {
  cy.get(`[data-component-id="${id}"]`).should('exist')
})

Then('the landing page component {string} should exist', (type: string) => {
  cy.get(`[data-component-type="${type}"]`).should('exist')
})

Then('the sidebar component with ID {string} should exist', (id: string) => {
  cy.get(`[data-sidebar-component-id="${id}"]`).should('exist')
})

Then(
  'the sidebar component with ID {string} should not exist',
  (id: string) => {
    cy.get(`[data-sidebar-component-id="${id}"]`).should('not.exist')
  }
)

Then('the hero title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

Then('the hero intro text should be {string}', (introText: string) => {
  cy.get('[data-cy="hero-summary"]').should('have.text', introText)
})

Then('the hero logo should be {string}', (image: string) => {
  cy.get(`.rpl-header__logo`).should('have.attr', 'src').and('contain', image)
})

Then('the hero should display the following items', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get(`.rpl-header-links__list a`).as('links')

  table.forEach((row, i: number) => {
    cy.get('@links')
      .eq(i)
      .then((item) => {
        cy.wrap(item).as('item')
        cy.get('@item').should('contain', row.text)
        cy.get('@item').should('have.attr', 'href', row.url)
      })
  })
})

Then('the hero top corner graphic should be {string}', (image: string) => {
  if (image === 'default') {
    cy.get(`.rpl-header-graphic--top svg`).should('exist')
  } else {
    cy.get(`.rpl-header-graphic--top img`)
      .should('have.attr', 'src')
      .and('contain', image)
  }
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
      cy.get(`[data-cy="image"]`)
        .should('have.attr', 'srcset')
        .and('contain', image)
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

Then(
  'the hero acknowledgement of country should exist on the page and read {string}',
  (message: string) => {
    cy.get(`[data-cy="hero-ack"]`).should('contain', message)
  }
)
