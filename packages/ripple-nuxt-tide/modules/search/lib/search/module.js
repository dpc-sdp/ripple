import service from './service'
import isEqual from 'lodash/isEqual'
import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'
// Calls to search.
let i = 0

const debug = function (searchLog) {
  let logging = false
  if ((process.server || process.env.NODE_ENV === 'development') &&
      searchLog === 'trace') {
    logging = true
  }
  return logging
}

export default (config, router, site) => ({
  logging: debug(config.log),
  info: async function () {
    const client = await service.getClient(config)
    const info = await service.api.info(client)
    return info
  },
  /**
   * Interface for the Elasticsearch js API.
   *
   * @param {Object}    options                 Relating directly to this search.
   * @param {Boolean}   options.currentSiteOnly If true restrict hits to the current site.
   * @param {Boolean}   options.defaultHits     If true return hits from a match_all query.
   * @param {Boolean}   options.responseSize    Number of hits on each page.
   * @param {Array}     options.qFields         Array of query fields
   * @param {Array}     options.sFields         Array of source fields
   * @param {Array}     options.filterFromURI   Array of fields to remove from URI
   * @param {Object}    options.exclude         (optional) Properties to exclude from hits.
   * @param {String}    options.exclude.type    The API entity type to exclude.
   * @param {String}    options.exclude.field   (optional) The API field_name. The API field_name. If set and a value exists, hits are excluded.
   * @param {String}    queryString
   * @param {Int}       page                    Used to calculate the start point for returned hits.
   * @param {Object}    filters                 filterForm arguments to refine search hits using a filter context.
   * @param {String}    filters.type            Type of query.
   * @param {Object}    filters.operator        (optional) The comparison operator to use.
   * @param {Array}     filters.values          Values to filter by.
   * @param {Array}     filters.fields          Fields to filter values against - these need to be passed in because even if the filter isn't being used it's values may need updating.
   * @param {Object}    filterFields            The forms input fields. Passed in so they can be updated based on search results.
   * @param {String}    docType                 Appends to the query as a type filter.
   * @param {Int}       size
   * @param {Object}    sort
   * @param {String}    index                   Elasticsearch index to query.
   *
   * @return {Promise<*>}
   */
  search: async function (options = { currentSiteOnly: true, defaultHits: false, responseSize: 10, qFields: [], sFields: [], filterFromURI: [] }, queryString = null, page = 0, filters = {}, filterFields = {}, docType = 'all', sort = null, index = config.index) {
    const client = await service.getClient(config)

    if (this.logging) {
      i++
      logger.info('Search refresh - call number %s', i, { label: 'Search' })
    }
    this.mergeSystemFilters(filters, {
      docType: docType,
      currentSiteOnly: options.currentSiteOnly
    })

    let from = this.getFromHit(page, options.responseSize)

    const hits = await service.api.search(client, index, queryString, filters, filterFields, options.qFields, options.sFields, from, options.responseSize, sort, options.exclude)

    // https://www.elastic.co/guide/en/elasticsearch/reference/7.10/breaking-changes-7.0.html#hits-total-now-object-search-response
    const totalhits = hits.hits.total.hasOwnProperty('value') ? hits.hits.total.value : hits.hits.total

    this.updateLocParams({
      q: queryString,
      filters: filters
    }, totalhits, from, options.responseSize, options.filterFromURI)

    if (totalhits > options.responseSize) {
      hits.totalSteps = Math.ceil(Number(totalhits) / options.responseSize)
    } else {
      hits.totalSteps = Math.floor(Number(totalhits) / options.responseSize)
    }
    return hits
  },
  /**
   * Helper to update the route query parameters to reflect queryString, filter
   * and page values.
   *
   * @param {Object}  updates   An object with key:value properties to map to the query.
   * @param {Int}     totalHits Count of search hit results. Used to determine validity of page query.
   * @param {Int}     from      Hit to start from. Used to determine validity of page query.
   * @param {Boolean} setQ      Remove the query.q param.
   */
  updateLocParams: function (updates, totalHits = null, from = null, responseSize, filterFromURI) {
    let queries = JSON.parse(JSON.stringify(router.currentRoute.query))
    // TODO: Work out why deleting the query param from the $route doesn't update
    // the uri when the same method works for filters.
    let popPage = false
    // If true the `page` query will be unset when page number is greater than result count.
    if (totalHits && from) {
      if (totalHits <= from) {
        popPage = true
      }
    }

    if (from === 0 && router.app.$route.query.page) {
      popPage = true
    }

    if (from > 0 && Number.isInteger(from / responseSize) && !popPage) {
      updates.page = (from / responseSize) + 1
    } else if (popPage && from === 0) {
      // TODO: Temporary hack until it can be worked out how to pop the page query from the
      // uri for the first page.
      updates.page = 1
    }

    if (router.app.$route.query.page && popPage) {
      delete router.app.$route.query.page
    }

    // delete filters that shouldn't be shown in uri
    if (updates.filters) {
      for (const key in updates.filters) {
        if (filterFromURI.includes(key)) {
          delete updates.filters[key]
        } else if (filterFromURI.includes('*')) {
          updates.filters = {}
        }
      }
    }

    if (!isEqual(updates, queries)) {
      if (updates.q === false) {
        delete updates.q
        delete queries.q
      }
      for (let updateProperty of Object.keys(queries)) {
        if (!Object.keys(updates).includes(updateProperty)) {
          delete queries[updateProperty]
        }
      }
      Object.assign(queries, updates)
      // TODO: Add a sort of `updates` so 'q' always comes first.
      if (this.logging) {
        logger.info('New query parameters: %s', JSON.stringify(queries), { label: 'Search' })
      }
      router.push({
        query: queries
      })
    }
  },
  getFormFields: function (filterForm) {
    const _fields = []
    const schema = filterForm.schema
    if (schema) {
      if (schema.groups) {
        schema.groups.forEach(group => {
          _fields.push(...group.fields)
        })
      }
      if (schema.fields) {
        _fields.push(...schema.fields)
      }
    }

    return _fields
  },
  setFilterOptions: async function (fieldMap = {}, index = config.index) {
    const client = await service.getClient(config)
    return service.api.getUniqueVals(client, fieldMap, index)
  },
  updateFilterOptions: function (filterForm, aggregations) {
    for (let filter of this.getFormFields(filterForm)) {
      if (aggregations[filter.model] && (filter.values.length > 0 && filter.type === 'rplchecklist') && (typeof filter.filter.computedFilter === 'undefined' || filter.filter.computedFilter === false)) {
        // Reset the array.
        filter.values = []
        for (let terms of aggregations[filter.model].buckets) {
          filter.values.push(terms.key)
        }
      }
    }
  },
  /**
   * Assigns filter values from the form.model object for search.
   *
   * @param   {Object} filterForm              All filters of the search form.
   *
   * @returns {Object} filters                 filterForm arguments to refine search hits using a filter context.
   * @returns {String} filters.type            Type of query.
   * @returns {Object} filters.operator        (optional) The comparison operator to use.
   * @returns {Array}  filters.values          Values to filter by.
   * @returns {Array}  filters.fields          Fields to filter values against - these need to be passed in because even if the filter isn't being used it's values may need updating.
   */
  getFiltersValues: function (filterForm) {
    const filters = {}
    const entries = Object.entries(filterForm.model)
    const fields = this.getFormFields(filterForm)

    for (let [key, value] of entries) {
      if (typeof value === 'undefined' || value === null) {
        continue
      }
      if (typeof value === 'string' && value === '') {
        continue
      }
      // if its an array, check it has a value
      if (Array.isArray(value) && value.length === 0) {
        continue
      }
      const field = fields.find(f => f.model === key)

      if (field) {
        filters[key] = {
          type: field.filter && field.filter.type,
          operator: field.filter && field.filter.operator,
          values: value,
          // Add geoQuery based keys.
          lat: field.filter && field.filter.lat,
          lon: field.filter && field.filter.lon,
          distance: field.filter && field.filter.distance
        }
      }
    }
    return filters
  },
  /**
   * Populate the filters from the router query.
   *
   * @param {Object}  searchForm
   * @param {Object}  query
   */
  setFiltersOnCreate: function (searchForm = {}, query = {}) {
    query = router.currentRoute.query
    searchForm.prefillSearchTerm = query.q || ''
    // Populate the filters.
    if (query.filters) {
      for (const filterName in query.filters) {
        const formFilter = searchForm.filterForm.model[filterName]

        if (typeof formFilter !== 'undefined') {
          const queryFilter = query.filters[filterName]
          const queryFilterType = Array.isArray(queryFilter) ? 'array' : typeof queryFilter

          switch (queryFilterType) {
            case 'string':
              if (!formFilter.includes(queryFilter)) {
                if (Array.isArray(formFilter)) {
                  formFilter.push(queryFilter)
                } else {
                  searchForm.filterForm.model[filterName] = queryFilter
                }
              }
              break
            case 'array':
              for (const queryFilterItem of queryFilter) {
                if (!formFilter.includes(queryFilterItem)) {
                  formFilter.push(queryFilterItem)
                }
              }
              break
            case 'object':
              if (Array.isArray(formFilter)) {
                if (Array.isArray(queryFilter.values)) {
                  queryFilter.values.forEach(item => {
                    if (!formFilter.includes(item)) {
                      formFilter.push(item)
                    }
                  })
                } else {
                  if (!formFilter.includes(queryFilter.values)) {
                    formFilter.push(queryFilter.values)
                  }
                }
              } else {
                searchForm.filterForm.model[filterName] = queryFilter.values
              }
              break
            default:
              console.warn('An unknown query filter was encountered.')
              break
          }
        }
      }
    }
  },
  getFromHit: function (page, responseSize) {
    let fromHit = 0
    if (page <= 1) {
      fromHit = 0
    } else {
      fromHit = ((page - 1) * responseSize)
    }
    return fromHit
  },

  /**
   * Merges any business logic filters into the filterForm filters.
   *
   * @param {Object} formFilters Filters from the search form.
   * @param {Object} businessFilters   Business logic filters.
   */
  mergeSystemFilters: function (formFilters, businessFilters) {
    let additionalFilters = {}
    for (let filter in businessFilters) {
      switch (filter) {
        case ('docType'):
          if (businessFilters.docType !== 'all') {
            additionalFilters.type = {
              type: 'term',
              values: [businessFilters.docType],
              fields: 'type'
            }
          }
          break
        case ('currentSiteOnly'):
          if (businessFilters.currentSiteOnly) {
            additionalFilters.field_node_site = {
              type: 'term',
              values: [site.toString()],
              fields: 'field_node_site'
            }
          }
          break
      }
    }

    return Object.assign(formFilters, additionalFilters)
  }
})
