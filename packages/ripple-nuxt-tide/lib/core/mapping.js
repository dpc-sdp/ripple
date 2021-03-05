import tideDefaultConfig from '../config/tide.config'
import defaultFilters from './mapping-filters'
import logger from './logger'

const _getValFromFieldArray = Symbol('getValFromFieldArray')
const _getValFromFieldOptions = Symbol('getValFromFieldOptions')
const _getFieldVal = Symbol('getFieldVal')
const _parseField = Symbol('parseField')
const _applyFilters = Symbol('applyFilters')
const _applyFetcher = Symbol('applyFetcher')
const _getProps = Symbol('getProps')
const _getCols = Symbol('getCols')
const _getChildCols = Symbol('getChildCols')
const _getName = Symbol('getName')
const _getClass = Symbol('getClass')
const _isSSR = Symbol('isSSR')
const _getComponent = Symbol('getComponent')
const _mergeConfigs = Symbol('mergeConfigs')

export class Mapping {
  constructor (config, tideService) {
    // Support mapping for different types
    // Each type should have their own mapping config in mapping.config.js
    this.mappingConfig = this[_mergeConfigs](tideDefaultConfig, config.extendConfigs, config.customConfig, 'mapping')
    this.mappingFilters = this[_mergeConfigs](defaultFilters, config.extendFilters, config.customFilters)
    this.tide = tideService
  }

  get (data, type = 'tideField') {
    let result = []
    let dataMode

    if (Array.isArray(data)) {
      dataMode = 'array'
    } else {
      dataMode = 'single'
      data = [data]
    }

    for (const item of data) {
      // Mapping items only for those in mapping configs.
      if (this.mappingConfig[type][item.type]) {
        const component = this[_getComponent](item, type)
        result.push(component)
      } else {
        if (process.server) {
          logger.warn(`"${item.type}" is not a supported component in map.`, { label: 'Mapping' })
        }
      }
    }

    // Return a promise as some props' value need to be fetched from Tide.
    return new Promise(function (resolve, reject) {
      if (dataMode === 'single') {
        if (result[0]) {
          result[0].catch(error => {
            if (process.server) {
              logger.error('Mapping failed to get result due to a error.', { error, label: 'Mapping' })
            }
            reject(error)
          })
          resolve(result[0])
        } else {
          reject(new Error('Mapping failed to get result.'))
        }
      } else {
        Promise.all(result).catch(error => {
          if (process.server) {
            logger.error('Mapping failed to get result due to a error.', { error, label: 'Mapping' })
          }
          reject(error)
        }).then(res => {
          resolve(res)
        })
      }
    })
  }

  filter (fieldValue, filters) {
    // We stop to filter the value if it's undefined or null.
    if (typeof fieldValue === 'undefined' || fieldValue === null) {
      return null
    }
    // Filters will take previous filter returned value.
    for (const filter of filters) {
      const mapping = this
      // Pass mapping instance into filters, so we can use filters inside filter.
      if (typeof this.mappingFilters[filter] !== 'function') {
        return new Error(`Mapping filter "${filter}" is not a function or not defined.`)
      }
      fieldValue = this.mappingFilters[filter](fieldValue, { mapping })
    }
    return fieldValue
  }

  fetch (fetcher) {
    return this[_applyFetcher](fetcher)
  }

  [_mergeConfigs] (defaultConfig, extendConfigs, customConfig, prop = null) {
    if (prop) {
      defaultConfig = defaultConfig[prop]
      customConfig = customConfig[prop]
    }

    let config = Object.assign({}, defaultConfig)

    const mergeTypes = (configForMergeIn) => {
      if (configForMergeIn) {
        for (const type in configForMergeIn) {
          if (config[type] && typeof configForMergeIn[type] !== 'function') {
            config[type] = Object.assign(config[type], configForMergeIn[type])
          } else if (typeof configForMergeIn[type] === 'function') {
            if (config[type] && process.server) {
              logger.info('Mapping filter "%s" has been overridden by custom module', type, { label: 'Mapping' })
            }
            config[type] = configForMergeIn[type]
          } else {
            config[type] = Object.assign({}, configForMergeIn[type])
          }
        }
      }
    }

    // Merge extend configs from each enabled sub module.
    extendConfigs.forEach((extendConfig) => {
      if (prop) {
        extendConfig = extendConfig[prop]
      }
      mergeTypes(extendConfig)
    })

    // Merge custom config from Nuxt.
    mergeTypes(customConfig)

    return config
  }

  parseField (field, item) {
    return this[_parseField](field, item)
  }

  async [_getComponent] (item, type) {
    switch (type) {
      // In future, any type has different mapping can be added here.
      // case 'typeA':
      default: {
        let itemConfig = this.mappingConfig[type][item.type]

        // If it's one to multiple mode, we switch to the right one based on expression.
        if (this.mappingConfig[type][item.type].components) {
          const components = this.mappingConfig[type][item.type].components
          const expression = this.mappingConfig[type][item.type].expression(item)
          const component = components.filter((component) => {
            return expression === component.case
          })
          itemConfig = component[0]
        }

        const data = await this[_getProps](item, itemConfig)
        if (data instanceof Error) {
          throw data
        }

        return {
          name: this[_getName](itemConfig),
          data: data,
          cols: this[_getCols](itemConfig),
          childCols: this[_getChildCols](itemConfig),
          class: this[_getClass](itemConfig),
          ssr: this[_isSSR](itemConfig)
        }
      }
    }
  }

  [_getValFromFieldArray] (fieldArray, item) {
    for (const field of fieldArray) {
      if (item !== null && typeof item === 'object' && item.hasOwnProperty(field)) {
        item = item[field]
      } else {
        return null
      }
    }

    const value = item
    return value
  }

  [_getValFromFieldOptions] (FieldOptions, item) {
    for (const fieldOption of FieldOptions) {
      const value = this[_getValFromFieldArray](fieldOption, item)
      if (value !== null) {
        return value
      }
    }

    return null
  }

  async [_getFieldVal] (field, item) {
    if (typeof field === 'string' || Array.isArray(field)) {
      return this[_parseField](field, item)
    } else if (typeof field === 'object') {
      if (field.value !== undefined) {
        return field.value
      } else if (field.fetcher) {
        if (field.filters) {
          return this.filter(this[_applyFetcher](field.fetcher), field.filters)
        } else {
          return this[_applyFetcher](field.fetcher)
        }
      } else if (field.filters) {
        return this[_applyFilters](field.field, field.filters, item)
      }
    }
  }

  [_parseField] (field, item) {
    let value = null
    if (Array.isArray(field) && Array.isArray(field[0])) {
      value = this[_getValFromFieldOptions](field, item)
    } else if (Array.isArray(field)) {
      value = this[_getValFromFieldArray](field, item)
    } else if (typeof field === 'string') {
      value = item[field] || null
    }
    return value
  }

  [_applyFilters] (field, filters, item) {
    let fieldValue
    if (field) {
      // Get value from field first.
      fieldValue = this[_parseField](field, item)
    } else {
      // If field is empty string, then use item itself.
      fieldValue = item
    }

    return this.filter(fieldValue, filters)
  }

  [_applyFetcher] (fetcher) {
    // You can find a usage example in Latest events mapping.
    return this.tide[fetcher.method](...fetcher.args)
  }

  [_getProps] (item, itemConfig) {
    let props = {}
    let getProps = []
    for (const prop in itemConfig.props) {
      const propMapping = itemConfig.props[prop]
      const getProp = this[_getFieldVal](propMapping, item).then(res => {
        props[prop] = res
      }).catch(error => {
        if (process.server) {
          logger.error('Failed to get prop "%s" value.', prop, { error, label: 'Mapping' })
        }
      })
      getProps.push(getProp)
    }
    return new Promise(function (resolve, reject) {
      const allFetched = Promise.all(getProps).then(() => {
        // If we got any coding error(e.g. custom mapping configuration error), stop doing further and fail the mapping.
        // So developer can notice it and fix it.
        let getPropsError = null
        const propsValues = Object.values(props)
        const noError = propsValues.every(value => {
          if (value instanceof Error) {
            getPropsError = value
            return false
          }
          return true
        })

        return noError ? props : getPropsError
      }).catch(error => {
        reject(new Error(`Get props failed by resolve the fetching. Error: ${error}`))
      })
      resolve(allFetched)
    })
  }

  [_getCols] (itemConfig) {
    // Cols for grid
    // e.g { m: 6, l: 4}
    // or use `wide` for without sidebar layout and `narrow` for with sidebar layout
    // {
    //   wide: { l: 4 },
    //   narrow: { l: 6 }
    // }
    return itemConfig.cols || {}
  }

  [_getChildCols] (itemConfig) {
    // Cols for grid
    // e.g { m: 6, l: 4}
    // or use `wide` for without sidebar layout and `narrow` for with sidebar layout
    // {
    //   wide: { l: 4 },
    //   narrow: { l: 6 }
    // }
    return itemConfig.childCols || null
  }

  [_getName] (itemConfig) {
    return itemConfig.component
  }

  [_getClass] (itemConfig) {
    // Class for component
    // e.g ['class-a', 'class-b']
    // or use `wide` for without sidebar layout and `narrow` for with sidebar layout
    // {
    //   wide: ['class-a', 'class-b'],
    //   narrow: ['sidebar-class-a', 'sidebar-class-b']
    // }
    return itemConfig.class || []
  }

  [_isSSR] (itemConfig) {
    const ssr = itemConfig.ssr
    return (typeof ssr === 'boolean') ? ssr : true
  }
}
