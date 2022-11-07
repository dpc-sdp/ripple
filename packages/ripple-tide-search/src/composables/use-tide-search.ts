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

  searchDriver.subscribeToStateChanges((state: SearchState) => {
    searchState.value = state
  })

  const results = computed(() => {
    return searchState.value?.results?.map(resultsMapFn)
  })
  const resultsCountText = computed(() => {
    const start =
      searchState.value?.totalResults === 0
        ? 0
        : (searchState.value?.current - 1) * searchState.value?.resultsPerPage +
          1
    const end =
      searchState.value?.totalResults <= searchState.value?.resultsPerPage
        ? searchState.value?.totalResults
        : start + searchState.value?.resultsPerPage - 1
    return `${start} - ${Math.min(end, searchState.value?.totalResults)} of ${
      searchState.value?.totalResults
    } results`
  })

  return {
    results,
    resultsCountText,
    searchDriver
  }
}
