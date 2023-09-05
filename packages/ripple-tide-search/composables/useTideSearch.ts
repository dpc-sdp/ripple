import { ref, computed, onMounted, watch } from 'vue'
// IMPORTANT: Need to use useRoute from vue-router here instead of the nuxt one from #imports after nuxt 3.6.5
// The nuxt version of the route stopped being watchable after the update.
// See this issue for details: https://github.com/nuxt/nuxt/issues/14595
import { useRoute, RouteLocation } from 'vue-router'
import {
  useAppConfig,
  useRuntimeConfig,
  navigateTo,
  getSingleQueryStringValue
} from '#imports'
import type { TideSearchListingPage } from './../types'

const escapeJSONString = (raw: string): string => {
  return `${raw}`
    .replace(/[\\]/g, '\\\\')
    .replace(/["]/g, '\\"')
    .replace(/[/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t')
}

export default (
  queryConfig: TideSearchListingPage['queryConfig'],
  userFilterConfig: TideSearchListingPage['userFilters'],
  globalFilters: any[],
  searchResultsMappingFn: (item: any) => any,
  searchListingConfig: TideSearchListingPage['searchListingConfig'],
  customIndex?: TideSearchListingPage['index']
) => {
  const { public: config } = useRuntimeConfig()
  const route: RouteLocation = useRoute()
  const appConfig = useAppConfig()

  const index = customIndex || config.tide.appSearch.engineName

  const processTemplate = (
    obj: Record<string, any>,
    key: string,
    value: string
  ) => {
    const escapedValue = escapeJSONString(value)

    const re = new RegExp(key, 'g')
    return JSON.parse(JSON.stringify(obj).replace(re, escapedValue))
  }

  const isBusy = ref(true)
  const searchError = ref(null)

  const searchTerm = ref('')
  const filterForm = ref({})
  const page = ref(1)
  const pageSize = ref(searchListingConfig.resultsPerPage || 10)

  const results = ref()
  const totalResults = ref(0)
  const suggestions = ref([])

  const pagingStart = computed(() => {
    return (page.value - 1) * pageSize.value
  })

  const pagingEnd = computed(() => {
    const maximumPageEnd = pagingStart.value + (pageSize.value - 1)

    return Math.min(totalResults.value - 1, maximumPageEnd)
  })

  const totalPages = computed(() => {
    return pageSize.value ? Math.ceil(totalResults.value / pageSize.value) : 0
  })
  const onAggregationUpdateHook = ref()

  const getQueryClause = () => {
    if (searchTerm.value) {
      return processTemplate(queryConfig, '{{query}}', searchTerm.value)
    }
    return [{ match_all: {} }]
  }

  const getFilterClause = () => {
    const _filters = [] as any[]
    if (globalFilters && globalFilters.length > 0) {
      _filters.push(...globalFilters)
    }
    if (userFilters.value.length > 0) {
      _filters.push(...userFilters.value)
    }
    return _filters
  }

  const getAggregations = () => {
    if (Array.isArray(userFilterConfig) && userFilterConfig.length > 0) {
      const aggregations = userFilterConfig.reduce((aggs, currentFilter) => {
        if (currentFilter.aggregations?.source === 'elastic') {
          aggs = {
            ...aggs,
            [`${currentFilter.id}`]: {
              terms: {
                field: currentFilter.aggregations.field,
                order: { _key: 'asc' },
                size: currentFilter.aggregations.size || 30
              }
            }
          }
        }
        return aggs
      }, {})

      return Object.keys(aggregations).length ? aggregations : undefined
    }

    return undefined
  }

  const getSortClause = () => {
    if (searchListingConfig.customSort) {
      return searchListingConfig.customSort
    }
    return [
      {
        _score: 'desc'
      },
      {
        _doc: 'desc'
      }
    ]
  }

  const userFilters = computed(() => {
    const filterValues = { ...filterForm.value, ...getFallbackValues() }

    return Object.keys(filterValues).map((key: string) => {
      const itm = userFilterConfig.find((itm: any) => itm.id === key)
      let filterVal = filterValues[key]

      if (itm.filter?.multiple !== false) {
        filterVal = filterValues[key] && Array.from(filterValues[key])
      }

      // Need to work out if form has value - will be different for different controls
      const hasValue = (v: unknown) => {
        if (itm.component === 'TideSearchFilterDropdown') {
          return Array.isArray(v) && v.length > 0
        }
        return v
      }

      if (itm.filter && hasValue(filterVal)) {
        /**
         * Raw ES Filter clause from Tide config, replaces {{value}} with user value
         */
        if (itm.filter.type === 'raw') {
          const re = new RegExp('{{value}}', 'g')
          const result = itm.filter.value.replace(re, JSON.stringify(filterVal))
          return JSON.parse(result)
        }

        /**
         * The ES prefix query expects a single value
         */
        if (itm.filter.type === 'prefix') {
          return {
            prefix: {
              [`${itm.filter.value}`]: {
                value: Array.isArray(filterVal) ? filterVal[0] : filterVal
              }
            }
          }
        }

        /**
         * Term and Terms querys - To simplify things we transform all term queries into terms queries with a single value array
         *   - Term query: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html
         *   - Terms query: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html
         */
        if (itm.filter.type === 'term' || itm.filter.type === 'terms') {
          return {
            terms: {
              [`${itm.filter.value}`]: Array.isArray(filterVal)
                ? filterVal
                : [filterVal]
            }
          }
        }

        /**
         * Call a function passed from app.config to to allow extending and overriding. The function should
         * return a valid DSL query.
         * When called the function is passed the filter config and the value of the filter from the user
         *
         * In the nuxt app.config, the function is provided like this:
         * {
         *   ripple: {
         *     search: {
                  exampleFunction: (filterConfig, values) => {
                    return {
                      ... some DSL query
                    }
                  }
         *      }
         *    }
         * }
         */
        if (itm.filter.type === 'function') {
          const filterFuncs = appConfig?.ripple?.search?.filterFunctions || {}
          const fn = filterFuncs[itm.filter.value]

          if (typeof fn !== 'function') {
            throw new Error(
              `Search listing: No matching filter function called "${itm.filter.value}"`
            )
          }

          return fn(itm, filterVal)
        }
      }
    })
  })

  const getQueryDSL = () => {
    return {
      query: {
        bool: {
          must: getQueryClause(),
          filter: getFilterClause()
        }
      },
      size: pageSize.value,
      from: pagingStart.value,
      sort: getSortClause()
    }
  }

  const getQueryDSLForAggregations = () => {
    return {
      query: {
        match_all: {}
      },
      size: 1,
      from: 0,
      sort: getSortClause(),
      aggs: getAggregations()
    }
  }

  const getSearchResults = async (isFirstRun) => {
    isBusy.value = true
    searchError.value = null

    try {
      const body = getQueryDSL()

      if (process.env.NODE_ENV === 'development') {
        console.info(JSON.stringify(body, null, 2))
      }

      const searchRequest: any = $fetch(
        `${config.apiUrl}/api/tide/search/${index}/elasticsearch/_search`,
        {
          method: 'POST',
          body
        }
      )

      // Set the aggregations request to a resolved promise, this helps keep the Promise.all logic clean
      let aggsRequest: Promise<any> = Promise.resolve()

      if (isFirstRun) {
        // Kick off an 'empty' search in order to get the aggregations (options) for the dropdowns, this
        // is only run once so that the aggregations don't change when filters/search is applied.
        aggsRequest = $fetch(
          `${config.apiUrl}/api/tide/search/${index}/elasticsearch/_search`,
          {
            method: 'POST',
            body: getQueryDSLForAggregations()
          }
        )
      }

      const [searchResponse, aggsResponse] = await Promise.all([
        searchRequest,
        aggsRequest
      ])

      totalResults.value = searchResponse?.hits?.total?.value || 0
      results.value = searchResponse.hits?.hits.map(searchResultsMappingFn)

      if (isFirstRun && aggsResponse.aggregations) {
        const mappedAggs = Object.keys(aggsResponse.aggregations).reduce(
          (aggs, key) => {
            return {
              ...aggs,
              [`${key}`]: aggsResponse.aggregations[key].buckets.map(
                (bkt) => bkt.key
              )
            }
          },
          {}
        )
        onAggregationUpdateHook.value(mappedAggs)
      }

      isBusy.value = false
    } catch (error) {
      console.error(error)
      searchError.value = error
      isBusy.value = false
    }
  }

  const getSuggestions = async () => {
    suggestions.value = await $fetch(
      `/api/tide/search/${index}/query_suggestion`,
      {
        method: 'POST',
        body: {
          query: searchTerm.value,
          types: {
            documents: {
              fields: ['title']
            }
          },
          size: 4
        }
      }
    ).then((res) => {
      return res.results?.documents.map(
        (doc: { suggestion: string }) => doc.suggestion
      )
    })
  }

  /**
   * Get any fallback values to be included in the search query
   *
   * This could be a plain string or a reference to function in app.config
   * { ripple: { search: fallbackValues: { currentDate: () => { return new Date() } } }}
   */
  const getFallbackValues = () => {
    if (!Array.isArray(userFilterConfig)) return {}

    const fallbackValues = appConfig?.ripple?.search?.fallbackValues || {}

    return userFilterConfig.reduce((acc, curr) => {
      if (curr?.filter?.fallbackValue && !filterForm.value?.[curr.id]) {
        const fallback = curr.filter.fallbackValue

        const value =
          typeof fallbackValues[fallback] === 'function'
            ? fallbackValues[fallback]()
            : fallback

        acc = { ...acc, [curr.id]: value }
      }

      return acc
    }, {})
  }

  /**
   * Updates the URL to trigger a new search, always returns to page 1 to avoid empty pages
   */
  const submitSearch = async () => {
    const filterFormValues = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filterForm.value).filter(([key, value]) => value)
    )

    await navigateTo({
      path: route.path,
      query: {
        page: 1,
        q: searchTerm.value || undefined,
        ...filterFormValues
      }
    })
  }

  /**
   * Navigates to a specific page using the search term and filters in the current URL
   */
  const goToPage = async (newPage: number) => {
    await navigateTo({
      ...route,
      query: {
        ...route.query,
        page: newPage
      }
    })
  }

  const getFiltersFromRoute = (newRoute: RouteLocation) => {
    // Re-construct the filter form values from the URL, we find every query param that matches
    // a user filter, then construct the filter values based on that.
    return Object.keys(newRoute.query)
      .filter((key) => userFilterConfig.some((filter) => filter.id === key))
      .reduce((obj, key) => {
        let parsedValue = newRoute.query[key]
        const filterConfig = userFilterConfig.find(
          (filter) => filter.id === key
        )

        if (filterConfig.component === 'TideSearchFilterDropdown') {
          parsedValue = Array.isArray(parsedValue) ? parsedValue : [parsedValue]
        }

        return {
          ...obj,
          [key]: parsedValue
        }
      }, {})
  }

  /**
   * The URL is the source of truth for what is shown in the search results.
   *
   * When the URL changes, the URL is parsed and the query is transformed into an elastic DSL query.
   */
  const searchFromRoute = (newRoute: RouteLocation, isFirstRun = false) => {
    searchTerm.value = getSingleQueryStringValue(newRoute.query, 'q') || ''
    page.value =
      parseInt(getSingleQueryStringValue(newRoute.query, 'page'), 10) || 1

    filterForm.value = getFiltersFromRoute(newRoute)

    getSearchResults(isFirstRun)
  }

  const appliedFilters = computed(() => {
    return getFiltersFromRoute(route)
  })

  onMounted(() => {
    // Read the url on first mount to kick of the initial search
    searchFromRoute(route, true)
  })

  // Subsequently watch for any route changes and trigger a new search
  watch(route, (newRoute) => {
    searchFromRoute(newRoute, false)
  })

  return {
    isBusy,
    searchError,
    getSearchResults,
    getSuggestions,
    onAggregationUpdateHook,
    searchTerm,
    results,
    suggestions,
    filterForm,
    appliedFilters,
    submitSearch,
    goToPage,
    page,
    pageSize,
    totalResults,
    totalPages,
    pagingStart,
    pagingEnd
  }
}
