/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

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
  cy.get('.rpl-grants-overview__list .rpl-list__list-item:nth-child(1) .rpl-list__text')
    .should('contain', price)
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

Then(`the timeline title should be {string}`, (grantTimelineTitle) => {
  cy.get('.rpl-timeline__title')
    .should('contain', grantTimelineTitle)
})

Then(`there should be the following timeline items:`, (dataTable) => {
  dataTable.hashes().forEach((expected, idx) => {
    cy.get('.rpl-timeline__list-item').eq(idx).as('item')
    cy.get('@item').should('be.visible')

    if (expected.image) {
      cy.get('@item')
        .find('.rpl-timeline__item-image')
        .invoke('attr', 'src')
        .should('contains', expected.image)
    }
    if (expected.title) {
      cy.get('@item')
        .find('.rpl-timeline__item-title .rpl-link__inner')
        .invoke('text')
        .should('equal', expected.title)
    }
    if (expected.link) {
      cy.get('@item')
        .find('.rpl-timeline__item-title .rpl-link')
        .invoke('attr', 'href')
        .should('equal', expected.link)
    }
    if (expected.subtitle) {
      cy.get('@item')
        .find('.rpl-timeline__item-subtitle')
        .invoke('text')
        .should('equal', expected.subtitle)
    }
    if (expected.description) {
      cy.get('@item')
        .find('.rpl-timeline__item-description')
        .invoke('text')
        .should('equal', expected.description)
    }
  })
})

Then(`the page should have the following documents:`, (dataTable) => {
  dataTable.hashes().forEach((expected, index) => {
    cy.get(`.rpl-document-link`)
      .eq(index)
      .as('item')

    if (expected.title) {
      cy.get('@item').find('.rpl-document-link__title').invoke('text').should('equal', expected.title)
    }
    if (expected.size) {
      cy.get('@item').find('.rpl-document-link__size').invoke('text').should('equal', expected.size)
    }
    if (expected.type) {
      cy.get('@item').find('.rpl-document-link__type').invoke('text').should('equal', expected.type)
    }
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
