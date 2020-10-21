/* global cy */
const { Before } = require('cypress-cucumber-preprocessor/steps')

Before({ tags: '@mocksearch' }, async () => {
  cy.task('startMockServer')
})
