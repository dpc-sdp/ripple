import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the sidebar social share links should display as follows',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('[data-sidebar-component-id="tide-sidebar-social-share"]').within(
      () => {
        cy.get('.rpl-social-share-link').as('links')
      }
    )

    table.forEach((row) => {
      cy.get('@links')
        .contains(row.link)
        .should(row.visible === 'true' ? 'exist' : 'not.exist')
    })
  }
)

Then(
  'the sidebar social share email link should contain',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('[data-sidebar-component-id="tide-sidebar-social-share"] a')
      .contains('Email')
      .parent()
      .invoke('attr', 'href')
      .then((href) => {
        const url = new URLSearchParams(href.replace('mailto:?', ''))

        table.forEach((row) => {
          expect(url.get(row.key)).to.contain(row.value)
        })
      })
  }
)
