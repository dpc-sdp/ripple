/* global Cypress */
const validateSchema = require('./lib/validate-schema')

Cypress.Commands.add('validateSchema', validateSchema)

require('cypress-axe')
