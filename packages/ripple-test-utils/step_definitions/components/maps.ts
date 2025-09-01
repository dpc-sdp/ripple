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
  cy.get('body').then(($body) => {
    const nav = $body.find('.rpl-primary-nav')
    if (nav.length) {
      nav.remove()
    }
  })

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
    // Note: using cy.click(x, y, { force: true })
    // triggers focus-visible on the first focusable parent
    cy.get('.rpl-map canvas').realClick({ x, y })
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
      `https://services-ap1.arcgis.com/P744lA0wf4LlBZ84/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/${featureId}/*`,
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

Given('the maximum zoom level is set to {string}', (maxZoom) => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'bodyComponents[0].props.mapConfig.props.maxZoom',
      Number(maxZoom)
    )
  })
})

Given('the clustering distance is set to {string}', (clusteringDistance) => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'bodyComponents[0].props.mapConfig.props.clusteringDistance',
      Number(clusteringDistance)
    )
  })
})

Given('the side panel is enabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'bodyComponents[0].props.mapConfig.sidePanel.enabled', true)
  })
})

Given('I click the side panel item with text {string}', (title: string) => {
  cy.get('.rpl-map-side-panel button').contains(title).click({ force: true })
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

Given('a custom map results hook called {string} is used', (hook) => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'bodyComponents[0].props.mapConfig.onResultsHook', hook)
  })
})

When(`I type {string} into the location search bar`, (inputStr: string) => {
  cy.get(`[id="tide-address-lookup"]`).focus()
  cy.get(`[id="tide-address-lookup"]`).type(`${inputStr}`)
})

Given(
  'the location autocomplete request is stubbed with {string} fixture',
  (fixture: string) => {
    cy.intercept('POST', `/api/tide/elasticsearch/**/_search`, {
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
        if (row.value) {
          expect(params.get(`location[${row.key}]`)).to.eq(`${row.value}`)
        } else {
          expect(params.get(`location[${row.key}]`)).to.be.null
        }
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

Given(`the geolocation button is not enabled`, () => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'bodyComponents[0].props.locationQueryConfig.showGeolocationButton',
      false
    )
  })
})

Given(`the geolocation button is enabled`, () => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'bodyComponents[0].props.locationQueryConfig.showGeolocationButton',
      true
    )
  })
})

Given(`the geolocate button is hidden`, () => {
  cy.get('.rpl-map-geolocate__btn').should('not.exist')
})

Given(`the geolocate button is displayed`, () => {
  cy.get('.rpl-map-geolocate__btn').should('exist')
})

Given('the following default extent is used', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get('@pageFixture').then((response) => {
    set(response, 'bodyComponents[0].props.mapConfig.props.defaultExtent', [
      parseFloat(table[0].minx),
      parseFloat(table[0].miny),
      parseFloat(table[0].maxx),
      parseFloat(table[0].maxy)
    ])
  })
})

When('I click the view fullscreen button', () => {
  cy.get('.rpl-map__control button[title="View full screen"]').realClick()
})

When('I click the exit fullscreen button', () => {
  cy.get('.rpl-map__control button[title="Exit full screen"]').realClick()
})

When('I click the zoom in button', () => {
  cy.get('.rpl-map__control-zoom-in').click()
})

When('I click the zoom out button', () => {
  cy.get('.rpl-map__control-zoom-out').click()
})

Then('the map should be fullscreen', () => {
  cy.document().then((doc) => {
    expect(doc.fullscreenElement).to.not.be.null
  })
})

Then('the map should not be fullscreen', () => {
  cy.document().then((doc) => {
    expect(doc.fullscreenElement).to.be.null
  })
})

Given('the map height is set to {int}', (height: number) => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'bodyComponents[0].props.mapConfig.props.height', height)
  })
})

Then('the map height is {int}', (height: number) => {
  cy.get('.rpl-map__map').should('have.css', 'height', `${height}px`)
})

Then('the map is loaded', () => {
  cy.get('.ol-map-fully-loaded', { timeout: 12000 }).should('be.visible')
})

Then('the map is positioned at', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get('.rpl-map').as('map')

  table.forEach((row) => {
    const center =
      row.center === 'default' ? '16193060.23205,-4383467.70225' : row.center
    const zoom = row.zoom === 'default' ? '6.849094430405593' : row.zoom

    cy.get('@map').should('have.attr', 'data-center', center)
    cy.get('@map').should('have.attr', 'data-zoom', zoom)
  })
})

Then('the map is in the default position', () => {
  cy.get('.rpl-map').as('map')

  cy.get('@map').should(
    'have.attr',
    'data-center',
    '16193060.23205,-4383467.70225'
  )
  cy.get('@map').should('have.attr', 'data-zoom', '6.849094430405593')
})

Then(`the list view should be displayed`, () => {
  cy.get('[data-component-type="search-listing-layout-table"]', {
    timeout: 12000
  }).should('be.visible')
})

Then(`the map view should be displayed`, () => {
  cy.get('.rpl-map', {
    timeout: 12000
  }).should('be.visible')
})

When(
  `I click the link in the list view with label {string}`,
  (label: string) => {
    cy.get('[data-component-type="search-listing-layout-table"] a')
      .contains(label)
      .click()
  }
)

Then(
  'I scroll to the maps side panel item titled {string}',
  (title: string) => {
    cy.get('.tide-search-sidepanel--desktop').as('sidePanel')

    cy.get('@sidePanel')
      .find('button')
      .contains(title)
      .then(($el) => {
        $el.get(0).scrollIntoView()
        expect($el.is(':visible')).to.be.true
      })
  }
)

Then('the maps side panel should be scrolled to the top', () => {
  cy.get('.tide-search-sidepanel--desktop').then(($el) => {
    expect($el[0].scrollTop).to.equal(0)
  })
})
