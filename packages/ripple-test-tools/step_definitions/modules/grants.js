/* global cy */

const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`the grant overview title should be {string}`, (title) => {
  cy.get('.rpl-grants-overview__list .rpl-list__title .rpl-list__title-inner')
    .should('contain', title)
})

Then(`the grant overview price should be {string}`, (price) => {
  cy.get('.rpl-grants-overview__list .rpl-list__list-item:nth-child(1) .rpl-list__text')
    .should('contain', price)
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

Then(`the timeline item date should be {string}`, (date) => {
  cy.get('.rpl-timeline__item-subtitle').should('contain', date)
})

Then(`the grant overview price should be {string}`, (title) => {
  cy.get('.rpl-grants-overview__list .rpl-list__title .rpl-list__title-inner')
    .should('contain', title)
})

Then(`the grant guideline section title should be {string}`, (title) => {
  cy.get('.tide-guidelines__title').should('contain', title)
})

Then(`the grant guideline should have the following accordions`, (dataTable) => {
  dataTable.hashes().forEach((expected, index) => {
    cy.get(`.tide-guidelines .rpl-accordion__list .rpl-accordion__list-item`)
      .eq(index)
      .as('item')

    if (expected.title) {
      cy.get('@item').find('.rpl-accordion__button-text').invoke('text').should('equal', expected.title)
    }
    if (expected.content) {
      cy.get('@item').find('.rpl-markup__inner').invoke('text').should('equal', expected.content)
    }
  })
})

Then(`the grant guideline with title {string} opens when clicked`, (title) => {
  cy.get(`.tide-guidelines .rpl-accordion__list .rpl-accordion__list-item`)
    .contains(title)
    .click()
    .closest('.rpl-accordion__list-item')
    .find('.rpl-accordion__content')
    .should('be.visible')
})
