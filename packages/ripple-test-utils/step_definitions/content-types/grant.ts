import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the overview should display a status of {string} with a {string} {string} icon',
  (status: string, colour: string, icon: string) => {
    cy.get('.tide-grant__overview-item .rpl-list__label')
      .contains(status)
      .closest('.tide-grant__overview-item')
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
  cy.get('.tide-grant__overview-item .rpl-list__label').contains(funding)
})

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
