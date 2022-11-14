import {
  When,
  Then,
  Before,
  After
} from '@badeball/cypress-cucumber-preprocessor'

Before({ tags: '@mockserver' }, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

After({ tags: '@mockserver' }, () => {
  cy.log('the mock server has stopped')
  cy.task('stopMockServer')
})

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

Then(
  'the overview should display a status of {string} with a {string} {string} icon',
  (status: string, colour: string, icon: string) => {
    cy.get('[data-cy="statusText"]').should('have.text', status)

    // icon type
    cy.get('[data-cy="statusIcon"]').should(
      'have.class',
      `rpl-icon--icon-${icon}-circle-filled`
    )

    // icon colour
    if (colour.toLowerCase() === 'red') {
      cy.get('[data-cy="statusIcon"]').should(
        'have.class',
        'rpl-icon--colour-error'
      )
    }
    if (colour.toLowerCase() === 'green') {
      cy.get('[data-cy="statusIcon"]').should(
        'have.class',
        'rpl-icon--colour-success'
      )
    }
  }
)

Then('the overview should display funding of {string}', (funding: string) => {
  cy.get('[data-cy="funding"]').should('have.text', funding)
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
    cy.get('[data-cy="document"]:first-of-type').as('document')
    cy.get('@document').find('.rpl-document__name').should('have.text', title)
    cy.get('@document').find('.rpl-file__meta').should('include.text', size)
  }
)
