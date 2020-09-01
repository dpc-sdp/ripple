import axios from 'axios'
import qs from 'qs'
import logger from './logger'

export default class TideSearchApi {
  constructor (config) {
    this.client = axios.bind(axios)
    this.baseURL = config.baseURl || `http://localhost:3000/search/v1`
  }

  setClient (client) {
    this.client = client
  }

  async search (url, params) {
    try {
      const config = {
        method: 'get',
        baseURL: this.baseURL,
        url,
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
          'TIDE_API_HEADER': 'elastic',
          'Content-Type': 'application/json'
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        },
        params
      }
      const response = await this.client(config)

      if (process.env.SEARCH_LOG === 'trace') {
        logger.debug('Search API req URL:', axios.getUri(config), { label: 'Tide' })
      }

      if (response.data) {
        return response.data
      }
    } catch (e) {
      logger.error('Search API error', e.message, { label: 'TideSearch' })
      return false
    }
  }
}
