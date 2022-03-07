import get from 'lodash.get'
import jsYaml from 'js-yaml'
import fs from 'fs'
import { join } from 'pathe'
import { resolvePath } from '@nuxt/kit'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsj = require('ts-json-schema-generator')

const formatSchema = (schema, typeName) => {
  const formattedSchema = {
    properties: {},
    required: {},
    title: typeName,
    allOf: ['#/components/schemas/TidePage']
  }
  if (schema.hasOwnProperty('properties')) {
    for (const key in schema.properties) {
      if (schema.properties[key].hasOwnProperty('$ref')) {
        schema.properties[key] = schema.properties[key]['$ref'].replace(
          '#/definitions/',
          '#/components/schemas/'
        )
      }
    }
    if (schema.hasOwnProperty('required')) {
      formattedSchema.required = schema.required
    }
    formattedSchema.properties = schema.properties
  }

  return formattedSchema
}

export default async function (config) {
  const definition = jsYaml.load(
    fs.readFileSync(join(__dirname, './openapi.yml'), 'utf-8')
  )
  let pageSchemasRefs = get(definition, [
    'paths',
    '/page',
    'get',
    'responses',
    '200',
    'content',
    'application/json',
    'schema',
    'oneOf'
  ])
  const componentSchemas = get(definition, ['components', 'schemas'])
  for (const key in config.mapping.content) {
    if (typeof config.mapping?.content[key]?.schema === 'string') {
      const filePath = await resolvePath(config.mapping.content[key].schema)
      const typeName = `Tide${key[0].toUpperCase()}${key.slice(1)}Page`
      const schema = tsj
        .createGenerator({ path: filePath, type: typeName })
        .createSchema(typeName)

      if (schema) {
        for (const key in schema.definitions) {
          if (key !== typeName) {
            componentSchemas[key] = schema.definitions[key]
          } else {
            componentSchemas[key] = formatSchema(
              schema.definitions[key],
              typeName
            )
          }
        }

        const schemaPath = `#/components/schemas/${typeName}`
        if (!pageSchemasRefs || !Array.isArray(pageSchemasRefs)) {
          pageSchemasRefs = []
        }
        const match = pageSchemasRefs.find(
          (oneOf) => oneOf['$ref'] === schemaPath
        )
        if (!match) {
          pageSchemasRefs.push({
            $ref: schemaPath
          })
        }
      }
    }
  }

  return definition
}
