import {
  Then,
  When,
  Given,
  DataTable
} from '@badeball/cypress-cucumber-preprocessor'
import { set } from 'lodash-es'

Then(`the ripple map component should be visible`, () => {
  cy.get(`.rpl-map canvas`, { timeout: 8000 }).should('be.visible')
})

Then(`the data map component tabs should exist`, () => {
  cy.get('.rpl-tabs').should('exist')
})

Then(`the data map tabs should be labelled:`, (dataTable: DataTable) => {
  const items = dataTable.raw()
  cy.get('.rpl-tabs .rpl-tab').as('items')
  items.forEach((row, i: number) => {
    cy.get('@items')
      .eq(i)
      .then((item) => {
        cy.wrap(item).as('item')
        cy.get('@item').should('contain', row[0])
      })
  })
})

When(`I click the tab labelled {string}`, (label) => {
  cy.get('.rpl-tabs .rpl-tab').contains(label).click()
})

When(`I enter the term {string} into the location search input`, (term) => {
  cy.get('#tide-address-lookup').click()
  cy.get('#tide-address-lookup').focus()
  cy.get('#tide-address-lookup').type(term)
  cy.get('.rpl-search-bar__menu-option').should('be.visible')
})
Then(`the location search results should contain {string}`, (term) => {
  cy.get('.tide-search-address-lookup .rpl-search-bar__menu-option')
    .contains(term)
    .should('exist')
})
When(`I click the location search term {string}`, (term) => {
  cy.get('.tide-search-address-lookup .rpl-search-bar__menu-option')
    .contains(term)
    .click()
})

Then(`the location search value should be {string}`, (term) => {
  cy.get('.tide-search-address-lookup .rpl-search-bar__input').should(
    'contain',
    term
  )
})

Then(`the map matches the image snapshot {string}`, (title) => {
  cy.get('.rpl-primary-nav').invoke('remove')
  cy.get('.rpl-map').matchImage({
    title,
    screenshotConfig: {},
    // pixelmatch options, see: https://www.npmjs.com/package/pixelmatch#pixelmatchimg1-img2-output-width-height-options
    diffConfig: {
      threshold: 0.1
    },
    // maximum threshold above which the test should fail
    // default: 0.01
    maxDiffThreshold: 0.08
  })
})

Then(`the map loading screen should be displayed`, () => {
  cy.get('.tide-search-listing-results-map-skeleton').should('be.visible')
})

Then(`the map should be displayed`, () => {
  cy.get('.rpl-map').should('be.visible')
})

When(
  `I click the map component at coordinates {int} {int}`,
  (x: number, y: number) => {
    // Move mouse to some random position
    cy.get('.rpl-map canvas').trigger('mousemove', 100, 100, { force: true })
    // Click
    cy.get('.rpl-map canvas').click(x, y, { force: true })
  }
)

Then(`the map no results message should be visible`, () => {
  cy.get('.tide-custom-collection-no-results').should('be.visible')
})
Then(`the map no results message should contain {string}`, (term) => {
  cy.get('.tide-custom-collection-no-results').should('contain', term)
})

Given(
  'the arcgis FeatureServer {string} returns {string} fixture',
  (featureId: string, requestFixture: string) => {
    cy.intercept(
      'GET',
      `https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/${featureId}/*`,
      {
        statusCode: 200,
        requestFixture
      }
    ).as('arcGisRequest') // assign an alias
  }
)

Given('the popup type is {string}', (popupType) => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'bodyComponents[0].props.mapConfig.props.popupType',
      popupType
    )
  })
})

Given('the side panel is enabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'bodyComponents[0].props.mapConfig.sidePanel.enabled', true)
  })
})

Given('I click the side panel item with text {string}', (title) => {
  cy.get('.rpl-map-side-panel [role="button"]')
    .contains(title)
    .click({ force: true })
})

Given('a custom suggestions function called {string} is used', (fnName) => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'bodyComponents[0].props.locationQueryConfig.props.suggestionsConfig',
      {
        function: fnName,
        args: {
          testArg: 'testValue'
        }
      }
    )
  })
})

When(`I type {string} into the location search bar`, (inputStr: string) => {
  cy.get(`[id="tide-address-lookup"]`).focus()
  cy.get(`[id="tide-address-lookup"]`).type(`${inputStr}`)
  cy.get(`[id="tide-address-lookup"]`).focus()
})

Given(
  'the location autocomplete request is stubbed with {string} fixture',
  (fixture: string) => {
    cy.intercept('POST', `/api/tide/app-search/**/elasticsearch/_search`, {
      statusCode: 200,
      fixture
    }).as('autocompleteRequest') // assign an alias
  }
)

Then(
  'the URL should reflect that the location has the following:',
  (dataTable) => {
    const items = dataTable.hashes()

    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)

      items.forEach((row) => {
        expect(params.get(`location[${row.key}]`)).to.eq(`${row.value}`)
      })
    })
  }
)

Given(
  'the ArcGIS findAddressCandidates endpoint returns {string} fixture',
  (fixture: string) => {
    cy.intercept(
      'GET',
      `https://corp-geo.mapshare.vic.gov.au/arcgis/rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer/findAddressCandidates*`,
      {
        statusCode: 200,
        fixture
      }
    )
  }
)
