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
    this.templates = {
      ...templates,
      ...config.templates
    }
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

  mapResults (body, debug = false) {
    if (body) {
      return {
        total: body.hits.total,
        results: body.hits.hits.map(hit => {
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
        aggregations: body.aggregations
      }
    }
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

  async searchByTemplate (template, params, isDev) {
    if (this.templates.hasOwnProperty(template)) {
      const templateParams = this.getSearchParams({ ...params, site: this.site })
      let searchTemplate = this.templates[template]
      if (typeof searchTemplate === 'function') {
        searchTemplate = this.templates[template](templateParams)
      }
      if (process.env.SEARCH_LOG === 'trace') {
        console.log('SEARCH TEMPLATE', JSON.stringify({ body: searchTemplate }, null, 2))
      }
      return this.client.search({
        index: this.index,
        body: searchTemplate
      }, { ignore: [400, 404] })
        .then(({ err, body, statusCode }) => {
          if (statusCode === 200 && body) {
            if (body) {
              return this.mapResults(body)
            }
          } else {
            return {
              error: true,
              status: statusCode,
              debug: {
                err,
                request: {
                  source: searchTemplate,
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
