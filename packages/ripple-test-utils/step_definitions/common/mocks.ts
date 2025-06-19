import {
  Then,
  Given,
  Before,
  After
} from '@badeball/cypress-cucumber-preprocessor'

Before({ tags: '@mockserver' }, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

After({ tags: '@mockserver' }, () => {
  cy.log('the mock server has stopped')
  cy.task('stopMockServer')
})

Given(`the mock server has started`, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

Given(`the mock server has started with proxy`, () => {
  cy.log('the mock server has started, unmatched routes will be proxied')
  cy.task('startMockServer', true)
})

Given(`the mock server has been stopped`, () => {
  cy.task('stopMockServer')
  cy.log('the mock server has been stopped')
})

Given(
  `the endpoint {string} with query {string} returns fixture {string} with status {int}`,
  (route: string, query: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRouteWithQuery', { route, status, response, query })
    })
  }
)

Given(
  `the site endpoint returns fixture {string} with status {int}`,
  (fixture: string, status: number) => {
    cy.log(Cypress.env('NUXT_PUBLIC_TIDE_SITE'))
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRoute', {
        route: '/api/tide/site',
        status,
        response
      })
    })
  }
)

Given(
  `the page endpoint for path {string} returns fixture {string} with status {int}`,
  (path: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRouteWithQuery', {
        route: '/api/tide/page',
        status,
        response,
        query: `?path=${encodeURIComponent(path)}`
      })
    })
  }
)

Given('I load the page fixture with {string}', (fixture: string) => {
  cy.fixture(fixture).as('pageFixture')
})

Given(
  `the page endpoint for path {string} returns the loaded fixture`,
  (path: string) => {
    cy.get('@pageFixture').then((response) => {
      cy.task('setMockRouteWithQuery', {
        route: '/api/tide/page',
        status: 200,
        response,
        query: `?path=${encodeURIComponent(path)}`
      })
    })
  }
)

Given('I load the site fixture with {string}', (fixture: string) => {
  cy.fixture(fixture).as('siteFixture')
})

Given(`the site endpoint returns the loaded fixture`, () => {
  cy.get('@siteFixture').then((response) => {
    cy.task('setMockRoute', {
      route: '/api/tide/site',
      status: 200,
      response
    })
  })
})

Given(
  `the endpoint {string} returns fixture {string} with status {int}`,
  (route: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRoute', { route, status, response })
    })
  }
)

Given(
  `posting form to endpoint {string} returns fixture {string} with status {int}`,
  (route: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockPostRouteWithQuery', {
        route,
        status,
        response,
        query: `?site=${Cypress.env('NUXT_PUBLIC_TIDE_SITE')}`
      })
    })
  }
)

Given(
  `posting to endpoint {string} returns fixture {string} with status {int}`,
  (route: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockPostRoute', { route, status, response })
    })
  }
)

/* SEARCH */
Given(
  'the search network request is stubbed with fixture {string} and status {int}',
  (fixture: string, status: number) => {
    cy.intercept('POST', `/api/tide/elasticsearch/**/_search`, (req) => {
      // Filter out the aggregation requests (they have size=1)
      if (req.body.size === 0) {
        req.reply({
          statusCode: status,
          fixture: fixture
        })
        return
      }

      // Only apply the alias to the actual search request
      req.alias = 'searchReq' // assign an alias
      req.reply({
        statusCode: status,
        fixture: fixture
      })
    })
  }
)

Given(
  'the search network request is stubbed with fixture {string}, status {int} and delayed by {int} milliseconds',
  (fixture: string, statusCode: number, delay: number) => {
    cy.intercept('POST', `/api/tide/elasticsearch/**/_search`, (req) => {
      if (req.body.size === 0) {
        req.reply({
          statusCode,
          fixture
        })
      } else {
        req.alias = 'searchReq'
        req.reply({
          statusCode,
          fixture,
          delay
        })
      }
    })
  }
)

/* SEARCH */
Given(
  'the {string} network request is stubbed with fixture {string} and status {int} as alias {string}',
  (url: string, fixture: string, status: number, alias: string) => {
    cy.intercept('POST', url, (req) => {
      // Stub out aggregation requests
      if (req.body.size === 0) {
        req.reply({})
      } else {
        // Only apply the alias to the actual search request
        req.alias = alias // assign an alias
        req.reply({
          statusCode: status,
          fixture: fixture
        })
      }
    })
  }
)

Given(
  'the {string} network request is delayed by {int} milliseconds and stubbed with fixture {string}, status {int} and alias {string}',
  (
    url: string,
    delay: number,
    fixture: string,
    statusCode: number,
    alias: string
  ) => {
    cy.intercept('POST', url, (req) => {
      if (req.body.size === 0) {
        req.reply({})
      } else {
        req.alias = alias
        req.reply({
          statusCode,
          fixture,
          delay
        })
      }
    })
  }
)

Given(
  'the {string} aggregation request is stubbed with fixture {string} and status {int} as alias {string}',
  (url: string, fixture: string, status: number, alias: string) => {
    cy.intercept('POST', url, (req) => {
      // Filter out the aggregation requests (they have size=1)
      if (req.body.size === 0) {
        req.alias = alias || 'aggReq' // assign an alias to aggregations
        req.reply({
          statusCode: status,
          fixture: fixture
        })
        return
      }
    })
  }
)

Given(
  'the {string} network request is stubbed with fixture {string}',
  (url: string, fixture: string, dataTable: DataTable) => {
    const options = dataTable.hashes()
    const status = options[0].status ? parseInt(options[0].status) : 200
    const alias = options[0].alias
    const method = options[0].method || 'GET'

    cy.intercept(method, url, (req) => {
      // Stub out aggregation requests
      if (req.body.size === 0) {
        req.reply({})
      } else {
        // Only apply the alias to the actual search request
        if (alias) {
          req.alias = alias // assign an alias
        }
        req.reply({
          statusCode: status,
          fixture: fixture
        })
      }
    })
  }
)

Then(
  'the search network request should be called with the {string} fixture',
  (requestFixture: string) => {
    cy.fixture(requestFixture).then((fixture) => {
      cy.get(`@searchReq`).its('request.body').should('deep.equal', fixture)
    })
  }
)

Then(
  'the network request {string} should be called with the {string} fixture',
  (alias: string, requestFixture: string) => {
    cy.fixture(requestFixture).then((fixture) => {
      cy.get(`@${alias}`).its('request.body').should('deep.equal', fixture)
    })
  }
)

Then(
  'the search aggregation request should be called with the {string} fixture',
  (requestFixture: string) => {
    cy.fixture(requestFixture).then((fixture) => {
      cy.get(`@aggReq`).its('request.body').should('deep.equal', fixture)
    })
  }
)

Given('the current date is {string}', (dateString: string) => {
  const timeTravel = new Date(dateString).getTime()
  cy.clock(timeTravel)
})

Given('the current date is restored', () => {
  cy.clock().invoke('restore')
})

Given('time moves {int} second', (sec: number = 1) => {
  cy.tick(sec * 1000)
})

Given(
  'I have set the cookie {string} with value {string}',
  (cookieKey: string, cookieVal: string) => {
    cy.setCookie(cookieKey, cookieVal)
  }
)

Then(
  'the cookie {string} should have the value {string}',
  (cookieKey: string, cookieVal: string) => {
    cy.getCookie(cookieKey).should('have.property', 'value', cookieVal)
  }
)

Then(
  'I have set localstorage key {string} with value {string}',
  (localKey: string, localVal: string) => {
    cy.window().then((win) => {
      win.localStorage.setItem(localKey, localVal)
    })
  }
)

Then(
  'the aliased request {string} has been called {int} times',
  (alias: string, tally: string) => {
    cy.get(`@${alias}.all`).should('have.length', tally)
  }
)
