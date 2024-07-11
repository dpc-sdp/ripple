import { DataTable, Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import { set } from 'lodash-es'

Then(
  'the site header background color should be {string}',
  (colour: string) => {
    cy.get(`.rpl-primary-nav__inner`).should(
      'have.css',
      'background-color',
      colour
    )
  }
)

Then(
  'the site footer should have the {string} theme applied',
  (theme: string) => {
    cy.get(`[data-component-type="site-footer"]`).should(
      'have.class',
      `rpl-footer--${theme}`
    )
  }
)
Then(
  'ripple buttons should have the {string} theme applied',
  (theme: string) => {
    cy.get(`.rpl-button`).should('have.class', `rpl-button--${theme}`)
  }
)
Then(
  'the hero banner should have the {string} theme applied',
  (theme: string) => {
    cy.get(`.rpl-header`).should('have.class', `rpl-header--${theme}`)
  }
)

Then('the vic.gov.au logo should be displayed', () => {
  cy.get(`[aria-label="Victoria government logo"]`).should('exist')
})
Then('the vic.gov.au logo should not be displayed', () => {
  cy.get(`[aria-label="Victoria government logo"]`).should('not.exist')
})
Then('the footer vic.gov.au logo should be displayed', () => {
  cy.get(`.rpl-footer-vic-gov-logo`).should('exist')
})
Then('the footer vic.gov.au logo should not be displayed', () => {
  cy.get(`.rpl-footer-vic-gov-logo`).should('not.exist')
})
Then('the cobrand logo should be displayed', () => {
  cy.get('.rpl-primary-nav__secondary-logo-image').should('exist')
})

Given(
  'the site sections primary colour is set to {string}',
  (value: string) => {
    cy.get('@pageFixture').then((response) => {
      set(response, 'siteSection.siteOverrides.theme["rpl-clr-primary"]', value)
    })
  }
)

Then(
  'the site should include the following meta tags',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row) => {
      cy.get(`meta[name="${row.name}"]`).should(
        'have.attr',
        'content',
        row.value
      )
    })
  }
)

Then(
  'the site should include the following link tags',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row) => {
      cy.get(`link[rel="${row.name}"]`).should('have.attr', 'href', row.value)
    })
  }
)

Then(
  'the sites manifest should include the following details',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('link[rel="manifest"]')
      .invoke('attr', 'href')
      .then((href) => {
        const manifest = JSON.parse(decodeURIComponent(href.split(',')[1]))
        cy.wrap(manifest).as('manifest')
      })

    table.forEach((row) => {
      cy.get('@manifest').should('include', {
        [row.key]: row.value
      })
    })
  }
)

Then(
  'the sites manifest should include the following icons',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('link[rel="manifest"]')
      .invoke('attr', 'href')
      .then((href) => {
        const manifest = JSON.parse(decodeURIComponent(href.split(',')[1]))
        cy.wrap(manifest).as('manifest')
      })

    table.forEach((row) => {
      cy.get('@manifest').its('icons').should('deep.include', {
        src: row.url,
        sizes: row.sizes
      })
    })
  }
)
