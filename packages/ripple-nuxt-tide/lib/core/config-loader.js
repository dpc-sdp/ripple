import logger from './logger'
import { mergeIncludes } from './tide-helper'
import kebabCase from 'lodash/kebabCase'
const path = require('path')
const fs = require('fs')
const appDir = require('app-root-path')

// Groups of our configs
const configGroups = {
  core: 1,
  coreModule: 2,
  customRoot: 3,
  customModule: 4,
  nodeModule: 5
}

// List of all configs
const customConfigs = {
  customConfig: {
    filename: 'tide.config',
    type: Object,
    groups: [ configGroups.customRoot ]
  },
  customFilters: {
    filename: 'mapping-filters',
    type: Object,
    groups: [ configGroups.customRoot ]
  },
  extendConfigs: {
    filename: 'tide.config',
    type: Array,
    groups: [
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  },
  searchTemplates: {
    filename: 'tide.search-template',
    type: Object,
    merge: true,
    groups: [
      configGroups.customRoot,
      configGroups.customModule,
      configGroups.coreModule,
      configGroups.nodeModule
    ]
  },
  extendFilters: {
    filename: 'mapping-filters',
    type: Array,
    groups: [
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  },
  moduleHook: {
    filename: 'module',
    type: Function,
    groups: [
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  },
  pageTypes: {
    filename: 'tide.page-types',
    type: 'path',
    groups: [
      configGroups.customRoot,
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  },
  middleware: {
    filename: 'tide.middleware',
    type: 'path',
    groups: [
      configGroups.customRoot,
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  },
  dynamicComponents: {
    filename: 'tide.load-components',
    type: 'path',
    groups: [
      configGroups.customRoot,
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  },
  markupPlugins: {
    filename: 'tide.markup-plugins',
    type: 'path',
    groups: [
      configGroups.customRoot,
      configGroups.coreModule,
      configGroups.customModule,
      configGroups.nodeModule
    ]
  }
}

const getConfigPath = (group, item, moduleName = null) => {
  let configPath
  let configFilePath
  let appRoot = item.type === 'path' ? '~' : appDir

  switch (group) {
    case configGroups.core:
      configPath = './../config/'
      configFilePath = path.join(__dirname, configPath)
      break
    case configGroups.coreModule:
      if (moduleName) {
        configPath = `./../../modules/${moduleName}/`
        configFilePath = path.join(__dirname, configPath)
      } else {
        throw new Error('Missing module name.')
      }
      break
    case configGroups.customRoot:
      configPath = `${appRoot}/tide/`
      configFilePath = `${appDir}/tide/`
      break
    case configGroups.customModule:
      if (moduleName) {
        configPath = `${appRoot}/tide/modules/${moduleName}/`
        configFilePath = `${appDir}/tide/modules/${moduleName}/`
      } else {
        throw new Error('Missing module name.')
      }
      break
    case configGroups.nodeModule:
      if (moduleName) {
        let nodeModulePath = require.resolve(`${moduleName}/README.md`)
        nodeModulePath = nodeModulePath.replace('/README.md', '').replace(/.*\/node_modules\//, '')
        configPath = `${appRoot}/node_modules/${nodeModulePath}/`
        configFilePath = `${appDir}/node_modules/${nodeModulePath}/`
      } else {
        throw new Error('Missing module name.')
      }
      break
    default:
      throw new Error('Invalid config type.')
  }

  if (fs.existsSync(path.resolve(configFilePath, `${item.filename}.js`))) {
    if (process.env.TIDE_DEBUG) {
      const configFile = path.resolve(configFilePath, `${item.filename}.js`)
      logger.debug('Tide config file is found: %s', configFile)
    }
    return configPath + item.filename
  } else {
    return false
  }
}

const getConfig = (group, item, moduleName = null) => {
  const configPath = getConfigPath(group, item, moduleName)
  if (configPath) {
    return require(configPath)
  } else {
    return false
  }
}

const buildConfigs = (group, tideConfig, _this, moduleName = null) => {
  // Go through configs and build them.
  for (let [configName, configItem] of Object.entries(customConfigs)) {
    let config
    let configPath
    // Build for this config group only.
    if (configItem.groups.includes(group) === false) {
      continue
    }

    // For configs has dynamic import, need to be import in runtime. Add path only in build time.
    if (configItem.type === 'path') {
      configPath = getConfigPath(group, configItem, moduleName)
      if (configPath) {
        tideConfig[configName].push(configPath)
      }
    } else {
      config = getConfig(group, configItem, moduleName)
      if (config) {
        switch (configItem.type) {
          case Array:
            tideConfig[configName].push(config)
            break
          case Function:
            config.call(_this)
            break
          case Object:
            if (configItem.merge) {
              tideConfig[configName] = {
                ...tideConfig[configName],
                ...config
              }
            } else {
              tideConfig[configName] = config
            }
        }
      }
    }
  }
}

const buildCoreModules = (tideConfig, _this) => {
  const coreModules = tideConfig.modules
  Object.keys(coreModules).forEach(module => {
    // Build only if the core module is enabled.
    const moduleConfig = coreModules[module]
    if (moduleConfig === 1 || (typeof moduleConfig === 'object' && moduleConfig !== null)) {
      const moduleName = kebabCase(module)
      buildConfigs(configGroups.coreModule, tideConfig, _this, moduleName)
    }
  })
}

const buildCustomModules = (tideConfig, _this) => {
  const customModules = tideConfig.customConfig.modules

  if (Array.isArray(customModules)) {
    customModules.forEach(item => {
      if (Array.isArray(item)) {
        buildConfigs(configGroups.customModule, tideConfig, _this, item[0])
      } else {
        buildConfigs(configGroups.customModule, tideConfig, _this, item)
      }
    })
  }
}

const buildNodeModules = (tideConfig, _this) => {
  const nodeModules = tideConfig.customConfig.nodeModules

  if (Array.isArray(nodeModules)) {
    nodeModules.forEach(item => {
      if (Array.isArray(item)) {
        buildConfigs(configGroups.nodeModule, tideConfig, _this, item[0])
      } else {
        buildConfigs(configGroups.nodeModule, tideConfig, _this, item)
      }
    })
  }
}

const buildCustomRootConfig = (tideConfig, _this) => {
  buildConfigs(configGroups.customRoot, tideConfig, _this)
}

// This can be used in nuxt module build time only
export const build = (tideConfig, _this) => {
  // Build core config

  // Build core modules
  buildCoreModules(tideConfig, _this)
  // Build custom config
  buildCustomRootConfig(tideConfig, _this)
  // Build custom modules
  buildCustomModules(tideConfig, _this)
  // Build node modules
  buildNodeModules(tideConfig, _this)

  // Merge configs for errorPage
  mergeIncludes()

  // Merge extend configs from each enabled sub module.
  let errorPageConfig = {}
  tideConfig.extendConfigs.forEach((extendConfig) => {
    errorPageConfig = mergeIncludes(errorPageConfig, extendConfig.errorPage)
  })
  tideConfig._errorPage = mergeIncludes(errorPageConfig, tideConfig.customConfig.errorPage)

  if (process.env.TIDE_DEBUG) {
    logger.debug('Tide configuration: %O', tideConfig)
  }
}
