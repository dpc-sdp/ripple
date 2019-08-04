/* global cy */

import { Then, Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have created a grant page with the fixture {string}`, (fixture) => {
  cy.csvFixture(fixture).as('pageData')
  cy.get('@pageData').then(data => {
    cy.task('createGrantPage', data).then((nodeId) => {
      cy.wrap(nodeId).as('nodeId')
    })
  })
})

Then(`the grant overview title should match test data`, () => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-grants-overview__list .rpl-list__title .rpl-list__title-inner')
      .should('contain', pageData.grantDetailsOverviewTitle)
  })
})

Then(`the grant overview title should be {string}`, (title) => {
  cy.get('.rpl-grants-overview__list .rpl-list__title .rpl-list__title-inner')
    .should('contain', title)
})

Then(`the grant overview price should be {string}`, (price) => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-grants-overview__list .rpl-list__list-item:nth-child(1) .rpl-list__text')
      .should('contain', price)
  })
})

Then(`the grant overview description should match test data`, () => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-grants-overview__description .rpl-markup__inner')
      .should('contain', pageData.grantDetailsOverviewDescription.replace(/(\r\n|\n|\r)/gm, ''))
  })
})

Then(`the grant overview audience should be {string}`, (audience) => {
  cy.get(':nth-child(2) > .rpl-list__text')
    .should('contain', audience)
})

Then(`the grant overview open status is {string}`, (status) => {
  cy.get(':nth-child(3) > .rpl-list__text')
    .should('contain', status)
})

Then(`the timeline section title should match test data`, () => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-timeline__title')
      .should('contain', pageData.grantTimelineTitle)
  })
})

Then(`the timeline item title should match test data`, () => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-timeline__item-title')
      .should('contain', pageData.grantTimelineItem1Title)
  })
})

Then(`the timeline item description should match test data`, (title) => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-timeline__item-description')
      .should('contain', pageData.grantTimelineItem1Summary)
  })
})

Then(`the timeline item date should be {string}`, (date) => {
  cy.get('.rpl-timeline__item-subtitle').should('contain', date)
})

Then(`the grant overview price should be {string}`, (title) => {
  cy.get('.rpl-grants-overview__list .rpl-list__title .rpl-list__title-inner')
    .should('contain', title)
})

Then(`the timeline title should be set`, () => {
  cy.get('@pageData').then(pageData => {
    cy.get('.rpl-timeline__title')
      .should('contain', pageData.grantTimeline.title)
  })
})

Then(`the grant guideline section title should be {string}`, (title) => {
  cy.get('.tide-guidelines__title').should('contain', title)
})

Then(`the grant guideline should have the following accordions`, (dataTable) => {
  const titles = dataTable.rawTable.map(itm => itm[0].replace(/['"]+/g, ''))
  cy.get('.tide-guidelines .rpl-accordion__list .rpl-accordion__list-item').each(($el) => {
    const title = $el.find('.rpl-accordion__button-text').text()
    expect(titles.includes(title)).to.be.true // eslint-disable-line
  })
})
