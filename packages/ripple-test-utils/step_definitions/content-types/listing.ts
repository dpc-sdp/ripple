import { Then, When, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the search listing page should have {int} results',
  (resultCount: number) => {
    cy.get(`[data-component-type="search-result"]`).should(
      'have.length',
      resultCount
    )
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
  'the URL should reflect that the current sort option is {string}',
  (sortId: string) => {
    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)
      expect(params.get('sort')).to.eq(`${sortId}`)
    })
  }
)

Then(
  'the URL should reflect that the current search term is {string}',
  (searchTerm: string) => {
    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)

      if (searchTerm === '') {
        expect(params.get('q')).to.not.be.ok // should be falsey
      } else {
        expect(params.get('q')).to.eq(`${searchTerm}`)
      }
    })
  }
)

Then(
  'the URL should reflect that the current active filters are as follows:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)

      table.forEach((row) => {
        const actualValue = params.get(row.id)

        if (!row.value) {
          expect(actualValue).to.not.be.ok // should be falsey
        } else {
          expect(actualValue).to.eq(row.value)
        }
      })
    })
  }
)

Then(
  'the search listing results should have following items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row, i: number) => {
      cy.get(`[data-component-type="search-result"]`)
        .eq(i)
        .then((item) => {
          cy.log(item)
          cy.wrap(item).should('contain', row.title)

          if (row.url) {
            cy.wrap(item).find('a').should('have.attr', 'href', row.url)
          }

          if (row.content) {
            cy.wrap(item).should('contain', row.content)
          }
        })
    })
  }
)

When(`I type {string} into the search input`, (inputStr: string) => {
  cy.get(`[id="tide-search-bar"]`).type(`${inputStr}`)
})

Then(`the search input should have the value {string}`, (inputStr: string) => {
  cy.get(`[id="tide-search-bar"]`).should(`have.value`, inputStr)
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

Then(
  `the search listing dropdown field labelled {string} should have the value {string}`,
  (label: string, value: string) => {
    cy.get(`label`)
      .contains(label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).as('selectedDropdown')
        cy.get('@selectedDropdown').should('have.text', value)
      })
  }
)

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

When(`I toggle the search listing filters section`, () => {
  cy.get(`button`).contains('Refine search').as('refineBtn')
  cy.wait(300)
  cy.get('@refineBtn').click()
})

When(`I clear the search filters`, () => {
  cy.get(`button`).contains('Clear search filters').click()
})

Then(
  'the filters toggle should show {int} applied filters',
  (filterCount: number) => {
    if (filterCount === 0) {
      cy.get(`button`)
        .contains('Refine search')
        .should(($div) => {
          expect($div.text().trim()).equal(`Refine search`)
        })
    } else {
      cy.get(`button`)
        .contains('Refine search')
        .should(($div) => {
          expect($div.text().trim()).equal(`Refine search (${filterCount})`)
        })
    }
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

Then(
  'the {string} pagination link should have an aria-label {string}',
  (label: string, text: string) => {
    cy.get('.rpl-pagination__link')
      .contains(label)
      .should('have.attr', 'aria-label', text)
  }
)

Then(
  'the {string} complex pagination link should have an aria-label {string}',
  (label: string, text: string) => {
    cy.get('.rpl-pagination__page')
      .contains(label)
      .parent()
      .should('have.attr', 'aria-label', text)
  }
)

Then('the sort dropdown should be visible', () => {
  cy.get(`#search-listing-sort-options`).should('exist')
})

Then('the sort dropdown should not be visible', () => {
  cy.get(`#search-listing-sort-options`).should('not.exist')
})

Then(
  'the sort dropdown should have the {string} option selected',
  (option: string) => {
    cy.get(`#search-listing-sort-options`).should('contain', option)
  }
)

Then('the search form should be hidden', () => {
  cy.get(`.tide-search-header`).should('not.exist')
})
