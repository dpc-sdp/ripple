import axios, { AxiosInstance } from 'axios'
import qs from 'qs'
import { ILogger } from '../logger/logger.js'

export default class HttpClient {
  client: AxiosInstance
  logLabel: string
  logger: ILogger
  constructor(config, logger: ILogger) {
    if (config.client) {
      this.client = config.client
    } else {
      this.client = axios.create({
        baseURL: config.baseUrl,
        auth: config.auth,
        paramsSerializer: {
          serialize: (params) => {
            return qs.stringify(params, {
              arrayFormat: 'brackets',
              indices: false
            })
          }
        }
      })
    }

    this.logLabel = 'HttpClient'
    this.logger = logger

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  _initializeRequestInterceptor() {
    this.client.interceptors.request.use(
      (request) => {
        this.logger.debug(
          `${request.method?.toUpperCase()} request to ${this.client.getUri(
            request
          )}`,
          { label: this.logLabel }
        )
        return request
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  _initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          this.logger.error(
            `${error.request.method?.toUpperCase()} request failed with status ${
              error.response?.status
            } - ${error.response?.statusText}: ${error.config?.baseURL}${
              error.request.path
            }`,
            {
              label: this.logLabel
            }
          )
        } else {
          this.logger.error('Axios request failed', {
            label: this.logLabel
          })
        }
        return Promise.reject(error)
      }
    )
  }
}
