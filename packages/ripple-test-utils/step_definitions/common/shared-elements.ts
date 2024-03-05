import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then('the page title should be {string}', (title: string) => {
  cy.title().should('equal', title)
})

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

Then(
  'the breadcrumbs should have the following items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-cy="breadcrumbs"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(`.rpl-breadcrumbs__item`).as('items')
    })

    cy.get('@items').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)

          // Last item is just text
          if (row.url) {
            cy.get('@item').find('a').should('have.attr', 'href', row.url)
          }
        })
    })
  }
)

Then('the breadcrumbs should not exist', () => {
  cy.get(`[data-cy="breadcrumbs"]`).should('not.exist')
})

Then(
  'the last updated date text should read {string}',
  (updatedDateText: string) => {
    cy.get(`[data-cy="updated-date"]`).should('contain', updatedDateText)
  }
)

Then('the last updated date should not be displayed', () => {
  cy.get(`[data-cy="updated-date"]`).should('not.exist')
})

Then(
  'the page should have the following topic tags',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-cy="topic-tags"]`).within(() => {
      cy.get(`a`).as('tags')
    })

    cy.get('@tags').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@tags')
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
  'the footer nav section with title {string} should have the following links',
  (sectionTitle: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-footer-nav-section`)
      .contains('h3', sectionTitle)
      .as('sectionTitle')

    cy.get('@sectionTitle')
      .closest('.rpl-footer-nav-section')
      .within(() => {
        cy.get(`.rpl-list__item`).as('items')
      })

    cy.get('@items').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
        })
    })
  }
)
Then(
  'the footer nav should have the following single level items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-footer-nav-section__title`).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
          cy.get('@item')
            .parents('.rpl-footer-nav-section')
            .find('.rpl-list__items')
            .should('not.exist')
        })
    })
  }
)

Then('the footer should have the following links', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get(`.rpl-footer-core-links`).as('component')

  cy.get('@component').within(() => {
    cy.get(`li`).as('items')
  })

  cy.get('@items').should('have.length', table.length)

  table.forEach((row, i: number) => {
    cy.get('@items')
      .eq(i)
      .then((item) => {
        cy.wrap(item).as('item')
        cy.get('@item').should('contain', row.text)
        cy.get('@item').find('a').should('have.attr', 'href', row.url)
      })
  })
})

Then(
  'the footer copyright text should be {string}',
  (copyrightText: string) => {
    cy.get(`[data-cy="footer-copyright"]`).should('contain', copyrightText)
  }
)

Then(
  'the footer acknowledgement text should be {string}',
  (copyrightText: string) => {
    cy.get(`[data-component-type="site-footer"]`).as('footer')

    cy.get('@footer').within(() => {
      cy.get(`.rpl-acknowledgement`).should('contain', copyrightText)
    })
  }
)

Then('the footer should have the following logos', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get(`.rpl-footer-bottom__branding`).as('component')

  cy.get('@component').within(() => {
    cy.get(`a`).as('logos')
  })

  table.forEach((row, i: number) => {
    cy.get('@logos')
      .eq(i)
      .then((logo) => {
        cy.wrap(logo).as('logo')
        cy.get('@logo').should('have.attr', 'href', row.url)
        cy.get('@logo').find('img').should('have.attr', 'src', row.src)
        cy.get('@logo').find('img').should('have.attr', 'alt', row.alt)
      })
  })
})
