import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { set } from 'lodash-es'

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

Then(`the custom collection component results count should be hidden`, () => {
  cy.get(`[data-component-type="search-listing-result-count"]`).should(
    'not.exist'
  )
})

Then(
  `the custom collection component should have the {string} form theme applied`,
  (theme: string) => {
    cy.get(`[data-component-type="TideCustomCollection"]`)
      .find(`.tide-search-header--${theme}`)
      .should('exist')
  }
)

Then(
  `the custom collection component should not have the {string} form theme applied`,
  (theme: string) => {
    cy.get(`[data-component-type="TideCustomCollection"]`)
      .find(`.tide-search-header--${theme}`)
      .should('not.exist')
  }
)

Then(
  `the custom collection search bar field should have the {string} variant applied`,
  (theme: string) => {
    cy.get(`[data-component-type="TideCustomCollection"]`)
      .find(`.rpl-search-bar--${theme}`)
      .should('exist')
  }
)

Then(
  `the custom collection checkbox field labelled {string} should have the {string} variant applied`,
  (label: string, theme: string) => {
    cy.get(`[data-component-type="TideCustomCollection"] label`)
      .contains(label)
      .parents('.rpl-form__outer')
      .find(`.rpl-form-option--${theme}`)
      .should('exist')
  }
)

Then(
  `the custom collection checkbox group labelled {string} should have the {string} variant applied`,
  (label: string, theme: string) => {
    cy.get(`[data-component-type="TideCustomCollection"] .rpl-form-label`)
      .contains(label)
      .parents('.rpl-form__fieldset')
      .find('.rpl-form-option-group .rpl-form-option')
      .each(($el) => {
        cy.wrap($el).should('have.class', `rpl-form-option--${theme}`)
      })
  }
)

Then(
  `the custom collection dropdown field labelled {string} should have the {string} variant applied`,
  (label: string, theme: string) => {
    cy.get(`[data-component-type="TideCustomCollection"] label`)
      .contains(label)
      .parents('.rpl-form__outer')
      .find(`.rpl-form-dropdown--${theme}`)
      .should('exist')
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

When(`I toggle the content collection filters`, () => {
  cy.get(`[data-component-type="TideCustomCollection"]`)
    .find(`button`)
    .contains('Refine search')
    .click()
})

Then(
  'the custom collection config has {string} set to {string}',
  (key: string, value: string | boolean) => {
    cy.get('@pageFixture').then((response) => {
      if (value === 'true') value = true
      if (value === 'false') value = false
      set(response, `bodyComponents[0].props.searchListingConfig.${key}`, value)
    })
  }
)

When('the custom collection results count has been hidden', () => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      `bodyComponents[0].props.resultsConfig.hideResultsCount`,
      true
    )
  })
})
