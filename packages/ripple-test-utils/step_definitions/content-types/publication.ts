import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor'

When('I visit the print all page {string}', (route: string) => {
  cy.visit(route, {
    failOnStatusCode: false,
    onBeforeLoad: (win) => {
      cy.stub(win, 'print')
    }
  })
  cy.get('body', {
    timeout: 20000
  }).should('have.attr', 'data-nuxt-hydrated', 'true')
  cy.wait(200)
})

Then('the print dialog should be shown', () => {
  cy.window().then((win) => {
    expect(win.print).to.be.calledOnce
  })
})

Then('the print document link should be hidden', () => {
  cy.get('.tide-publication__actions-print').should('not.exist')
})

Then('the print document link should visible', () => {
  cy.get('.tide-publication__actions-print').should('exist')
})

Then(
  'there should be a page link with a title of {string} and description text of {string}',
  (title: string, desc: string) => {
    cy.get('.rpl-page-links__link-label').contains(title).should('exist')
    cy.get('.rpl-page-links__link-text').contains(desc).should('exist')
  }
)

Then(
  'the publication details should include the following items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.tide-publication__details dt`).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          cy.get('@item').contains(row.term)
          cy.get('@item').next('dd').contains(row.description)
        })
    })
  }
)

Then(
  'the publication should display the following chapters',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.tide-publication__chapters li`).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          cy.get('@item').find('a').as('link')
          cy.get('@link').contains(row.title)
          cy.get('@link').should('have.attr', 'href', row.url)
          cy.get('@item')
            .find('.rpl-card__content')
            .should('have.text', row.content)
        })
    })
  }
)

Then('the publication nav should have {int} links', (num: number) => {
  cy.get(`.tide-publication__sidebar-nav li`).should('have.length', num)
})

Then(
  'the publication nav should include the following links',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.tide-publication__sidebar-nav li`).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          cy.get('@item').find('a').as('link')
          cy.get('@link').contains(row.title)
          cy.get('@link').should('have.attr', 'href', row.url)
        })
    })
  }
)

Then('the publication nav should not exist', () => {
  cy.get(`.tide-publication__sidebar-nav`).should('not.exist')
})

Then(
  'the publication should display the following documents',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.tide-publication__sidebar .rpl-document`).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          cy.get('@item').find('a').as('link')
          cy.get('@link').contains(row.title)
          cy.get('@link')
            .should('have.attr', 'href')
            .then((href) => {
              expect(href).to.contain(row.url)
            })

          if (row.type) {
            cy.get('@item').find('.rpl-file__meta').contains(row.type)
          }

          if (row.size) {
            cy.get('@item').find('.rpl-file__meta').contains(row.size)
          }
        })
    })
  }
)
