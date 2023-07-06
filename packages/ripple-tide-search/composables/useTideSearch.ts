import { ref, computed, onMounted } from 'vue'
import type {
  TideSearchListingPage,
  TideSearchListingResultLayout
} from './../types'

export default (
  queryConfig: TideSearchListingPage['queryConfig'],
  userFilterConfig: TideSearchListingPage['userFilters'],
  globalFilters: any[],
  searchResultsMappingFn: (item: any) => any,
  customIndex?: string
) => {
  const appConfig = useAppConfig()
  const { public: config } = useRuntimeConfig()
  const route = useRoute()

  const index = customIndex || config.tide.appSearch.engineName

  const processTemplate = (
    obj: Record<string, any>,
    key: string,
    value: string
  ) => {
    const re = new RegExp(key, 'g')
    return JSON.parse(JSON.stringify(obj).replace(re, value))
  }

  const searchTerm = ref('')
  const results = ref()
  const suggestions = ref([])
  const size = ref(10)
  const from = ref(0)
  const filterForm = ref({})

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

  const getSortClause = () => {
    return [
      {
        _score: 'desc'
      },
      {
        _doc: 'desc'
      }
    ]
  }

  const getEmptySortClause = () => {
    return ['title.keyword']
  }

  const userFilters = computed(() => {
    let ESFilterClause = [] as any[]
    Object.keys(filterForm.value).map((key: string) => {
      const itm = userFilterConfig.find((itm) => itm.id === key)
      const filterVal =
        filterForm.value[key] && Array.from(filterForm.value[key])
      // Need to work out if form has value - will be different for different controls
      const hasValue = (v: unknown) => {
        if (itm.component === 'TideSearchFilterDropdown') {
          return Array.isArray(v) && v.length > 0
        }
        return v
      }
      if (itm.filter && hasValue(filterVal)) {
        // Raw ES Filter clause from Tide config, replaces {{value}} with user value
        if (itm.filter.type === 'raw') {
          const re = new RegExp('{{value}}', 'g')
          const result = itm.filter.value.replace(re, JSON.stringify(filterVal))
          ESFilterClause = JSON.parse(result)
        }
        // Add a simple taxonomy term/s filter
        if (itm.filter.type === 'terms' || itm.filter.type === 'term') {
          ESFilterClause = [
            {
              [`${itm.filter.type}`]: {
                // ES8 appears to require keyword suffix due to change in indexing
                [`${itm.filter.value}.keyword`]: filterVal
              }
            }
          ]
        }
        // Call a function passed from app.config to add filters
        if (itm.filter.type === 'function') {
          // TODO: this should allow calling a custom function that returns a valid query clause
          // function should be passed through from app.config to allow extending and overriding
        }
      }
    })
    return ESFilterClause
  })

  const getQueryDSL = () => {
    if (
      searchTerm.value.length > 0 ||
      userFilters.value.length > 0 ||
      globalFilters.length > 0
    ) {
      return {
        query: {
          bool: {
            must: getQueryClause(),
            filter: getFilterClause()
          }
        },
        size: size.value,
        from: from.value,
        sort: getSortClause()
      }
    } else {
      return {
        query: {
          match_all: {}
        },
        size: size.value,
        from: from.value,
        sort: getEmptySortClause()
      }
    }
  }

  const getSearchResults = async () => {
    const body = getQueryDSL()
    if (process.env.NODE_ENV === 'development') {
      console.info(JSON.stringify(body, null, 2))
    }
    const response = await $fetch(
      `/api/tide/search/${index}/elasticsearch/_search`,
      {
        method: 'POST',
        body
      }
    )

    if (
      response &&
      response.hasOwnProperty('hits') &&
      Array.isArray(response.hits?.hits) &&
      typeof searchResultsMappingFn === 'function'
    ) {
      results.value = response.hits?.hits.map(searchResultsMappingFn)
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

  onMounted(() => {
    getSearchResults()
  })

  return {
    getSearchResults,
    getSuggestions,
    searchTerm,
    results,
    suggestions,
    filterForm
  }
}
