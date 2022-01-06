import axios from 'axios';
import qs from 'qs'

export default class HttpClient {
  constructor (config) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      auth: config.auth,
      paramsSerializer: function(params) {
        return qs.stringify(params, { arrayFormat: 'brackets', indices: false })
      }
    })

    this._initializeResponseInterceptor()
  }

  _initializeResponseInterceptor () {
    this.client.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  _handleResponse ({ data }) {
    return data
  }
  _handleError (error) {
    return Promise.reject(error)
  }
}
