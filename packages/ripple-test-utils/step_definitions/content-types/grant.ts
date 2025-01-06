import { Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the overview should display a status of {string} with a {string} {string} icon',
  (status: string, colour: string, icon: string) => {
    cy.get(
      '.tide-grant-meta--block .rpl-list__label, .tide-grant-meta--block .rpl-description-list__description'
    )
      .contains(status)
      .closest('.tide-grant-meta--block')
      .as('item')

    // icon type
    cy.get('@item')
      .find('.rpl-icon')
      .should('have.class', `rpl-icon--icon-${icon}-circle-filled`)

    // icon colour
    if (colour.toLowerCase() === 'red') {
      cy.get('@item')
        .find('.rpl-icon')
        .should('have.class', 'rpl-icon--colour-error')
    }
    if (colour.toLowerCase() === 'green') {
      cy.get('@item')
        .find('.rpl-icon')
        .should('have.class', 'rpl-icon--colour-success')
    }
  }
)

Then('the overview should display funding of {string}', (funding: string) => {
  cy.get(
    '.tide-grant-meta--block .rpl-list__label, .tide-grant-meta--block .rpl-description-list__description'
  ).contains(funding)
})

Then(
  'the overview CTA {string} should link to {string}',
  (text: string, url: string) => {
    cy.contains('.tide-grant__overview-item .rpl-button', text).should(
      'have.attr',
      'href',
      url
    )
  }
)

Then(
  'the first timeline item should have a date of {string}',
  (date: string) => {
    cy.get(
      '.tide-grant__timeline .rpl-timeline__item:first-of-type > .rpl-timeline__item-subtitle'
    ).should('have.text', date)
  }
)

Then(
  'the first document should have a title of {string}, and filesize of {string}',
  (title: string, size: string) => {
    cy.get('.tide-grant__documents .rpl-document:first-of-type').as('document')
    cy.get('@document').find('.rpl-document__name').should('have.text', title)
    cy.get('@document').find('.rpl-file__meta').should('include.text', size)
  }
)

Then(
  'the grant search listing results should have following items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row, i: number) => {
      cy.get('.rpl-result-listing-item')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.title)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
          cy.get('@item').find('.rpl-search-result__details').as('meta')
          cy.get('@meta').should('contain', row.audience)
          cy.get('@meta').should('contain', row.amount)
          cy.get('@meta').should('contain', row.status)
          cy.get('@item').should('contain', row.content)
          if (row.updated) {
            cy.get('@item').should('contain', row.updated)
          }
        })
    })
  }
)
