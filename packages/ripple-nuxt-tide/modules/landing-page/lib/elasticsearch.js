const axios = require('axios')

export default {
  /**
   * Can be used for test mocking.
   */
  endpoint: axios.bind(axios),
  /**
   * Perform Elasticsearch request via middleware AJAX request.
   * @param {Object} queryDSL Elasticsearch query DSL
   */
  async search (queryDSL) {
    console.log('queryDSL', queryDSL)
    const data = {
      ...queryDSL.body,
      _source: queryDSL['_source'],
      from: queryDSL['from'],
      size: queryDSL['size']
    }
    try {
      const response = await this.endpoint({
        method: 'post',
        baseURL: 'https://' + process.env.SEARCH_HASH + '.' + process.env.SEARCH_URL,
        url: `/${process.env.SEARCH_INDEX}/_search`,
        responseType: 'json',
        responseEncoding: 'utf8',
        data,
        auth: {
          username: process.env.SEARCH_AUTH_USERNAME,
          password: process.env.SEARCH_AUTH_PASSWORD
        }
      })
      return response.data
    } catch (e) {
      console.log('Elastic Search Error', e)
      return false
    }
  }
}
