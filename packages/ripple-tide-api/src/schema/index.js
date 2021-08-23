import get from 'lodash.get'
import jsYaml from 'js-yaml'
const fs = require('fs')
const path = require('path')

export default function(config) {
  const definition = jsYaml.load(
    fs.readFileSync(path.join(__dirname, './definition.yaml'), 'utf-8')
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
  let componentSchemas = get(definition, ['components', 'schemas'])
  const componentRefs = {}
  Object.keys(config.modules).forEach(key => {
    const mdl = config.modules[key]
    if (mdl.hasOwnProperty('schema')) {
      componentSchemas[key] = mdl.schema
      const schemaPath = `#/components/schemas/${key}`
      if (!pageSchemasRefs || !Array.isArray(pageSchemasRefs)) {
        pageSchemasRefs = []
      }
      const match = pageSchemasRefs.find(oneOf => oneOf['$ref'] === schemaPath)
      if (!match) {
        pageSchemasRefs.push({
          $ref: schemaPath
        })
      }
    }
    if (mdl.hasOwnProperty('schemaComponents')) {
      Object.keys(mdl.schemaComponents).forEach(cmp => {
        if (!componentSchemas[cmp]) {
          componentRefs[cmp] = mdl.schemaComponents[cmp]
        }
      })
    }
  })

  Object.keys(componentRefs).forEach(cmp => {
    if (!componentSchemas[cmp]) {
      componentSchemas[cmp] = componentRefs[cmp]
    }
  })

  return definition
}
