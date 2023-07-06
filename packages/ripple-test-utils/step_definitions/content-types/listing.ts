import { Then, When, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the search listing page should have {int} results',
  (resultCount: number) => {
    cy.get(`.rpl-result-listing-item`).should('have.length', resultCount)
  }
)

Then('the search listing layout should be {string}', (layout: string) => {
  cy.get(`[data-component-type="search-listing-layout-${layout}"]`).should(
    'exist'
  )
})

Then(
  'the results counter should show {int} to {int} of {int} results',
  (start: number, end: number, total: number) => {
    cy.get('[data-component-type="search-listing-result-count"]').should(
      'contain',
      `Displaying ${start}-${end} of ${total} results`
    )
  }
)

Then(
  'the URL should reflect that the current page number is {int}',
  (page: number) => {
    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)
      expect(params.get('page')).to.eq(`${page}`)
    })
  }
)

Then(
  'the search listing results should have following items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-result-listing-item`).as('result')

    table.forEach((row, i: number) => {
      cy.get('@result')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)

          if (row.url) {
            cy.get('@item').find('a').should('have.attr', 'href', row.url)
          }

          if (row.content) {
            cy.get('@item').should('contain', row.content)
          }
        })
    })
  }
)

When(`I type {string} into the search input`, (inputStr: string) => {
  cy.get(`[id="tide-search-bar"]`).type(`${inputStr}`)
})

When(`I clear the search input`, () => {
  cy.get(`[id="tide-search-bar"]`).clear()
})

When(`I click the search button`, () => {
  cy.get(`.rpl-search-bar button[type="submit"]`).click()
})

When(`I click on page {int} in the pagination controls`, (page: string) => {
  cy.get(`.rpl-pagination__page`).contains(`${page}`).click()
})

When(`I click 'next' in the pagination controls`, () => {
  cy.get(`.rpl-pagination__link`).contains(`Next`).click()
})

When(`I click 'previous' in the pagination controls`, () => {
  cy.get(`.rpl-pagination__link`).contains(`Previous`).click()
})

Then(
  'the no results message should show with the search term {string}',
  (searchTerm: string) => {
    cy.get(`[data-component-type="search-listing-no-results"]`).should('exist')
    cy.get(`[data-component-type="search-listing-no-results"]`).should(
      'contain',
      searchTerm
    )
  }
)

Then('the search error message should be displayed', () => {
  cy.get(`[data-component-type="search-listing-error"]`).should('exist')
  cy.get(`[data-component-type="search-listing-error"]`).should(
    'contain',
    'Sorry! Something went wrong. Please try again later.'
  )
})

When(
  `I click the search listing dropdown field labelled {string}`,
  (label: string) => {
    cy.get(`label`)
      .contains(label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).as('selectedDropdown').click()
      })
  }
)

Then(
  `the selected dropdown field should have the items:`,
  (dataTable: DataTable) => {
    const table = dataTable.raw()
    cy.get(`@selectedDropdown`)
      .siblings('[role="listbox"]')
      .find('[role="option"]')
      .as('selectedDropdownOptions')

    table.forEach((row, i: number) => {
      cy.get('@selectedDropdownOptions')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row[0])
        })
    })
  }
)
