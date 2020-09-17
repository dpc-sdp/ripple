import { Client } from '@elastic/elasticsearch'
import coreTemplates from './templates'

export default class SearchApi {
  constructor (config) {
    if (!config) {
      throw new Error('No configuration specified')
    }
    if (config.client) {
      this.client = config.client
      if (config.index) {
        this.index = config.index
      }
    } else if (config.tide && config.tide.search) {
      this.client = new Client({
        node: config.tide.search.url,
        auth: config.tide.search.auth
      })
      this.index = config.tide.search.index
    } else {
      throw new Error('No search configuration specified')
    }

    this.site = config.tide && config.tide.site

    const customTemplates = config.templates && typeof config.templates === 'object' ? config.templates : {}
    this.templates = {
      ...coreTemplates,
      ...customTemplates
    }

    if (config.log && config.log.level === 'trace') {
      this.client.on('response', (error, result) => {
        const { id } = result.meta.request
        // TODO - this should be logged somewhere
        if (!error) {
          console.log({ id, request: result.meta.request.params })
        } else {
          console.error({ error, id, request: result.meta.request.params })
        }
      })
    }
  }

  async search (body, headers, index = this.index) {
    return this.client.search({
      body,
      index
    }, headers)
  }

  async getQuery (templateName, params) {
    if (this.templates.hasOwnProperty(templateName)) {
      if (this.templates[templateName].hasOwnProperty('requestMapping')) {
        if (this.templates[templateName].requestMapping.constructor.name === 'AsyncFunction') {
          const response = await this.templates[templateName].requestMapping(params)
          return response
        } else if (typeof this.templates[templateName].requestMapping === 'function') {
          return this.templates[templateName].requestMapping(params)
        }
      }
      return Promise.reject(new Error(`No requestMapping found for ${templateName}`))
    }
  }

  async mapResults (res, templateName, debug = false) {
    if (this.templates.hasOwnProperty(templateName) && this.templates[templateName].hasOwnProperty('responseMapping')) {
      if (this.templates[templateName].responseMapping.constructor.name === 'AsyncFunction') {
        const response = await this.templates[templateName].responseMapping(res)
        return response
      } else if (typeof this.templates[templateName].responseMapping === 'function') {
        return this.templates[templateName].responseMapping(res)
      }
    }
    return {
      total: res.hits.total,
      results: res.hits.hits.map(hit => {
        if (debug) {
          return hit
        }
        return {
          _id: hit._id,
          _score: hit._score,
          _matched: hit.matched_queries,
          ...hit._source
        }
      }),
      aggregations: res.aggregations
    }
  }

  getHeaders (reqHeaders) {
    const headers = {}
    if (reqHeaders.tide_search_request_id) {
      headers['TIDE_SEARCH_REQUEST_ID'] = reqHeaders.tide_search_request_id
    }
    return headers
  }

  handleError (message, statusCode, meta) {
    const error = new Error(message)
    error.meta = meta
    error.statusCode = statusCode || 500
    return error
  }

  async searchByTemplate (template, params, reqHeaders = {}, isDev) {
    try {
      const headers = this.getHeaders(reqHeaders)
      const reqConfig = {
        headers,
        id: reqHeaders.tide_search_request_id
      }
      if (this.templates.hasOwnProperty(template)) {
        const searchQuery = await this.getQuery(template, params)
        const { body, statusCode } = await this.search(searchQuery, reqConfig)

        if (body && statusCode === 200) {
          const results = await this.mapResults(body, template)
          return results
        }
        throw this.handleError(`Error fetching search data`, statusCode, { searchQuery })
      }
      throw this.handleError(`Could not find the template ${template}`, 404)
    } catch (error) {
      return {
        error: true,
        status: error.statusCode,
        message: `${error.message}`,
        meta: error.meta
      }
    }
  }

  getAggregationsByFields (aggParams) {
    if (aggParams) {
      let aggFields = aggParams
      if (!Array.isArray(aggParams)) {
        aggFields = [aggParams]
      }

      if (Array.isArray(aggParams)) {
        const aggregations = {}
        aggFields.forEach(field => {
          if (typeof field === 'string') {
            aggregations[field] = {
              terms: {
                field,
                size: this.aggregationBucketLimit
              }
            }
          } else if (typeof field === 'object') {
            aggregations[field.field] = {
              terms: {
                ...field,
                size: this.aggregationBucketLimit
              }
            }
          }
        })
        return aggregations
      } else if (typeof aggParams === 'object') {
        return aggParams
      }
    }
  }
}
