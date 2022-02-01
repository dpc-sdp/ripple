import jsYaml from 'js-yaml'
const appRoot = require('app-root-path')
const path = require('path')
const fs = require('fs')

export const loadMapping = async (filePath, type) => {
  const folderPath = filePath.replace('index.js', '')
  try {
    if (fs.existsSync(folderPath)) {
      const configExport = await import(folderPath).then(m => m.default)
      let mappingConfig
      // Support multiple content types in mapping
      if (configExport.hasOwnProperty(type)) {
        mappingConfig = configExport[type]
      } else {
        mappingConfig = configExport
      }
      // Each module can define a YAML OpenAPI 3 spec - see https://json-schema.org/understanding-json-schema/ for syntax
      if (fs.existsSync(folderPath + '/definition.yaml')) {
        const schema = jsYaml.load(
          fs.readFileSync(path.join(folderPath, './definition.yaml'), 'utf-8')
        )
        mappingConfig.schema = schema
      }
      // Add top level components for use with $ref
      if (fs.existsSync(folderPath + '/components-definition.yaml')) {
        const schemaComponents = jsYaml.load(
          fs.readFileSync(
            path.join(folderPath, './components-definition.yaml'),
            'utf-8'
          )
        )
        mappingConfig.schemaComponents = schemaComponents
      }

      return mappingConfig
    }
  } catch (error) {
    return error
  }
}

export const getModulePaths = (config) => {
  const returnObj = {}
  Object
    .keys(config.contentTypes)
    .forEach(key => {
      returnObj[key] = require.resolve(config.contentTypes[key]).replace('index.js', '')
    })
  return returnObj
}

export const getModulesFromConfig = async config => {
  if (config.contentTypes) {
    const contentTypes = Object.keys(config.contentTypes)
    const modulesToLoad = {}
    for (let i = 0; i < contentTypes.length; i++) {
      const type = contentTypes[i]
      switch (typeof config.contentTypes[type]) {
        case 'string':
          const modulePath = require.resolve(config.contentTypes[type])
          modulesToLoad[type] = await loadMapping(modulePath, type)
          break
        case 'object':
          modulesToLoad[type] = config.contentTypes[type]
          break
        default:
          throw new Error(`ERROR: Unable to load module - ${type}`)
      }
    }
    return modulesToLoad
  }
}

export const getSiteConfig = async config => {
  if (config.siteMapping) {
    return loadMapping(appRoot.path + config.siteMapping)
  }
}
