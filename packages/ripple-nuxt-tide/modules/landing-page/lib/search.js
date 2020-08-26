import axios from 'axios'
import qs from 'qs'
import get from 'lodash.get'
export default {
  /**
   * Can be used for test mocking.
   */
  client: axios.bind(axios),
  /**
   * Perform Elasticsearch request via middleware AJAX request.
   * @param {Object} queryDSL Elasticsearch query DSL
   */
  getQueryParams (settings) {
    if (settings) {
      const queryParams = {
        type: settings.content_type || 'all'
      }

      if (settings.filters) {
        queryParams.filters = settings.filters
      }
      if (settings.sort) {
        queryParams.sort = settings.sort
      }
      if (settings.sort) {
        queryParams.sort = settings.sort
      }

      return queryParams
    }
  },
  async search (settings) {
    const params = this.getQueryParams(settings)
    console.log('params', params)
    try {
      const response = await this.client({
        method: 'get',
        baseURL: 'http://localhost:3000/api/v2/search',
        url: '/collection',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
          'Content-Type': 'application/json'
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        },
        params
      })
      return this.mapResults(response.data.results, settings)
    } catch (e) {
      console.log('Elastic Search Error', e)
      return false
    }
  },
  async mapResults (results, settings) {
    console.log('RESULTS', results)
    if (results && Array.isArray(results)) {
      return results.map(item => {
        const result = {
          title: get(item, ['title', 0], ''),
          summary: get(item, ['summary_processed', 0], ''),
          image: get(item, ['field_media_image_absolute_path', 0], '')
        }
        if (settings.content_type) {
          switch (settings.content_type) {
            case 'event':
              return {
                ...result,
                date: ''
              }
            default:
              return result
          }
        }
      })
    }
    return results
  }
}
