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
import type { TideSearchListingConfig } from './../types'

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

const encodeCommasAndColons = (value: string): string => {
  return value.replace(/[:|,]/g, function (match) {
    return '%' + match.charCodeAt(0).toString(16)
  })
}

interface Config {
  queryConfig: TideSearchListingConfig['queryConfig']
  userFilters: TideSearchListingConfig['userFilters']
  globalFilters: any[]
  searchResultsMappingFn: (item: any) => any
  searchListingConfig: TideSearchListingConfig['searchListingConfig']
  sortOptions?: TideSearchListingConfig['sortOptions']
  includeMapsRequest?: boolean
  mapResultsMappingFn?: (item: any) => any
  mapConfig?: any
  locationQueryConfig?: any
}

export default ({
  queryConfig,
  userFilters: userFilterConfig,
  globalFilters,
  searchResultsMappingFn,
  searchListingConfig,
  sortOptions = [],
  includeMapsRequest = false,
  mapResultsMappingFn = (item: any) => item,
  mapConfig = {},
  locationQueryConfig = {}
}: Config) => {
  const { public: config } = useRuntimeConfig()
  const route: RouteLocation = useRoute()
  const appConfig = useAppConfig()
  const index = searchListingConfig.index || config.tide.appSearch.engineName

  const searchprovider = searchListingConfig.searchProvider || 'app-search'
  const searchEndpoint =
    searchprovider === 'elasticsearch' ? `_search` : `elasticsearch/_search`
  const searchUrl = `${config.apiUrl}/api/tide/${searchprovider}/${index}/${searchEndpoint}`

  // Need to cache the current path on first load to check if we're navigating to another page when the route changes
  const initialPath = route.path

  const processTemplate = (
    obj: Record<string, any>,
    key: string,
    value: string
  ) => {
    const escapedValue = escapeJSONString(value)

    const re = new RegExp(key, 'g')
    return JSON.parse(JSON.stringify(obj).replace(re, escapedValue))
  }

  const activeTab: TideSearchListingTabKey = ref(
    searchListingConfig?.displayMapTab ? 'map' : null
  )

  const isBusy = ref(true)
  const searchError = ref(null)

  const locationQuery = ref(null)

  const searchTerm = ref('')
  const filterForm = ref({})
  const page = ref(1)
  const pageSize = ref(searchListingConfig.resultsPerPage || 10)

  const results = ref()
  const totalResults = ref(0)
  const suggestions = ref([])
  const userSelectedSort = ref(null)

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

  const mapResults = ref([])

  const onAggregationUpdateHook = ref()

  const getQueryClause = () => {
    if (searchTerm.value) {
      return processTemplate(queryConfig, '{{query}}', searchTerm.value)
    }
    return [{ match_all: {} }]
  }

  const getUserFilterClause = () => {
    const _filters = [] as any[]
    if (globalFilters && globalFilters.length > 0) {
      _filters.push(...globalFilters)
    }
    if (userFilters.value.length > 0) {
      _filters.push(...userFilters.value)
    }
    return _filters
  }

  const getLocationFilterClause = async () => {
    const transformFnName = locationQueryConfig?.dslTransformFunction
    const fns = appConfig?.ripple?.search?.locationDSLTransformFunctions || {}

    // If no transform function is defined, return an empty array
    if (!transformFnName) {
      return []
    }

    const transformFn = fns[transformFnName]

    if (typeof transformFn !== 'function') {
      throw new Error(
        `Search listing: No matching location transform function called "${transformFnName}"`
      )
    }

    const transformedDSL = await transformFn(locationQuery.value)
    const listingFilters = transformedDSL?.listing?.filter || []

    // return transformedDSL as an array to match the format of the other filters, transformedDSL might not be an array
    return Array.isArray(listingFilters) ? listingFilters : [listingFilters]
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
    if (userSelectedSort.value) {
      const selected = sortOptions?.find(
        (itm) => itm.id === userSelectedSort.value
      )

      if (selected) {
        return selected.clause
      }
    }

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
        if (
          itm.component === 'TideSearchFilterDropdown' &&
          itm?.props?.multiple
        ) {
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
         * Dependent queries - create a custom query based off the values of a parent and child field combo
         */
        if (itm.filter.type === 'dependent') {
          const parent = filterVal?.[`${itm?.id}-parent`]
          const child = filterVal?.[`${itm?.id}-child`]

          // If we're searching for specific subcategories, let's use those subcategories
          if (child?.length) {
            return {
              terms: {
                [itm?.filter?.value]: Array.isArray(child) ? child : [child]
              }
            }
          }

          // Otherwise we'll search for the selected parent category and all subcategories
          if (parent) {
            const parentID = itm.props.options?.find(
              (i) => i.value === parent
            )?.id

            return {
              terms: {
                [itm?.filter?.value]: itm.props.options
                  ?.filter(
                    (option) =>
                      option.parent === parentID || option.id === parentID
                  )
                  .map((i) => i.value)
              }
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

  const getQueryDSL = async () => {
    const locationFilters = await getLocationFilterClause()

    return {
      query: {
        bool: {
          must: getQueryClause(),
          filter: [...getUserFilterClause(), ...locationFilters]
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
        bool: {
          must: [{ match_all: {} }],
          filter: globalFilters
        }
      },
      size: 0,
      from: 0,
      sort: getSortClause(),
      aggs: getAggregations()
    }
  }

  const getQueryDSLForMaps = async () => {
    return {
      query: {
        bool: {
          must: getQueryClause(),
          filter: getUserFilterClause()
        }
      },
      // ES queries have a 10k result limit, maps struggle drawing more than this anyway. If you need more you will need to implement a loading strategy see : https://openlayers.org/en/latest/apidoc/module-ol_loadingstrategy.html
      size: 10000,
      from: 0,
      sort: getSortClause()
    }
  }

  const getSearchResults = async (isFirstRun) => {
    isBusy.value = true
    searchError.value = null

    try {
      const body = await getQueryDSL()

      if (process.env.NODE_ENV === 'development') {
        console.info(JSON.stringify(body, null, 2))
      }

      const searchRequest: any = $fetch(searchUrl, {
        method: 'POST',
        body
      })

      // Set the aggregations and maps request to a resolved promise by default, this helps keep the Promise.all logic clean
      let aggsRequest: Promise<any> = Promise.resolve()
      let mapsRequest: Promise<any> = Promise.resolve()

      if (isFirstRun) {
        // Kick off an 'empty' search in order to get the aggregations (options) for the dropdowns, this
        // is only run once so that the aggregations don't change when filters/search is applied.

        aggsRequest = $fetch(searchUrl, {
          method: 'POST',
          body: getQueryDSLForAggregations()
        })
      }

      if (activeTab.value === 'map') {
        mapsRequest = $fetch(searchUrl, {
          method: 'POST',
          body: await getQueryDSLForMaps()
        })
      }

      const [searchResponse, aggsResponse, mapsResponse] = await Promise.all([
        searchRequest,
        aggsRequest,
        mapsRequest
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

      if (mapsResponse && mapsResponse.hits) {
        mapResults.value = mapsResponse.hits?.hits.map(mapResultsMappingFn)
      }

      isBusy.value = false
    } catch (error) {
      console.error(error)
      searchError.value = error
      isBusy.value = false
    }
  }

  const getSuggestions = async () => {
    let fields = ['title']

    if (searchListingConfig?.suggestions?.key) {
      fields = Array.isArray(searchListingConfig.suggestions.key)
        ? searchListingConfig.suggestions.key
        : [searchListingConfig.suggestions.key]
    }

    suggestions.value = await $fetch(
      `/api/tide/app-search/${index}/query_suggestion`,
      {
        method: 'POST',
        body: {
          query: searchTerm.value,
          types: {
            documents: {
              fields
            }
          },
          size: 8
        }
      }
    ).then((res) => {
      return res.results?.documents.map(
        (doc: { suggestion: string }) => doc.suggestion
      )
    })
  }

  const clearSuggestions = () => {
    suggestions.value = []
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
      Object.entries(filterForm.value)
        .map(([key, value]) => {
          const filterConfig = userFilterConfig.find(
            (itm: any) => itm.id === key
          )

          if (filterConfig.component === 'TideSearchFilterDependent') {
            const parent = value[`${filterConfig.id}-parent`]
            const child = value[`${filterConfig.id}-child`]
            value = null

            if (parent) {
              value = encodeCommasAndColons(parent)

              if (child) {
                const childValue = Array.isArray(child) ? child : [child]

                value = `${value}:${childValue
                  .map(encodeCommasAndColons)
                  .join(',')}`
              }
            }
          }

          return [key, value]
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([key, value]) => value)
    )

    // flatten locationQuery into an object for adding to the query string
    const locationParams = Object.entries(locationQuery.value || {}).reduce(
      (obj, [key, value]) => {
        return {
          ...obj,
          [`location[${key}]`]: value
        }
      },
      {}
    )

    await navigateTo({
      path: route.path,
      query: {
        page: 1,
        q: searchTerm.value || undefined,
        activeTab: activeTab.value,
        ...locationParams,
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

  const changeSortOrder = async (newSortId: string) => {
    await navigateTo({
      ...route,
      query: {
        ...route.query,
        page: 1,
        sort: newSortId
      }
    })
  }

  const changeActiveTab = async (newActiveTab: string) => {
    await navigateTo({
      ...route,
      query: {
        ...route.query,
        activeTab: newActiveTab
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

        if (
          filterConfig.component === 'TideSearchFilterDropdown' &&
          filterConfig?.props?.multiple
        ) {
          parsedValue = Array.isArray(parsedValue) ? parsedValue : [parsedValue]
        }

        if (filterConfig.component === 'TideSearchFilterDependent') {
          const [parent, child = ''] = parsedValue.split(':')

          parsedValue = {
            [`${filterConfig.id}-parent`]: decodeURIComponent(parent)
          }

          if (child) {
            const childValue = child.split(',').map(decodeURIComponent)

            parsedValue = {
              ...parsedValue,
              [`${filterConfig.id}-child`]: filterConfig?.props?.multiple
                ? childValue
                : childValue[0]
            }
          }
        }

        return {
          ...obj,
          [key]: parsedValue
        }
      }, {})
  }

  const getLocationQueryFromRoute = (newRoute: RouteLocation) => {
    // parse the location query from the route
    const location = Object.keys(newRoute.query)
      .filter((key) => key.startsWith('location'))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key.replace('location[', '').replace(']', '')]: newRoute.query[key]
        }
      }, {})

    return location
  }

  /**
   * Resets the filters to their default values.
   *
   * This is mostly needed for grouped fields which must be set back to an object.
   */
  const resetFilters = (withValues = {}) => {
    const defaultValues = userFilterConfig.reduce((acc, curr) => {
      if (curr.component === 'TideSearchFilterDependent') {
        return { ...acc, [curr.id]: {} }
      }
      return { ...acc }
    }, {})

    filterForm.value = { ...defaultValues, ...withValues }
  }

  /**
   * The URL is the source of truth for what is shown in the search results.
   *
   * When the URL changes, the URL is parsed and the query is transformed into an elastic DSL query.
   */
  const searchFromRoute = (newRoute: RouteLocation, isFirstRun = false) => {
    activeTab.value = searchListingConfig?.displayMapTab
      ? getSingleQueryStringValue(newRoute.query, 'activeTab') || 'map'
      : null

    searchTerm.value = getSingleQueryStringValue(newRoute.query, 'q') || ''
    page.value =
      parseInt(getSingleQueryStringValue(newRoute.query, 'page'), 10) || 1
    userSelectedSort.value =
      getSingleQueryStringValue(newRoute.query, 'sort') ||
      sortOptions?.[0]?.id ||
      null

    const routeFilters = getFiltersFromRoute(newRoute)

    resetFilters(routeFilters)

    locationQuery.value = getLocationQueryFromRoute(newRoute)

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
    // When a user navigates to another page client side, this page will try to search again with an empty query string
    // The map was zooming back to center when navigating to another page, which was jarring. This check prevents that from happening
    if (initialPath !== newRoute.path) {
      return
    }

    searchFromRoute(newRoute, false)
  })

  return {
    isBusy,
    searchError,
    getSearchResults,
    getSuggestions,
    clearSuggestions,
    onAggregationUpdateHook,
    searchTerm,
    results,
    suggestions,
    filterForm,
    appliedFilters,
    resetFilters,
    submitSearch,
    goToPage,
    page,
    pageSize,
    totalResults,
    totalPages,
    pagingStart,
    pagingEnd,
    userSelectedSort,
    changeSortOrder,
    mapResults,
    activeTab,
    changeActiveTab,
    locationQuery
  }
}
