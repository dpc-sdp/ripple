import { ref, computed, nextTick, onMounted, watch } from 'vue'
// IMPORTANT: Need to use useRoute from vue-router here instead of the nuxt one from #imports after nuxt 3.6.5
// The nuxt version of the route stopped being watchable after the update.
// See this issue for details: https://github.com/nuxt/nuxt/issues/14595
import { useRoute, RouteLocation, LocationQueryValue } from 'vue-router'
import {
  useAppConfig,
  useRuntimeConfig,
  navigateTo,
  getSingleQueryStringValue,
  scrollToElementTopWithOffset,
  getScopedQueryParams
} from '#imports'
import type {
  TideSearchListingConfig,
  FilterConfigItem,
  TideSearchRangeFilter
} from './../types'

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
  customQueryConfig?: TideSearchListingConfig['customQueryConfig']
  userFilters: TideSearchListingConfig['userFilters']
  globalFilters: any[]
  searchResultsMappingFn: (item: any) => any
  searchListingConfig: TideSearchListingConfig['searchListingConfig']
  sortOptions?: TideSearchListingConfig['sortOptions']
  mapResultsMappingFn?: (item: any) => any
  locationQueryConfig?: any
}

export default ({
  queryConfig,
  customQueryConfig,
  userFilters: userFilterConfig,
  globalFilters,
  searchResultsMappingFn,
  searchListingConfig,
  sortOptions = [],
  mapResultsMappingFn = (item: any) => item,
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

  const initialTab = searchListingConfig?.displayMapTab
    ? searchListingConfig?.defaultTab || 'map'
    : null
  const activeTab: TideSearchListingTabKey = ref(initialTab)

  const isBusy = ref(true)
  const searchError = ref(null)
  const searchCount = ref(0)
  const manualSearch = ref(false)

  const locationQuery = ref<any | null>(null)

  const searchTerm = ref({ q: '' })
  const appliedSearchTerm = ref({ q: '' })
  const filterForm = ref({})
  const page = ref(1)
  const pageSize = ref(searchListingConfig.resultsPerPage || 10)

  const results = ref()
  const totalResults = ref(0)
  const suggestions = ref([])
  const userSelectedSort = ref<string | null>(null)

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

  const userGeolocation = ref<any>(null)
  const mapResults = ref([])

  const onAggregationUpdateHook = ref()
  const onMapResultsHook = ref()
  const firstLoad = ref(false)

  const getQueryClause = (filter: any[]) => {
    let queryClause = [{ match_all: {} }]
    const fns: Record<string, (queryData: any) => Record<string, any>> =
      appConfig?.ripple?.search?.queryConfigFunctions || {}

    if (customQueryConfig?.function && fns[customQueryConfig?.function]) {
      return fns[customQueryConfig.function]({
        searchTerm: searchTerm.value,
        queryFilters: filter,
        locationValue: locationOrGeolocation.value
      })
    }

    if (searchTerm.value?.q) {
      queryClause = processTemplate(
        queryConfig,
        '{{query}}',
        searchTerm.value.q
      )
    }

    return {
      bool: {
        must: queryClause,
        filter
      }
    }
  }

  const getUserFilterClause = (forAggregations = false) => {
    const _filters = [] as any[]
    if (globalFilters && globalFilters.length > 0) {
      _filters.push(...globalFilters)
    }

    if (forAggregations) {
      _filters.push(...(userFiltersForAggregations.value || []))
    } else {
      _filters.push(...(userFilters.value || []))
    }
    return _filters
  }

  const getLocationFilterClause = async (type: 'map' | 'listing') => {
    const transformFnName = locationQueryConfig?.dslTransformFunction
    const fns: Record<
      string,
      (location: any, filterForm: any) => Promise<any>
    > = appConfig?.ripple?.search?.locationDSLTransformFunctions || {}

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

    const transformedDSL = await transformFn(
      locationOrGeolocation.value,
      filterForm.value
    )

    const mapOrListing = transformedDSL ? transformedDSL[type] : null
    const locationFilters = mapOrListing?.filter || []

    // return transformedDSL as an array to match the format of the other filters, transformedDSL might not be an array
    return Array.isArray(locationFilters) ? locationFilters : [locationFilters]
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
                order: {
                  _key: currentFilter.aggregations.order || 'asc'
                },
                size: currentFilter.aggregations.size || 30,
                min_doc_count: searchListingConfig?.dynamicAggregations ? 0 : 1
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
        if (selected.function) {
          const sortFnName = selected.function
          const fns: Record<string, (location: any, filterForm: any) => void> =
            appConfig?.ripple?.search?.sortFunctions || {}

          // If no transform function is defined, return an empty array
          if (!sortFnName) {
            return []
          }

          const sortFn = fns[sortFnName]

          if (typeof sortFn !== 'function') {
            throw new Error(
              `Search listing: No matching sort function called "${sortFnName}"`
            )
          }

          const sortDSL = sortFn(locationOrGeolocation.value, filterForm.value)

          return sortDSL
        }

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

  const getSourceOptions = () => {
    let source: { include?: string[]; exclude?: string[] } = {}

    if (searchListingConfig?.responseSource?.include) {
      source.include = searchListingConfig?.responseSource?.include
    }
    if (searchListingConfig?.responseSource?.exclude) {
      source.exclude = searchListingConfig?.responseSource?.exclude
    }

    return Object.keys(source).length ? source : false
  }

  const getUserFilters = (forAggregations = false) => {
    const filterValues: Record<string, any> = {
      ...filterForm.value,
      ...getFallbackValues()
    }

    return Object.keys(filterValues)
      .filter((key: string) => {
        const itm = userFilterConfig.find((itm: any) => itm.id === key)

        if (forAggregations && itm?.filter?.excludeFromAggregations) {
          return false
        }

        return !!itm?.filter
      })
      .flatMap((key: string) => {
        const itm: FilterConfigItem = userFilterConfig.find(
          (itm: any) => itm.id === key
        )
        let filterVal = filterValues[key]

        if (itm.filter?.multiple !== false) {
          filterVal = filterValues[key] && Array.from(filterValues[key])
        }

        // Need to work out if form has value - will be different for different controls
        const hasValue = (v: unknown) => {
          if (
            (itm.component === 'TideSearchFilterDropdown' &&
              itm?.props?.multiple) ||
            itm?.component === 'TideSearchFilterCheckboxGroup'
          ) {
            return Array.isArray(v) && v.length > 0
          }

          if (
            itm?.filter?.valueIsObject &&
            typeof v === 'object' &&
            v !== null
          ) {
            return Object.keys(v).length
          }

          return v
        }

        if (itm.filter && hasValue(filterVal)) {
          /**
           * Raw ES Filter clause from Tide config, replaces {{value}} with user value
           */
          if (itm.filter.type === 'raw') {
            const re = new RegExp('{{value}}', 'g')
            const result = itm.filter.value.replace(
              re,
              JSON.stringify(filterVal)
            )
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
           * Range filter - creates a range query clause
           */
          if (itm.filter.type === 'range') {
            const rangeQuery: TideSearchRangeFilter = {
              time_zone: 'Australia/Melbourne'
            }

            if (itm.filter?.format) {
              rangeQuery.format = itm.filter.format
            }

            if (itm.filter?.value?.start && itm.filter?.value?.end) {
              // Match a range against two fields, i.e. start and end dates
              const multiRangeQuery = []

              if (filterVal?.from) {
                multiRangeQuery.push({
                  range: {
                    [`${itm.filter?.value?.end}`]: {
                      gte: filterVal?.from,
                      ...rangeQuery
                    }
                  }
                })
              }

              if (filterVal?.to) {
                multiRangeQuery.push({
                  range: {
                    [`${itm.filter?.value?.start}`]: {
                      lte: filterVal?.to,
                      ...rangeQuery
                    }
                  }
                })
              }

              return multiRangeQuery
            } else {
              // Match a range against a single field
              if (filterVal?.from) {
                rangeQuery.gte = filterVal?.from
              }
              if (filterVal?.to) {
                rangeQuery.lte = filterVal?.to
              }

              return {
                range: {
                  [`${itm.filter.value}`]: rangeQuery
                }
              }
            }
          }

          /**
           * Dependent queries - create a custom query based off the values of multiple dependent options
           */
          if (itm.filter.type === 'dependent') {
            const dependentFields = Object.entries(filterVal).reduce(
              (acc: any, [key, value]) => {
                if (value) acc[key] = value
                return acc
              },
              {}
            )

            // Children items are included in search, for example;
            // if the item selected in the first dropdown has direct children,
            // then all items children will also be included in the term query
            // provided no children have been selected
            if (Object.keys(dependentFields).length) {
              const depOptions = itm.props?.options || []
              const depValues = Object.values(dependentFields)
              const lastValues = depValues[depValues.length - 1]

              const lastIDs = depOptions
                .filter((opt: any) =>
                  Array.isArray(lastValues)
                    ? lastValues.includes(opt.value)
                    : opt.value === lastValues
                )
                .map((opt: any) => opt.id)

              return {
                terms: {
                  [itm.filter.value]: depOptions
                    .filter(
                      (option: any) =>
                        lastIDs.includes(option.parent) ||
                        lastIDs.includes(option.id)
                    )
                    .map((opt: any) => opt.value)
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
            const filterFuncs: Record<
              string,
              (filterConfig: any, values: string[]) => void
            > = appConfig?.ripple?.search?.filterFunctions || {}
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
      .filter(Boolean)
  }

  const userFilters = computed(() => {
    return getUserFilters()
  })

  const userFiltersForAggregations = computed(() => {
    return getUserFilters(true)
  })

  const getQueryDSL = async () => {
    const locationFilters = await getLocationFilterClause('listing')
    const query = getQueryClause([...getUserFilterClause(), ...locationFilters])
    const source = getSourceOptions()

    let queryDSL = {
      query,
      size: pageSize.value,
      from: pagingStart.value,
      sort: getSortClause()
    }

    if (source) {
      queryDSL._source = source
    }

    return queryDSL
  }

  const getQueryDSLForDynamicAggregations = async () => {
    const locationFilters = await getLocationFilterClause('listing')
    const query = getQueryClause([
      ...getUserFilterClause(true),
      ...locationFilters
    ])

    return {
      query,
      size: 0,
      from: 0,
      sort: getSortClause(),
      aggs: getAggregations()
    }
  }

  const getQueryDSLForStaticAggregations = () => {
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
    const locationFilters = await getLocationFilterClause('map')
    const query = getQueryClause([...getUserFilterClause(), ...locationFilters])
    const source = getSourceOptions()

    let queryDSL = {
      query,
      // ES queries have a 10k result limit, maps struggle drawing more than this anyway. If you need more you will need to implement a loading strategy see : https://openlayers.org/en/latest/apidoc/module-ol_loadingstrategy.html
      size: 10000,
      from: 0,
      sort: getSortClause()
    }

    if (source) {
      queryDSL._source = source
    }

    return queryDSL
  }

  const getSearchResults = async (isFirstRun: boolean) => {
    if (searchListingConfig.disableSearch) {
      isBusy.value = false
      firstLoad.value = true
      return
    }

    searchCount.value++
    isBusy.value = true
    searchError.value = null
    appliedSearchTerm.value = { ...searchTerm.value }

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

      if (isFirstRun || searchListingConfig.dynamicAggregations) {
        // Kick off an 'empty' search in order to get the aggregations (options) for the dropdowns, this
        // is only run once so that the aggregations don't change when filters/search is applied.

        aggsRequest = $fetch(searchUrl, {
          method: 'POST',
          body: searchListingConfig.dynamicAggregations
            ? await getQueryDSLForDynamicAggregations()
            : getQueryDSLForStaticAggregations()
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

      if (
        (isFirstRun || searchListingConfig.dynamicAggregations) &&
        aggsResponse.aggregations
      ) {
        const mappedAggs = Object.keys(aggsResponse.aggregations).reduce(
          (aggs, key) => {
            return {
              ...aggs,
              [`${key}`]: aggsResponse.aggregations[key].buckets
            }
          },
          {}
        )
        onAggregationUpdateHook.value(mappedAggs)
      }

      if (mapsResponse && mapsResponse.hits) {
        mapResults.value = mapsResponse.hits?.hits.map(mapResultsMappingFn)
      }

      if (typeof onMapResultsHook.value === 'function') {
        nextTick(onMapResultsHook.value)
      }
    } catch (error) {
      trackError(error)
      console.error(error)
      searchError.value = error
    } finally {
      isBusy.value = false
      firstLoad.value = true
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
          query: searchTerm.value.q,
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

          // Map the dependent filter object values to be URL friendly
          if (
            filterConfig?.component === 'TideSearchFilterDependent' ||
            filterConfig?.filter?.valueIsObject
          ) {
            const objValues = Object.fromEntries(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              Object.entries(value as object).filter(([_key, value]) =>
                Array.isArray(value) ? value.filter(Boolean).length : value
              )
            )

            if (Object.keys(objValues).length) {
              value = Object.entries(objValues).map(([key, val]) => {
                const v = Array.isArray(val) ? val : [val]
                return `${key}:${v.map(encodeCommasAndColons).join(',')}`
              })
            } else {
              value = null
            }
          }

          return [key, value]
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([key, value]) => value)
    )

    const locationParams = getScopedQueryParams('location', locationQuery.value)

    let { q: searchQuery, ...searchParams } = searchTerm.value

    if (searchParams) {
      searchParams = getScopedQueryParams('search', searchParams)
    }

    manualSearch.value = true

    await navigateTo({
      path: route.path,
      query: {
        q: searchQuery || undefined,
        activeTab: activeTab.value !== initialTab ? activeTab.value : undefined,
        ...searchParams,
        ...locationParams,
        ...filterFormValues
      }
    })

    searchFromRoute(route, false)
  }

  /**
   * Navigates to a specific page using the search term and filters in the current URL
   */
  const goToPage = async (newPage: number) => {
    await navigateTo({
      ...route,
      query: {
        ...route.query,
        page: newPage > 1 ? newPage : undefined
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
        activeTab: newActiveTab !== initialTab ? newActiveTab : undefined
      }
    })
  }

  const getFiltersFromRoute = (newRoute: RouteLocation) => {
    // Re-construct the filter form values from the URL, we find every query param that matches
    // a user filter, then construct the filter values based on that.
    return Object.keys(newRoute.query)
      .filter((key) => userFilterConfig.some((filter) => filter.id === key))
      .reduce((obj, key) => {
        let parsedValue: LocationQueryValue | LocationQueryValue[] | {} =
          newRoute.query[key]
        const filterConfig = userFilterConfig.find(
          (filter) => filter.id === key
        )

        if (
          (filterConfig?.component === 'TideSearchFilterDropdown' &&
            filterConfig?.props?.multiple) ||
          filterConfig?.component === 'TideSearchFilterCheckboxGroup' ||
          filterConfig?.component === 'TideSearchFilterDependent' ||
          filterConfig?.filter?.valueIsObject
        ) {
          parsedValue = Array.isArray(parsedValue) ? parsedValue : [parsedValue]
        }

        // Convert the URL friendly values back into the dependent object
        if (
          filterConfig?.component === 'TideSearchFilterDependent' ||
          filterConfig?.filter?.valueIsObject
        ) {
          parsedValue = Object.fromEntries(
            (parsedValue as []).map((v: string) => {
              const [objectKey, objectValue] = (v || '').split(':')

              const depth = Number(objectKey.match(/\d+$/)?.[0])

              return [
                objectKey,
                filterConfig?.props?.levels?.[depth - 1]?.multiple ||
                filterConfig?.props?.multiple
                  ? objectValue.split(',').map(decodeURIComponent)
                  : decodeURIComponent(objectValue)
              ]
            })
          )
        }

        return {
          ...obj,
          [key]: parsedValue
        }
      }, {})
  }

  const getScopedQueryParamsFromRoute = (
    scope: string,
    newRoute: RouteLocation
  ) => {
    const keys = Object.keys(newRoute.query).filter((key) =>
      key.startsWith(`${scope}[`)
    )

    if (!keys.length) return null

    return keys.reduce(
      (obj, key) => ({
        ...obj,
        [key.replace(`${scope}[`, '').replace(']', '')]: newRoute.query[key]
      }),
      {}
    )
  }

  /**
   * Resets the filters to their default values.
   *
   * This is mostly needed for grouped fields which must be set back to an object.
   */
  const resetFilters = (withValues = {}) => {
    const defaultValues = userFilterConfig.reduce((acc, curr) => {
      if (
        curr.component === 'TideSearchFilterDependent' ||
        curr?.filter?.valueIsObject
      ) {
        return { ...acc, [curr.id]: {} }
      }
      return { ...acc }
    }, {})

    filterForm.value = { ...defaultValues, ...withValues }
  }

  /**
   * Resets the main search to its default values.
   */
  const resetSearch = (value = {}) => {
    searchTerm.value = { q: '', ...value }
  }

  /**
   * The URL is the source of truth for what is shown in the search results.
   *
   * When the URL changes, the URL is parsed and the query is transformed into an elastic DSL query.
   */
  const searchFromRoute = (newRoute: RouteLocation, isFirstRun = false) => {
    activeTab.value = searchListingConfig?.displayMapTab
      ? getSingleQueryStringValue(newRoute.query, 'activeTab') || initialTab
      : null

    searchTerm.value.q = getSingleQueryStringValue(newRoute.query, 'q') || ''

    const searchParams = getScopedQueryParamsFromRoute('search', newRoute)

    if (searchParams) {
      searchTerm.value = { ...searchTerm.value, ...searchParams }
    }

    page.value =
      parseInt(getSingleQueryStringValue(newRoute.query, 'page') || '', 10) || 1
    userSelectedSort.value =
      getSingleQueryStringValue(newRoute.query, 'sort') ||
      sortOptions?.[0]?.id ||
      null

    const routeFilters = getFiltersFromRoute(newRoute)

    resetFilters(routeFilters)

    locationQuery.value = getScopedQueryParamsFromRoute('location', newRoute)

    getSearchResults(isFirstRun)
  }

  /**
   * Scroll to search results
   */
  const scrollToResults = (selector: string, offset = 0) => {
    if (searchListingConfig?.scrollToResultsOnSubmit !== false) {
      const scrollToElement = document.querySelector(selector) as HTMLElement

      if (scrollToElement) {
        const scrollElementTop = scrollToElement.getBoundingClientRect()?.top
        // if we're scrolling up we add extra space for the nav bar
        if (scrollElementTop < 0) {
          offset = offset + 60
        }

        scrollToElementTopWithOffset(scrollToElement, offset)
        scrollToElement.focus({ preventScroll: true })
      }
    }
  }

  const appliedFilters = computed(() => {
    return getFiltersFromRoute(route)
  })

  const locationOrGeolocation = computed(() => {
    return locationQuery.value?.useGeolocation && userGeolocation.value
      ? userGeolocation.value
      : locationQuery.value
  })

  onMounted(() => {
    // Read the url on first mount to kick of the initial search
    searchFromRoute(route, true)
  })

  // The submitSearch function handles searches initiated from the main search form,
  // here we watch for route changes and trigger a new search if the route update wasn't triggered by form submission,
  // for example, if the user clicks the browser back button
  watch(route, (newRoute) => {
    // When a user navigates to another page client side, this page will try to search again with an empty query string
    // The map was zooming back to center when navigating to another page, which was jarring. This check prevents that from happening
    if (initialPath !== newRoute.path) {
      return
    }

    if (manualSearch.value) {
      manualSearch.value = false
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
    onMapResultsHook,
    searchTerm,
    appliedSearchTerm,
    results,
    suggestions,
    filterForm,
    appliedFilters,
    resetFilters,
    resetSearch,
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
    locationQuery,
    firstLoad,
    userGeolocation,
    scrollToResults,
    searchCount
  }
}
