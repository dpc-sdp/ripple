/* global cy */
const Ajv = require('ajv')
const openApiPlugin = require('ajv-openapi')

const getSchemaError = (getAjvError) => {
  return cy.wrap(
    `Field: ${getAjvError[0]['dataPath']} is invalid. Cause: ${getAjvError[0]['message']}`
  )
}

module.exports = (schema, jsonData) => {
  cy.log([schema, jsonData])

  const ajv = openApiPlugin(
    new Ajv({
      schemaId: 'auto',
      format: 'full',
      coerceTypes: true,
      unknownFormats: 'ignore',
      useDefaults: true,
      nullable: true
    })
  )
  const validate = ajv.addSchema(schema, 'openapi.json')

  const valid = ajv.validate(
    { $ref: `openapi.json#/components/schemas/${jsonData.type}` },
    jsonData
  )

  if (!valid) {
    cy.log(validate.errors)
    getSchemaError(validate.errors).then((schemaError) => {
      throw new Error(schemaError)
    })
  } else {
    cy.log('Schema validated!')
  }
}
