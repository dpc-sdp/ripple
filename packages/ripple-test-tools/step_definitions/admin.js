/* global cy, Cypress */

const { Given, When } = require('cypress-cucumber-preprocessor/steps')

Given(`I have logged into the backend`, () => {
  cy.visit(`${Cypress.env('CONTENT_API_SERVER')}/user/login`, {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    }
  })
  cy.get('[data-drupal-selector="edit-name"]')
    .type(Cypress.env('ADMIN_USERNAME'))

  cy.get('[data-drupal-selector="edit-pass"]')
    .type(Cypress.env('ADMIN_PASSWORD'))

  cy.get('[data-drupal-selector="edit-submit"]').click()
})

Given(`in the backend there is a node at {string} with {string} data`, (url, fixture) => {
  cy.request({
    url: `/api/v1/route?site=${Cypress.env('SITE_ID')}&path=${url}`,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  }).then(routeResponse => {
    cy.log(routeResponse)
    if (routeResponse.status !== 200) {
      cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/content/import_demo_content', {
        auth: {
          username: Cypress.env('CONTENT_API_AUTH_USER'),
          password: Cypress.env('CONTENT_API_AUTH_PASS')
        }
      })
      cy.fixture(fixture + '.yml').then(yaml => {
        cy.get('[data-drupal-selector="edit-import"]').invoke('val', yaml)
        cy.get('[data-drupal-selector="edit-submit"]').click()
        cy.url('')
      })
    }
  })
})

Given(`in the backend there is a node with {string} data as {string}`, (fixture, alias) => {
  cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/content/import_demo_content', {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    }
  })
  cy.fixture(fixture + '.yml').then(yaml => {
    cy.get('[data-drupal-selector="edit-import"]').invoke('val', yaml)
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('.messages__list .messages__item:nth-child(2').invoke('text').as(alias)
  })
})

Given(`I add a path alias {string} for {string}`, function (path, alias) {
  cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/config/search/path/add', {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    }
  })
  cy.get('#edit-source').type('/' + this[`${alias}`])
  cy.get('#edit-alias').type(path)
  cy.get('#edit-submit').click()
})

Given(`in the backend there are no {string} nodes`, (contentType) => {
  cy.request({
    url: `/api/v1/node/alert?site=${Cypress.env('SITE_ID')}`,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  }).then(routeResponse => {
    cy.log(`Found ${routeResponse.body.meta.count} ${contentType} nodes`)
    if (routeResponse.status !== 200 || routeResponse.body.meta.count !== '0') {
      cy.log(`Deleting ${contentType}s`)
      cy.visit(Cypress.env('CONTENT_API_SERVER') + `/admin/content?title=&field_node_primary_site_target_id=${Cypress.env('SITE_ID')}&field_node_site_target_id=All&type=${contentType}&moderation_state=All&status=1`, {
        auth: {
          username: Cypress.env('CONTENT_API_AUTH_USER'),
          password: Cypress.env('CONTENT_API_AUTH_PASS')
        }
      })
      cy.get('.view-content .select-all [title="Select all rows in this table"]').click()
      cy.get('[data-drupal-selector="edit-node-bulk-form"] [data-drupal-selector="edit-action"]').select('node_delete_action')
      cy.get('#edit-submit--2').click()
      cy.url().should('include', '/admin/content/node/delete')
      cy.get('#edit-submit').click()
    }
  })
})

When(`in the BE I go to the current site taxonomy page`, () => {
  cy.visit(`${Cypress.env('CONTENT_API_SERVER')}/taxonomy/term/${Cypress.env('SITE_ID')}/edit`, {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    }
  })
})

When(`in the BE I check the {string} checkbox`, (label) => {
  cy.contains(label).siblings('input').check({ force: true })
})

When(`in the BE I uncheck the {string} checkbox`, (label) => {
  cy.contains(label).siblings('input').uncheck({ force: true })
})

When(`in the BE I click the {string} button`, (label) => {
  cy.get(`input[type="submit"][value="${label}"]`).click()
})

Given(`in the backend there is a user {string}`, (fixture) => {
  const { safeLoad, safeDump } = require('js-yaml')
  cy.fixture(fixture + '.yml').then(yaml => {
    const yamlObj = safeLoad(yaml)
    yamlObj[0].pass = Cypress.env('ADMIN_PASSWORD')
    cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/content/import_demo_content', {
      auth: {
        username: Cypress.env('CONTENT_API_AUTH_USER'),
        password: Cypress.env('CONTENT_API_AUTH_PASS')
      }
    })
    cy.get('[data-drupal-selector="edit-import"]').invoke('val', safeDump(yamlObj))
    cy.get('[data-drupal-selector="edit-submit"]').click()
  })
})

Given(`in the backend there is a role {string}`, (role) => {
  cy.request({
    url: `${Cypress.env('CONTENT_API_SERVER')}/admin/people/roles/manage/${Cypress._.snakeCase(role)}`,
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    },
    failOnStatusCode: false
  }).then(res => {
    cy.log(res)
    if (res.status !== 200) {
      cy.visit(Cypress.env('CONTENT_API_SERVER') + 'admin/people/roles/add', {
        auth: {
          username: Cypress.env('CONTENT_API_AUTH_USER'),
          password: Cypress.env('CONTENT_API_AUTH_PASS')
        }
      })
      cy.get('#edit-label').type(role)
      cy.wait(2000)
      cy.get('#edit-submit').click()
    }
  })
})

Given(`the authenticated content term {string} has the role {string}`, (term, role) => {
  cy.visit(`${Cypress.env('CONTENT_API_SERVER')}authenticatedcontent/${term}`, {
    auth: {
      username: Cypress.env('CONTENT_API_AUTH_USER'),
      password: Cypress.env('CONTENT_API_AUTH_PASS')
    }
  })
  cy.get('.tabs__tab').contains('Edit').click({ force: true })
  cy.get('[aria-controls="fieldset_term_access"]').click({ force: true })
  cy.get(`#edit-access-role input`).check(role)
  cy.get('#edit-submit').click()
})
