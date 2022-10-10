import HttpClient from './http-client.js'
import Logger from './lib/api-logger.js'
import { get } from 'lodash-es'
import type { RplTideModuleConfig } from './../../types'

export default class TideApiBase extends HttpClient {
  debug: boolean | undefined
  logger: Logger
  constructor(config: RplTideModuleConfig) {
    if (!config) {
      throw new Error('Error - No configuration specified')
    }
    super({
      client: config.client,
      baseUrl: `${config.contentApi.baseUrl}${config.contentApi.apiPrefix}`,
      auth: config.contentApi.auth
    })
    this.debug = config.debug
    this.logger = new Logger()
  }

  async getMappedData(mapping = {}, resource = {}) {
    if (!mapping || !resource) {
      this.handleError(
        'Error: Unable to retrieve data from mapping' + mapping,
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

  async get(url: string, config = {}) {
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

  handleError(msg = 'error', status = 500) {
    if (this.debug) {
      if (status === 404) {
        this.logger.info(this.getErrorMessage(status))
      } else {
        this.logger.error(msg)
      }
    }
    const getReturnStatus = (code: number) => {
      switch (code) {
        // obscure 403 errors to prevent leaking existence of secure pages
        case 404:
        case 403:
          return 404
        default:
          return code
      }
    }
    return {
      status: getReturnStatus(status),
      message: this.getErrorMessage(status),
      debug: this.debug && msg // only return debug info if enabled
    }
  }
}
