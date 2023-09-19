<script setup lang="ts">
import { getActiveFilterURL, useRoute, ref, toRaw } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../../composables/useTideSearch'
import type {
  TideSearchListingPage,
  TideSearchListingResultLayout,
  TideSearchListingResultItem,
  TideSearchListingSortOption
} from './../../types'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  autocompleteQuery?: boolean
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  resultsConfig?: {
    layout?: TideSearchListingResultLayout
    item?: Record<string, { component: string }>
  }
  index: string
  sortOptions?: TideSearchListingSortOption[]
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-listing',
  title: 'Search',
  introText: '',
  autocompleteQuery: false,
  globalFilters: () => [],
  userFilters: () => [],
  queryConfig: () => ({
    multi_match: {
      query: '{{query}}',
      fields: [
        'title^3',
        'field_landing_page_summary^2',
        'body',
        'field_paragraph_body',
        'summary_processed'
      ]
    }
  }),
  searchListingConfig: () => ({
    searchProvider: 'app-search',
    resultsPerPage: 9,
    labels: {
      submit: 'Submit',
      reset: 'Reset',
      placeholder: 'Enter a search term'
    }
  }),
  resultsConfig: () => ({
    layout: {
      component: 'TideSearchResultsList'
    }
  }),
  sortOptions: () => []
})

const emit = defineEmits<{
  (e: 'submit', payload: rplEventPayload & { action: 'search' }): void
  (e: 'results', payload: rplEventPayload & { action: 'view' }): void
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
  (
    e: 'toggleFilters',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('tide-search', emit)

const searchResultsMappingFn = (item): TideSearchListingResultItem => {
  if (props.resultsConfig.item) {
    for (const key in props.resultsConfig.item) {
      const mapping = props.resultsConfig.item[key]
      if (!item._source?.type || item._source?.type[0] === key || key === '*') {
        /* If there is no type, a component will be required */
        return {
          id: item._id,
          component: mapping.component,
          props: {
            result: item._source
          }
        }
      } else {
        /* Add default search result mapping if none provided */
        return {
          id: item._id,
          component: 'TideSearchResult',
          props: {
            result: item._source
          }
        }
      }
    }
  }
  return item
}

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  filterForm,
  submitSearch,
  goToPage,
  page,
  userSelectedSort,
  changeSortOrder,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  onAggregationUpdateHook
} = useTideSearch(
  props.queryConfig,
  props.userFilters,
  props.globalFilters,
  searchResultsMappingFn,
  props.searchListingConfig,
  props.sortOptions
)

const cachedSubmitEvent = ref({})

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: searchTerm.value,
  value: totalResults.value,
  options: getActiveFilterURL(filterForm.value)
})

// Updates filter options with aggregation value
onAggregationUpdateHook.value = (aggs) => {}

const emitSearchEvent = (event) => {
  emitRplEvent(
    'submit',
    {
      ...event,
      ...baseEvent(),
      action: 'search'
    },
    { global: true }
  )
}

const handleSearchSubmit = (event) => {
  if (props.userFilters && props.userFilters.length) {
    cachedSubmitEvent.value = event
    // Submitting the search term should also 'apply' the filters, but the filters live in a seperate form.
    // To solve this, when the search term form is submitted, we trigger a submission of the filters form,
    // it is there where the actual search request will be triggered.
    // This will only work if there is an actual filter form to submit.
    submitForm('tide-search-filter-form')
  } else {
    // If there's no filters in the form, we need to just do the search without submitting the filter form
    submitSearch()
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event) => {
  filterForm.value = event.value
  submitSearch()

  emitSearchEvent({ ...event, ...cachedSubmitEvent.value, ...baseEvent() })

  cachedSubmitEvent.value = {}
}

const handleFilterReset = () => {
  searchTerm.value = ''
  filterForm.value = {}
  submitSearch()
}

const handleUpdateSearchTerm = (term) => {
  searchTerm.value = term
  if (props.autocompleteQuery) {
    getSuggestions()
  }
}

const handlePageChange = (event) => {
  goToPage(event.value)
  emitRplEvent(
    'paginate',
    {
      ...event,
      ...baseEvent(),
      index: event.value
    },
    { global: true }
  )
}

const handleSortChange = (sortId) => {
  changeSortOrder(sortId)
}
</script>

<template>
  <div class="rpl-u-margin-t-8">
    <RplSearchBar
      id="custom-collection-search-bar"
      variant="default"
      :input-label="searchListingConfig.labels?.submit"
      :inputValue="searchTerm"
      :placeholder="searchListingConfig.labels?.placeholder"
      :global-events="false"
      @submit="handleSearchSubmit"
      @update:input-value="handleUpdateSearchTerm"
    />

    <TideSearchFilters
      v-if="userFilters && userFilters.length > 0"
      :title="title"
      :filter-form-values="filterForm"
      :filterInputs="userFilters"
      @reset="handleFilterReset"
      @submit="handleFilterSubmit"
    />

    <TideSearchAboveResults
      v-if="results?.length || (sortOptions && sortOptions.length)"
      :hasSidebar="true"
    >
      <template #left>
        <TideSearchResultsCount
          v-if="!searchError && results?.length"
          :pagingStart="pagingStart + 1"
          :pagingEnd="pagingEnd + 1"
          :totalResults="totalResults"
        />
      </template>

      <template #right>
        <TideSearchSortOptions
          v-if="sortOptions && sortOptions.length"
          :currentValue="userSelectedSort"
          :sortOptions="sortOptions"
          @change="handleSortChange"
        />
      </template>
    </TideSearchAboveResults>

    <TideSearchResultsLoadingState :isActive="isBusy">
      <div class="rpl-u-margin-t-8">
        <TideSearchError v-if="searchError" />
        <TideSearchNoResults v-else-if="!isBusy && !results?.length" />
      </div>

      <component
        :is="resultsConfig.layout?.component"
        v-if="!searchError && results && results.length > 0"
        :key="`TideSearchListingResultsLayout${resultsConfig.layout?.component}`"
        v-bind="resultsConfig.layout?.props"
        :results="results"
      />
    </TideSearchResultsLoadingState>

    <RplPageComponent>
      <TideSearchPagination
        v-if="!searchError"
        :currentPage="page"
        :totalPages="totalPages"
        :scrollToSelector="`[data-component-id='${id}']`"
        @paginate="handlePageChange"
      />
    </RplPageComponent>
  </div>
</template>
