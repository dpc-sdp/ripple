import {
  When,
  Given,
  Then,
  DataTable
} from '@badeball/cypress-cucumber-preprocessor'

Given(`I am using a {string} device`, (deviceString: any) => {
  cy.viewport(deviceString)
})

When('I visit the page {string}', (route: string) => {
  cy.visit(route, { failOnStatusCode: false })
  cy.get('body', { timeout: 20000 }).should(
    'have.attr',
    'data-nuxt-hydrated',
    'true'
  )
  cy.wait(200)
})

Given('I wait {int} seconds', (seconds: number) => {
  cy.wait(seconds * 1000)
})
Given('I pause the test', () => {
  cy.pause()
})

When('I click the primary nav button labelled {string}', (label: string) => {
  cy.get('.rpl-primary-nav__nav-bar-action')
    .contains(label)
    .click({ force: true })
})

Then('I submit the primary nav search form', () => {
  cy.get('.rpl-primary-nav .rpl-search-bar').submit()
})

Then('the current path should be {string}', (path: string) => {
  cy.location().should((loc) => {
    expect(path).to.eq(loc.pathname)
  })
})

Then(
  'the site section nav should display the following',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(
      '[data-sidebar-component-id="tide-sidebar-site-section-nav"]'
    ).within(() => {
      cy.get('.rpl-vertical-nav__list--level-1 > li').as('items')
    })

    table.forEach((row: any, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          if (row.link) {
            cy.get('@item')
              .find('> .rpl-vertical-nav__link')
              .should('have.text', row.text)
          } else {
            cy.get('@item')
              .find('> .rpl-vertical-nav__toggle')
              .should('have.text', row.text)
          }
        })
    })
  }
)

Then(
  'clicking the site section nav item {string} shows the following',
  (text: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('[data-sidebar-component-id="tide-sidebar-site-section-nav"]')
      .contains('.rpl-vertical-nav__toggle', text)
      .as('toggle')

    cy.get('@toggle').click()
    cy.get('@toggle')
      .parent('li')
      .find('.rpl-vertical-nav__list-item-children li:visible')
      .as('items')

    table.forEach((row: any, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')

          if (row.link) {
            cy.get('@item')
              .find('> .rpl-vertical-nav__link')
              .should('have.text', row.text)
          } else {
            cy.get('@item')
              .find('> .rpl-vertical-nav__toggle')
              .should('have.text', row.text)
          }
        })
    })
  }
)
