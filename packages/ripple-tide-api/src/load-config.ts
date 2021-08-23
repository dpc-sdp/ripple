import jsYaml from 'js-yaml'
const appRoot = require('app-root-path')
const path = require('path')
const fs = require('fs')

export const loadMapping = async filePath => {
  try {
    if (fs.existsSync(filePath)) {
      const mappingConfig = await import(filePath).then(m => m.default)
      // Each module can define a YAML OpenAPI 3 spec
      if (fs.existsSync(filePath + '/definition.yaml')) {
        const schema = jsYaml.load(
          fs.readFileSync(path.join(filePath, './definition.yaml'), 'utf-8')
        )
        mappingConfig.schema = schema
      }
      // Add top level components for use with $ref
      if (fs.existsSync(filePath + '/components-definition.yaml')) {
        const schemaComponents = jsYaml.load(
          fs.readFileSync(
            path.join(filePath, './components-definition.yaml'),
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

export const getModulesFromConfig = async config => {
  if (config.modules) {
    const modules = Object.keys(config.modules)
    const modulesToLoad = {}
    for (let i = 0; i < modules.length; i++) {
      const type = modules[i]
      let modulePath
      switch (typeof config.modules[type]) {
        case 'boolean':
          modulePath = path.join(__dirname, `./src/modules/${type}`)
          break
        case 'string':
          modulePath = appRoot.path + config.modules[type]
          break
        case 'object':
          throw new Error(
            `Object modules are currently unsupported. Check ${type} module config.`
          )
        default:
          throw new Error(`ERROR: Unable to load module - ${type}`)
      }
      const mapping = await loadMapping(modulePath)
      if (mapping) {
        modulesToLoad[type] = mapping
      } else {
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
