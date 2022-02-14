import type { ModuleOptions } from './../types/module'
import path from 'pathe'
import fs from 'fs'

export const loadMapping = async (filePath, type) => {
  const folderPath = filePath.replace('index.js', '')
  try {
    if (fs.existsSync(folderPath)) {
      const configExport = await import(folderPath).then((m) => m.default)
      let mappingConfig

      // Support multiple content types in mapping
      if (configExport.hasOwnProperty(type)) {
        mappingConfig = configExport[type]
      } else {
        mappingConfig = configExport
      }

      return mappingConfig
    }
  } catch (error) {
    return error
  }
}

export const getModulesFromConfig = async (config) => {
  if (config.contentTypes) {
    const contentTypes = Object.keys(config.contentTypes)
    const modulesToLoad = {}
    for (let i = 0; i < contentTypes.length; i++) {
      const type = contentTypes[i]
      switch (typeof config.contentTypes[type]) {
        case 'string':
          const modulePath = path.resolve(config.contentTypes[type])
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

export default async function getTideConfig(options: ModuleOptions) {
  const modules = await getModulesFromConfig(options)
  const siteMapping = await getModulesFromConfig(options)
  return {
    ...options,
    modules,
    siteMapping
  }
}
