import jsYaml from 'js-yaml'
const appRoot = require('app-root-path')
const path = require('path')
const fs = require('fs')

export const loadMapping = async filePath => {
  const folderPath = filePath.replace('index.js', '')
  try {
    if (fs.existsSync(folderPath)) {
      const mappingConfig = await import(folderPath).then(m => m.default)
      // Each module can define a YAML OpenAPI 3 spec
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
    .keys(config.modules)
    .forEach(key => {
      returnObj[key] = require.resolve(config.modules[key]).replace('index.js', '')
    })
  return returnObj
}

export const getModulesFromConfig = async config => {
  if (config.modules) {
    const modules = Object.keys(config.modules)
    const modulesToLoad = {}
    for (let i = 0; i < modules.length; i++) {
      const type = modules[i]
      switch (typeof config.modules[type]) {
        case 'string':
          const modulePath = require.resolve(config.modules[type])
          modulesToLoad[type] = await loadMapping(modulePath)
          break
        case 'object':
          modulesToLoad[type] = config.modules[type]
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


