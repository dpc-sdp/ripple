import {
  Then,
  Given,
  When,
  DataTable
} from '@badeball/cypress-cucumber-preprocessor'

Given('a data table with ID {string}', (id: string) => {
  cy.get(`[data-component-id="${id}"]`).as('component')
  cy.get('@component')
    .should('exist')
    .should('have.attr', 'data-component-type', 'TideLandingPageDataTable')
})

Given('a data table with type {string}', (id: string) => {
  cy.get(`[data-component-type="${id}"]`).as('component')
  cy.get('@component').should('exist')
})

Then(
  'have {int} rows and {int} columns',
  (rowCount: number, colCount: number, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('@component').within(() => {
      cy.get(`table tr`).as('rows')
    })

    cy.get('@rows').should('have.length', rowCount)

    table.forEach((row, i: number) => {
      cy.get('@rows')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find(row.type).as('cell')
          cy.get('@cell').should('have.length', colCount)
          cy.get('@cell').eq(0).should('contain', row['cell-one'])
          cy.get('@cell').eq(1).should('contain', row['cell-two'])
          cy.get('@cell').eq(2).should('contain', row['cell-three'])
        })
    })
  }
)

Then('it should have a heading', () => {
  cy.get('@component').within(() => {
    cy.get('table thead tr').should('exist')
  })
})

Then('it should have no heading', () => {
  cy.get('@component').within(() => {
    cy.get('table thead').should('satisfy', ($el) => {
      return !$el.length || !$el.is(':visible')
    })
  })
})

Then('the table should have the caption {string}', (text: string) => {
  cy.get('@component').within(() => {
    cy.get('caption').contains(text)
  })
})

Then('the table should have the footer {string}', (text: string) => {
  cy.get('@component').within(() => {
    cy.get('tfoot').contains(text)
  })
})

When('I toggle the tables extra content row', () => {
  cy.get('@component').within(() => {
    cy.get('.rpl-data-table-toggle').first().click()
  })
})

Then('the table should not display extra content', () => {
  cy.get('@component').within(() => {
    cy.get('.rpl-data-table-toggle').should('not.exist')
  })
})

Then('the tables extra content should be visible', () => {
  cy.get('@component').within(() => {
    cy.get('.rpl-data-table__details').should('be.visible')
  })
})

Then('the tables extra content should be hidden', () => {
  cy.get('@component').within(() => {
    cy.get('.rpl-data-table__details').should('not.be.visible')
  })
})

Then(
  'the tables extra content should contain the text {string}',
  (text: string) => {
    cy.get('@component').within(() => {
      cy.get('.rpl-data-table__details-content:visible').contains(text)
    })
  }
)

Then(
  'the table should have the column {string}, with value {string}',
  (label: string, value: string) => {
    cy.get('@component').within(() => {
      cy.get(`td[data-label="${label}"]`).contains(value)
    })
  }
)

Then(
  'the table should have the column {string}, with value {string} and link {string}',
  (label: string, value: string, link: string) => {
    cy.get('@component').within(() => {
      cy.get(`td[data-label="${label}"] a`)
        .contains(value)
        .should('have.attr', 'href', link)
    })
  }
)

Then(
  'the tables extra content should contain the label {string}, value {string} and link {string}',
  (label: string, value: string, link: string) => {
    cy.get('@component').within(() => {
      cy.get('.rpl-data-table__details:visible').as('extraContent')

      cy.get('@extraContent')
        .find('.tide-search-listing-table-label-value__label')
        .contains(label)
      cy.get('@extraContent')
        .find('.tide-search-listing-table-label-value__value a')
        .contains(value)
        .should('have.attr', 'href', link)
    })
  }
)

Then(
  'the tables extra content should contain the label {string} and text {string}',
  (label: string, text: string) => {
    cy.get('@component').within(() => {
      cy.get('.rpl-data-table__details:visible').as('extraContent')

      cy.get('@extraContent')
        .find('.tide-search-listing-table-label-value__label')
        .contains(label)
      cy.get('@extraContent')
        .find('.tide-search-listing-table-label-value__value')
        .contains(text)
    })
  }
)

Then(
  'the tables extra content should contain the class {string}',
  (selector: string) => {
    cy.get('@component').within(() => {
      cy.get(`.${selector}`).should('exist')
    })
  }
)

Then(
  'the table row with text {string} should not display more information',
  (text: string) => {
    cy.get('@component').within(() => {
      cy.get('.rpl-data-table__row').contains(text).as('tableRow')

      cy.get('@tableRow').find('.rpl-data-table-toggle').should('not.exist')
    })
  }
)

Then('the table should display the following', (dataTable: DataTable) => {
  const table = dataTable.raw()

  cy.get('@component').within(() => {
    table.forEach((row: any, i: number) => {
      cy.get('tr:visible').eq(i).as('row')

      row.forEach((cell: any, j: number) => {
        cy.get('@row').find('th, td').eq(j).contains(cell)
      })
    })
  })
})
