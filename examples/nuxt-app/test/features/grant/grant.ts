import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

Then('the title should be {string}', (title: string) => {
  cy.get('.rpl-header__title').should('have.text', title)
})

Then('the {string} should be visible', (section: string) => {
  if (section.toLowerCase() === 'header') {
    cy.get('.rpl-nav-primary').should('be.visible')
  } else {
    cy.get(`.rpl-${section}`).should('be.visible')
  }
})

Then(
  'the overview should display a status of {string} with a {string} {string} icon',
  (status: string, colour: string, icon: string) => {
    cy.get('.tide-grant__overview-item--status').as('status')

    cy.get('@status').find('.rpl-list__label').should('have.text', status)

    // icon type
    cy.get('@status')
      .find('.rpl-icon')
      .should('have.class', `rpl-icon--icon-${icon}-circle-filled`)

    // icon colour
    if (colour.toLowerCase() === 'red') {
      cy.get('@status')
        .find('.rpl-icon')
        .should('have.class', 'rpl-icon--colour-error')
    }
    if (colour.toLowerCase() === 'green') {
      cy.get('@status')
        .find('.rpl-icon')
        .should('have.class', 'rpl-icon--colour-success')
    }
  }
)

Then('the overview should display funding of {string}', (funding: string) => {
  cy.get('.tide-grant__overview-item--funding').should('have.text', funding)
})

Then('the overview description is visible', () => {
  cy.get('.tide-grant__overview-item--description').should('be.visible')
})

Then('the overview link is visible', () => {
  cy.get('.tide-grant__overview-item--link').should('be.visible')
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
    cy.get('.tide-grant__documents li:first-of-type').as('document')
    cy.get('@document').find('.rpl-document__name').should('have.text', title)
    cy.get('@document').find('.rpl-file__meta').should('include.text', size)
  }
)
