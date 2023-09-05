import { Then, When, DataTable } from '@badeball/cypress-cucumber-preprocessor'

Then(`the custom collection component should have a search input bar`, () => {
  cy.get(`[data-component-type="TideCustomCollection"]`).find('.rpl-search-bar')
})

Then(
  `the custom collection component results count should read {string}`,
  (str: string) => {
    cy.get(`[data-component-type="search-listing-result-count"]`).should(
      'contain',
      str
    )
  }
)

Then(
  'the {string} network request should be made to the elasticsearch endpoint',
  (responseAlias: string) => {
    cy.get(`@${responseAlias}`)
      .its('request.url')
      .should('contain', '/api/tide/elasticsearch')
  }
)

Then(
  `the custom collection component should display the error {string}`,
  (msg: string) => {
    cy.get(`[data-component-type="TideCustomCollection"]`).should(
      'contain',
      msg
    )
  }
)
