import HttpClient from './http-client'
import TideApiError from './lib/api-error'
import Logger from './lib/api-logger.js'
import get from 'lodash.get'

export default class TideApi extends HttpClient {
  debug: boolean
  logger: Logger
  constructor(config) {
    if (!config) {
      throw new Error('Error - No configuration specified')
    }
    super({
      baseUrl: `${config.baseUrl}${config.apiPrefix}`,
      auth: config.auth
    })
    this.debug = config.debug
    this.logger = new Logger()
  }
  async getMappedData(mapping, resource) {
    if (!mapping || !resource) {
      this.handleError(
        'Error: Unable to retrive data from mapping' + mapping,
        500
      )
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
            data[key] = await this.getMappedData(resolver, resource)
          }
        }
      } catch (error) {
        console.log(key, error)
      }
    }
    return data
  }

  async get(url, config = {}) {
    if (this.debug) {
      this.logger.info(
        `Req - ${this.client.defaults.baseURL}${this.client.getUri({
          url,
          ...config
        })}`
      )
    }
    return this.client.get(url, { ...config })
  }

  getErrorMessage(status) {
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

  handleError(debug, status = 500) {
    if (this.debug) {
      if (status === 404) {
        this.logger.info(this.getErrorMessage(status))
      } else {
        this.logger.error(debug)
      }
    }
    const getReturnStatus = (code) => {
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
