/* eslint-disable jest/valid-expect */
/* global cy, Cypress */

const { Then, Given, When } = require('cypress-cucumber-preprocessor/steps')

Then(`the search button in the site header should exist`, () => {
  cy.get('.rpl-site-header__btn--search').should('exist')
})

Then(`the search button in the site header should have the text {string}`, (label) => {
  cy.get('.rpl-site-header__btn--search span').should('contain', label)
})

Then(`the search button text in the site header should not be visible`, () => {
  cy.get('.rpl-site-header__btn--search span')
    .should('have.css', 'position', 'absolute')
    .should('have.css', 'width', '1px')
    .should('have.css', 'height', '1px')
})

When(`I click the search button in the site header`, () => {
  cy.get('.rpl-site-header__btn--search').click({ force: true })
})

When(`I type {string} into the site search input and hit enter`, (searchTerm) => {
  cy.get('.rpl-search-form__input').type(searchTerm + '{enter}', { force: true })
})

Then(`the site search box should be visible`, () => {
  cy.get('.rpl-site-header__search-container').should('be.visible')
})

Then(`there should be {string} search results`, (resultsCount) => {
  cy.get('.rpl-search-results__info', { timeout: 10000 })
    .should('contain', `Displaying ${resultsCount} results`)
})

Then(`there should be the following search results:`, (dataTable) => {
  const expectedItems = dataTable.hashes()
  cy.get('.rpl-search-results')
    .get('.rpl-search-results__item')
    .each(($el, index) => {
      cy.wrap($el)
        .find('.rpl-search-result__heading')
        .invoke('text')
        .should('equal', expectedItems.map(item => item.title)[index])

      cy.wrap($el)
        .find('.rpl-search-result__date')
        .invoke('text')
        .should('equal', expectedItems.map(item => item.date)[index])

      cy.wrap($el)
        .find('a.rpl-link')
        .invoke('attr', 'href')
        .should('equal', expectedItems.map(item => item.url)[index])

      cy.wrap($el)
        .find('.rpl-search-result__date-description span:nth-child(2)')
        .invoke('text')
        .should('equal', expectedItems.map(item => item.description)[index])
    })
})

Then(`the site search box should have the placeholder {string}`, (placeholder) => {
  cy.get('.rpl-site-header__search-container .rpl-search-form__input').should('have.attr', 'placeholder', placeholder)
})

Given(`I have mocked the search request with fixture {string} and params {string}`, (fixture, params) => {
  cy.server()
  cy.route('POST', `${Cypress.env('SEARCH_ENDPOINT')}?${params}`, `fixture:${fixture}`).as('siteSearch')
})

Then(`the pagination component should exist`, () => {
  cy.get('.rpl-pagination').should('exist')
})

Then(`the pagination component should not exist`, () => {
  cy.get('.rpl-pagination').should('not.exist')
})

When(`I click the pagination item {int}`, (step) => {
  cy.get('.rpl-pagination__list-item').eq(step - 1).click()
})

Then(`the pagination component should have {int} steps`, (steps) => {
  cy.get('.rpl-pagination__list-item').should('have.length', steps)
})

Then(`page {int} should be active in the pagination component`, (step) => {
  cy.get('.rpl-pagination__list-item').eq(step - 1).should('have.attr', 'aria-current')
  cy.get('.rpl-pagination__list-item').eq(step - 1).should('have.attr', 'aria-disabled')
  cy.get('.rpl-pagination__list-item').eq(step - 1).find('.rpl-pagination__step-current').should('have.attr', 'disabled')
  cy.get('.rpl-pagination__list-item').eq(step - 1).find('span.rpl-pagination__step-label').invoke('text').should('contain', 'current page')
})

Given(`a request is made to the search endpoint with the following:`, dataTable => {
  const options = dataTable.hashes()[0]
  const query = options.query ? `q=${options.query}` : ''
  const from = options.from ? `&from=${options.from}` : ''
  const size = options.size ? `&size=${options.size}` : ''
  cy.log(options)
  cy.request({
    url: `${Cypress.env('SEARCH_ENDPOINT')}?${query}${from}${size}`,
    auth: {
      username: Cypress.env('SEARCH_AUTH_USERNAME'),
      password: Cypress.env('SEARCH_AUTH_PASSWORD')
    }
  }).as('request')
})

Then(`the search request should have a valid response`, () => {
  cy.get('@request').then(response => {
    expect(response).to.have.property('body')
    expect(response.body).to.have.property('hits')
    expect(response.body.hits.hits.length).to.be.greaterThan(0)
    expect(response.body.hits.total).to.be.greaterThan(0)
  })
})
