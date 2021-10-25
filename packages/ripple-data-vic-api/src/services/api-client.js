import qs from 'qs'
import get from 'lodash.get'
import jsonapiParse from 'jsonapi-parse'
import Axios from 'axios'
import axiosRetry from 'axios-retry'
import ApiError from './../utils/api-error'
import logger from './../utils/api-logger'

export default class ApiClient {
  constructor (config) {
    if (!config) {
      throw new Error('Error - No configuration specified')
    }
    this.config = config
    const headers = {}
    this.client = Axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 4000,
      auth: config.auth,
      headers,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets', indices: false })
      }
    })
    this.logLevel = this.config.logLevel
    this.debug = this.config.logLevel === 'development'
    
    this.logger = logger
    this.utils = {
      jsonapiParse,
      get
    }

    this.configureResHandler()
    this.configureReqHandler()

    axiosRetry(this.client, {
      retries: 10,
      retryCondition: error => {
        if (error.code === 'ECONNABORTED') {
          if (this.debug) {
            this.logger.info(
              `request ${error.config.url} timed out after ${error.config.timeout}ms`
            )
          }
          return true
        }
      },
      shouldResetTimeout: true,
      retryDelay: () => 500
    })
  }

  async get (url, config = {}) {
    if (this.debug) {
      this.logger.info(
        `Req - ${this.client.defaults.baseURL}${this.client.getUri({
          url,
          ...config
        })}`
      )
    }
    return this.client.get(url, config)
  }

  getFeatureFlag (flag) {
    if (
      !this.config ||
      !this.config.featureFlags ||
      !this.config.featureFlags.hasOwnProperty(flag)
    ) {
      return false
    }
    return this.config.featureFlags[flag]
  }

  async getMappedData (mapping, resource) {
    if (!mapping || !resource) {
      throw new ApiError({
        message: 'Error: Unable to retrive data from mapping' + mapping,
        status: 500
      })
    }
    const data = {}
    for (const key in mapping) {
      try {
        if (mapping.hasOwnProperty(key)) {
          const resolver = mapping[key]
          if (typeof resolver === 'string' || Array.isArray(resolver)) {
            data[key] = this.utils.get(resource, resolver)
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
        throw new ApiError({
          message: 'Error: mapping data',
          status: 500
        })
      }
    }
    return data
  }

  middlewareProcessor (...middlewares) {
    // https://muniftanjim.dev/blog/basic-middleware-pattern-in-javascript/
    const stack = middlewares
    const push = (...middlewares) => {
      stack.push(...middlewares)
    }
    const execute = async (context) => {
      let prevIndex = -1
      const runner = async (index) => {
        if (index === prevIndex) {
          throw new Error('next() called multiple times')
        }
        prevIndex = index
        const middleware = stack[index]
        if (middleware) {
          await middleware(context, () => {
            return runner(index + 1)
          })
        }
      }
      await runner(0)
    }
    return { push, execute }
  }

  configureReqHandler () {
    this.client.interceptors.request.use(
      config => {
        // Do something before request is sent
        return config
      },
      error => {
        // Do something with request error
        return this.handleError(error)
      }
    )
  }
  configureResHandler () {
    this.client.interceptors.response.use(
      res => {
        if (res && res.headers && res.headers[this.cacheHeader]) {
          this.setCacheTags(res.headers[this.cacheHeader])
        }
        if (res.data) {
          return res.data
        }
      },
      error => {
        return Promise.reject(
          this.handleError(
            {
              url:
                error.config &&
                `${error.config.baseURL}${this.client.getUri(error.config)}`,
              error: error.message,
              detail: error.response.data && error.response.data.errors && error.response.data.errors.map(err => err.detail).join('/n'),
              headers: error.response && error.response.headers
            },
            error.response ? error.response.status : 500
          )
        )
      }
    )
  }

  getErrorMessage (status) {
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

  handleError (debug, status = 500) {
    if (this.debug || this.logLevel === 'warning') {
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
    return new ApiError({
      status: getReturnStatus(status),
      message: this.getErrorMessage(status),
      debug
    })
  }
}
