import HttpClient from './http-client'
import TideApiError from './utils/api-error'
import Logger from './utils/api-logger'
import get from 'lodash.get'
import { RippleTideApiConfig, RippleTideApiModule } from './../create-server'

export default class TideApi extends HttpClient {
  utils: any
  debug: boolean
  logger: Logger
  constructor (config: RippleTideApiConfig) {
    super({
      baseUrl: `${config.tide.baseUrl}${config.tide.apiPrefix}`,
      auth: config.tide.auth
    })
    if (!config) {
      throw new Error('Error - No configuration specified')
    }
    this.utils = {
      get
    }
    this.debug = config.debug
    this.logger = new Logger()
  }
  async getMappedData (mapping: RippleTideApiModule, resource: any): Promise<Record<string,any>|{}> {
    if (!mapping || !resource) {
      this.handleError('Error: Unable to retrive data from mapping' + mapping, 500)
    }
    const data = {}
    for (const key in mapping) {
      try {
        if (mapping.hasOwnProperty(key)) {
          const resolver = mapping[key]
          if (typeof resolver === 'string' || Array.isArray(resolver)) {
            data[key] = get(resource, resolver)
          } else if (resolver.constructor.name === 'AsyncFunction') {
            const resolveFn = resolver.bind(this)
            data[key] = await resolveFn(resource)
          } else if (typeof resolver === 'function') {
            const resolveFn = resolver.bind(this)
            data[key] = resolveFn(resource)
          } else if (typeof resolver === 'object') {
            data[key] = resolver
          }
        }
      } catch (error) {
        console.log(key, error)
      }
    }
    return data
  }

  getErrorMessage(status: number) {
    switch (status) {
      case 404:
      case 403:
        return 'Page not found'
      case 401:
        return 'Unauthorized'
      case 400:
        return 'Bad request'
      case 503:
      case 500:
        return 'Server is not available'
      default:
        return 'Error fetching data'
    }
  }

  handleError(debug, status: number = 500) {
    if (this.debug) {
      if (status === 404) {
        this.logger.info(this.getErrorMessage(status))
      } else {
        this.logger.error(debug)
      }
    }
    const getReturnStatus = code => {
      switch (code) {
        case 404:
        case 403:
          return 404
        default:
          return code
      }
    }
    return new TideApiError({
      status: getReturnStatus(status),
      message: this.getErrorMessage(status)
    })
  }
}