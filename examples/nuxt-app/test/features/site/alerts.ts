import {
  DataTable,
  Then,
  Given,
  When
} from '@badeball/cypress-cucumber-preprocessor'

Given(
  `the 'dismissed alert cookie' has been set with the following ids`,
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    const ids = table.map((row) => row.id)

    cy.setCookie('dismissedAlerts', JSON.stringify(ids))
  }
)

Then(
  `the 'dismissed alert cookie' should be set with the following ids`,
  (dataTable: DataTable) => {
    const table = dataTable.hashes()
    const ids = table.map((row) => row.id)
    cy.getCookie('dismissedAlerts').should(
      'have.property',
      'value',
      encodeURIComponent(JSON.stringify(ids))
    )
  }
)

When(`the user dismisses the alert with ID {string}`, (id: string) => {
  cy.get(`[data-alert-id="${id}"]`).within(() => {
    cy.get('[data-cy="dismiss"]').click()
  })
})

Then(
  'the following alerts should be displayed in this order',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-cy="alerts-container"]`).as('alertsContainer')

    cy.get('@alertsContainer').within(() => {
      cy.get(`[data-cy="alert"]`).as('alerts')
    })

    cy.get('@alerts').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@alerts')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item')
            .should('contain', row.title)
            .should('have.class', `rpl-alert--${row.variant}`)
          cy.get('@item')
            .find('.rpl-icon')
            .should('have.class', `rpl-icon--${row.icon}`)
          cy.get('@item')
            .find('.rpl-alert__link ')
            .should('contain', row.linkText)
            .should('have.attr', 'href', row.linkUrl)
        })
    })
  }
)

Then(
  'clicking the more details link for the alert with ID {string} should take me to {string}',
  (alertId: string, url: string) => {
    cy.get(`[data-alert-id="${alertId}"]`).within(() => {
      cy.get('.rpl-alert__link').click()
    })

    cy.location('pathname').should('eq', url)
  }
)
