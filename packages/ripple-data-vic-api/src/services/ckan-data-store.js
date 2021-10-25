// https://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=${RESOURCEID}&limit=10&sort=waitPeriod
import ApiClient from './api-client'
import ApiError from './../utils/api-error'
import { getResultsFromMiddleware } from './../middleware'
export default class CkanDataStoreApi extends ApiClient {
  constructor (config) {
    super(config)
    this.reqUrl = 'action/datastore_search'
    this.resources = config.resources
    this.limit = 10000
  }

  async getByResourceName (name, query) {
    if (!name || !this.resources.hasOwnProperty(name) || !this.resources[name].hasOwnProperty('id')) {
      throw new ApiError({ message: 'Error: Resource not found', status: 404 })
    }
    const resource = this.resources[name]
    const hasMiddleware = resource && resource.hasOwnProperty('middleware') && Array.isArray(resource.middleware) && resource.middleware.length > 0
    const headers = {}
    if (resource.auth && this.config.ckan.apiKey) {
      headers.Authorization = this.config.ckan.apiKey
    }

    let params = {}
    if (!hasMiddleware) {
      params = query
    } else {
      params.limit = this.limit
    }
    try {
      const response = await this.get(`${this.reqUrl}?resource_id=${resource.id}`, {
        params,
        headers,
        baseURL: resource.baseUrl
      })
      if (response && response.success) {
        const total = response.result.total
        const results = response.result.records
        if (hasMiddleware) {
          return getResultsFromMiddleware(resource.middleware, { results, query, total })
        }
        return {
          total,
          results
        }
      }
    } catch (error) {
      throw new ApiError({ message: 'Error fetching ckan data', status: 500 }, error) 
    }
  }
}
