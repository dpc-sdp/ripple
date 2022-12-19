import { SearchDriver, SearchState } from '@elastic/search-ui'
import type { SearchDriverOptions } from '@elastic/search-ui'
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector'

import { ref, computed } from 'vue'

const getSearchDriver = (
  apiConnectorOptions,
  config: Omit<SearchDriverOptions, 'apiConnector'>
) => {
  return new SearchDriver({
    apiConnector: new AppSearchAPIConnector(apiConnectorOptions),
    ...config
  })
}

export default async (
  apiConnectorOptions,
  config: Omit<SearchDriverOptions, 'apiConnector'>,
  resultsMapFn
) => {
  const searchDriver = getSearchDriver(apiConnectorOptions, config)
  const searchState = ref()
  const loaded = ref(false)

  searchDriver.subscribeToStateChanges((state: SearchState) => {
    searchState.value = state
    if (!loaded.value && searchState.value.results.length > 0) {
      displayedResults.value = results.value
      loaded.value = true
    }
  })

  const { searchTerm } = searchDriver.getState()

  const displayedResults = ref([])
  const displayedSuggestions = ref([])
  const displayedAutocompleteResults = ref([])
  const queryTerm = ref(searchTerm || '')
  const resultsCountText = ref('')

  const results = computed(() => {
    return searchState.value?.results?.map(resultsMapFn)
  })

  const updateResultsCountText = () => {
    const total = searchState.value?.totalResults
    const perPage = searchState.value?.resultsPerPage
    const current = searchState.value?.current
    const start = total === 0 ? 0 : (current - 1) * perPage + 1
    const end = total <= perPage ? total : start + perPage - 1
    return `${start} - ${Math.min(end, total)} of ${total} results`
  }

  const autocompletedResults = computed(() => {
    return searchState.value.autocompletedResults
  })
  const autocompletedSuggestions = computed(() => {
    const suggestions = searchState.value.autocompletedSuggestions?.documents
    if (suggestions && suggestions.length > 0) {
      return suggestions.map((res) => res.suggestion)
    }
    return []
  })

  function updateQueryTerm(term) {
    handleTermUpdate(term)
    handleSubmit()
  }

  function handleTermUpdate(value) {
    const searchTermOptions = {
      autocompleteResults: true,
      autocompleteSuggestions: true,
      autocompleteMinimumCharacters: 3
    }
    searchDriver.getActions().setSearchTerm(value, searchTermOptions)
    displayedSuggestions.value = autocompletedSuggestions.value
    displayedAutocompleteResults.value = autocompletedResults.value
    queryTerm.value = value
  }

  function handleSubmit() {
    displayedResults.value = results.value
    displayedSuggestions.value = []
    displayedAutocompleteResults.value = []
    resultsCountText.value = updateResultsCountText()
  }

  return {
    results,
    resultsCountText,
    displayedResults,
    displayedSuggestions,
    displayedAutocompleteResults,
    autocompletedResults,
    autocompletedSuggestions,
    updateQueryTerm,
    handleTermUpdate,
    handleSubmit,
    queryTerm,
    searchDriver,
    searchState
  }
}
