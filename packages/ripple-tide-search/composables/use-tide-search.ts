import { SearchDriver, SearchResult, SearchState } from '@elastic/search-ui'
import type { SearchDriverOptions } from '@elastic/search-ui'
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector'

import { ref, computed } from 'vue'
import { MappedSearchResult } from 'ripple-tide-search/types'

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
  resultsMapFn: (result: SearchResult) => MappedSearchResult<any>
) => {
  const searchDriver = getSearchDriver(apiConnectorOptions, config)
  const searchState = ref(searchDriver.getState())

  searchDriver.subscribeToStateChanges((state: SearchState) => {
    searchState.value = state
  })

  const results = computed(() => {
    if (!searchState.value?.results) {
      return []
    }

    return searchState.value?.results?.map(resultsMapFn)
  })

  const searchTermSuggestions = computed(() => {
    if (!searchState.value?.autocompletedSuggestions) {
      return []
    }

    return (searchState.value.autocompletedSuggestions.documents || []).map(
      (d) => d.suggestion
    )
  })

  function updateSearchTerm(value) {
    // This query will only get the autocomplete suggestions
    const searchTermOptions = {
      refresh: false,
      autocompleteSuggestions: true,
      autocompleteMinimumCharacters: 3,
      debounce: 100
    }
    searchDriver.getActions().setSearchTerm(value, searchTermOptions)
  }

  const goToPage = (page: number) => {
    searchDriver.getActions().setCurrent(page)
    window.scrollTo(0, 0)
  }

  const doSearch = () => {
    searchDriver.getActions().setSearchTerm(searchDriver.getState().searchTerm)
  }

  return {
    updateSearchTerm,
    doSearch,
    goToPage,
    searchState,
    searchTermSuggestions,
    results
  }
}
