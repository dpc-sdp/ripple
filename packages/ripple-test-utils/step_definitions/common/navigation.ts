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

Given('I wait {int} milliseconds', (ms: number) => {
  cy.wait(ms)
})

Given('I pause the test', () => {
  cy.pause()
})

When(
  'the primary nav should include the user action {string} {string}',
  (label: string, href: string) => {
    cy.get('.rpl-primary-nav__nav-bar-user-action')
      .contains(label)
      .should('have.attr', 'href', href)
  }
)

When('I click the primary nav button labelled {string}', (label: string) => {
  cy.get('.rpl-primary-nav__nav-bar-actions-list :is(button, a)')
    .contains(label)
    .click({ force: true })
})

Then('I type {string} into the primary nav search box', (text: string) => {
  cy.get('#primary-nav-search').type(text)
})

Then('the primary nav search should be hidden', () => {
  cy.get('.rpl-primary-nav__nav-bar-action')
    .contains('Search')
    .should('not.exist')
})

Then('I submit the primary nav search form', () => {
  cy.get('.rpl-primary-nav .rpl-search-bar').submit()
})

Then('the current path should be {string}', (path: string) => {
  cy.location().should((loc) => {
    expect(path).to.eq(loc.pathname)
  })
})

Then('the current query string should include {string}', (path: string) => {
  cy.location().should((loc) => {
    expect(path).to.contain(loc.search)
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

When(`I click on the {string} page link`, (label: string) => {
  cy.get(`.rpl-page-links__link`).contains(`${label}`).click()
})

Then('I scroll {int} pixels', (pixels: number) => {
  cy.scrollTo(0, pixels)
})

Then('I click the back to top button', () => {
  cy.get('.rpl-back-to-top__button').click()
})

Then('I navigate back', () => {
  cy.go('back')
})

Then('I navigate forward', () => {
  cy.go('forward')
})
