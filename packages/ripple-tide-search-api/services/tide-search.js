import { Client } from '@elastic/elasticsearch'
import templates from './templates'

export default class SearchApi {
  constructor (config) {
    this.client = new Client({
      node: config.tide.search.url,
      auth: config.tide.search.auth
    })
    this.site = config.tide.site
    this.index = config.tide.search.index
    const customTemplates = config.tide.search && config.tide.search.templates ? config.tide.search.templates : {}
    this.templates = {
      ...templates,
      ...customTemplates
    }

    this.client.on('response', (err, result) => {
      const { id } = result.meta.request
      if (process.env.SEARCH_LOG === 'trace') {
        // TODO - this should be logged somewhere
        console.log({ error: err, reqId: id, request: result.meta.request.params })
      }
    })
  }

  async search (query, options) {
    return this.client.search({
      index: this.index,
      body: {
        query,
        ...options
      }
    }).then(res => {
      if (res && res.body.hits) {
        return this.mapResults(res.body)
      }
    })
  }

  getSearchParams (params) {
    if (params.aggregations) {
      params.aggs = this.getAggregationsByFields(params.aggregations)
      delete params.aggregations
    } else {
      params.aggs = {}
    }
    if (!params.includeFilters || !Array.isArray(params.includeFilters)) {
      params.includeFilters = []
    } else if (Array.isArray(params.includeFilters) && !params.includeFilters.find(filter => filter.terms && filter.terms.field_node_site)) {
      params.includeFilters.push({
        term: {
          field_node_site: params.site
        }
      })
    }
    if (!params.excludeFilters) {
      params.excludeFilters = []
    }
    return params
  }

  getQuery (templateName, params) {
    if (this.templates.hasOwnProperty(templateName)) {
      if (this.templates[templateName].hasOwnProperty('requestMapping') && typeof this.templates[templateName].requestMapping === 'function') {
        return this.templates[templateName].requestMapping(params)
      } else if (typeof this.templates[templateName] === 'function') {
        return this.templates[templateName](params)
      }
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

  async searchByTemplate (template, params, reqHeaders = {}, isDev) {
    if (this.templates.hasOwnProperty(template)) {
      const searchQuery = this.getQuery(template, params)
      const headers = {}
      if (reqHeaders.tide_search_request_id) {
        headers['TIDE_SEARCH_REQUEST_ID'] = reqHeaders.tide_search_request_id
      }

      return this.client.search({
        index: this.index,
        body: searchQuery
      },
      {
        ignore: [400, 404],
        headers,
        id: reqHeaders.tide_search_request_id
      })
        .then(async ({ err, body, statusCode }) => {
          if (statusCode === 200 && body) {
            if (body) {
              const results = await this.mapResults(body, template)
              return results
            }
          } else {
            return {
              error: true,
              status: statusCode,
              debug: {
                err,
                request: {
                  source: searchQuery,
                  params
                }
              }
            }
          }
        })
    } else {
      return this.client.renderSearchTemplate({
        index: this.index,
        id: template,
        body: {
          params
        }
      }, { ignore: [400, 404] })
        .then(res => {
          if (res.statusCode === 200 && res.body) {
            if (res.body) {
              return this.mapResults(res.body)
            }
          } else {
            return {
              error: true,
              status: res.statusCode,
              debug: {
                err: res.err,
                request: {
                  template,
                  params
                }
              }
            }
          }
        })
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
