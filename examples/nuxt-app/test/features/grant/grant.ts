import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="title"]').should('have.text', title)
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

When(
  'I click the open all button on accordion with ID {string}',
  (id: string) => {
    cy.get(`[id="${id}"]`).contains('Open all').click()
  }
)

Then(
  'all accordion items in accordion ID {string} should be visible',
  (id: string) => {
    cy.get(`[id="${id}"]`)
      .find('li > button')
      .each(($btn) => {
        cy.wrap($btn).should('have.attr', 'aria-expanded', 'true')
      })
    cy.get(`[id="${id}"]`)
      .find('.rpl-accordion__item-content')
      .each(($el) => {
        cy.wrap($el).should('be.visible')
      })
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
