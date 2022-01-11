/* global cy */
// Import shared step_definitions from ripple-test-tools package
require('@dpc-sdp/ripple-test-tools/step_definitions')
const { Then } = require('cypress-cucumber-preprocessor/steps')

Then(`the response should match Swagger definition`, () => {
  cy.request('/tide-api/v2/schema').then((schemaRes) => {
    cy.get('@request').then((res) => {
      if (schemaRes) {
        cy.validateSchema(schemaRes.body, res.body)
      }
    })
  })
})
