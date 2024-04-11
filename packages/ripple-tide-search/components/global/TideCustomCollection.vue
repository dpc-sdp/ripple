<script setup lang="ts">
import { getActiveFiltersTally, getActiveFilterURL, ref } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../../composables/useTideSearch'
import type {
  TideSearchListingResultItem,
  TideSearchListingTab,
  TideSearchListingConfig
} from './../../types'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { get } from 'lodash-es'

interface Props {
  id: string
  title?: string
  introText?: string
  autocompleteQuery?: boolean
  searchListingConfig?: TideSearchListingConfig['searchListingConfig']
  sortOptions?: TideSearchListingConfig['sortOptions']
  queryConfig: TideSearchListingConfig['queryConfig']
  globalFilters?: TideSearchListingConfig['globalFilters']
  userFilters?: TideSearchListingConfig['userFilters']
  resultsConfig?: TideSearchListingConfig['resultsConfig']
  locationQueryConfig?: TideSearchListingConfig['locationQueryConfig']
  mapConfig?: TideSearchListingConfig['mapConfig']
  pageBackground?: string
  index?: string
  hasSidebar?: boolean
  tabs: TideSearchListingConfig['tabs']
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-listing',
  title: 'Search',
  introText: '',
  index: undefined,
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
    },
    displayMapTab: false,
    suggestions: {
      key: 'title',
      enabled: false
    },
    formTheme: 'default',
    showFiltersOnLoad: false
  }),
  tabs: () => [
    {
      title: 'Map',
      key: 'map',
      icon: 'pin'
    },
    {
      title: 'List',
      key: 'listing',
      icon: 'list'
    }
  ],
  resultsConfig: () => ({
    layout: {
      component: 'TideSearchResultsList'
    }
  }),
  sortOptions: () => [],
  locationQueryConfig: () => ({}),
  mapConfig: () => ({}),
  pageBackground: 'default',
  hasSidebar: false
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
  (e: 'reset', payload: rplEventPayload & { action: 'clear_search' }): void
}>()

const { emitRplEvent } = useRippleEvent('tide-search', emit)

const appConfig = useAppConfig()

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

const mapResultsMappingFn = (result) => {
  const location = get(result, props.mapConfig.props.locationObjPath)
  if (location && props.mapConfig && result._source) {
    const locationLatLng = location.split(',')
    return {
      ...result._source,
      lat: parseFloat(locationLatLng[0]),
      lng: parseFloat(locationLatLng[1]),
      id: result._id
    }
  } else {
    return {
      ...result._source,
      id: result._id
    }
  }
}

const filtersExpanded = ref(props.searchListingConfig?.showFiltersOnLoad)

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  filterForm,
  appliedFilters,
  resetFilters,
  submitSearch,
  goToPage,
  page,
  userSelectedSort,
  changeSortOrder,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  onAggregationUpdateHook,
  onMapResultsHook,
  mapResults,
  locationQuery,
  activeTab,
  changeActiveTab
} = useTideSearch({
  queryConfig: props.queryConfig,
  userFilters: props.userFilters,
  globalFilters: props.globalFilters,
  searchResultsMappingFn,
  searchListingConfig: props.searchListingConfig,
  sortOptions: props.sortOptions,
  includeMapsRequest: true,
  mapConfig: props.mapConfig,
  locationQueryConfig: props.locationQueryConfig,
  mapResultsMappingFn
})

const uiFilters = ref(props.userFilters)
const cachedSubmitEvent = ref({})

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: searchTerm.value,
  value: totalResults.value,
  options: getActiveFilterURL(filterForm.value),
  section: 'custom-collection'
})

// Updates filter options with aggregation value
onAggregationUpdateHook.value = (aggs) => {
  const updateTimestamp = Date.now()

  Object.keys(aggs).forEach((key) => {
    uiFilters.value.forEach((uiFilter, idx) => {
      if (uiFilter.id === key) {
        const getDynamicOptions = () => {
          const mappedOptions = aggs[key].map((item) => ({
            id: item,
            label: item,
            value: item
          }))

          if (uiFilters.value[idx].props.hasOwnProperty('options')) {
            return [
              ...toRaw(uiFilters.value[idx].props.options),
              ...mappedOptions
            ]
          }

          return mappedOptions
        }

        uiFilters.value[idx] = {
          ...uiFilters.value[idx],
          props: {
            ...uiFilters.value[idx].props,
            timestamp: updateTimestamp,
            dynamicOptions: getDynamicOptions()
          }
        }
      }
    })
  })
}

onMapResultsHook.value = () => {
  const hookFnName = props.mapConfig?.onResultsHook
  const fns: Record<
    string,
    (map: any, results: any, locationQuery: any) => Promise<any>
  > = appConfig?.ripple?.search?.mapResultHooks || {}

  if (!hookFnName) {
    return
  }

  const hookFn = fns[hookFnName]

  if (typeof hookFn !== 'function') {
    throw new Error(
      `Search listing: No matching onResultsHook function called "${hookFnName}"`
    )
  }

  hookFn(rplMapRef.value, mapResults.value, locationQuery.value)
}

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
    closeMapPopup()
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event) => {
  filterForm.value = event.value
  submitSearch()
  closeMapPopup()

  emitSearchEvent({ ...event, ...cachedSubmitEvent.value, ...baseEvent() })

  cachedSubmitEvent.value = {}
}

const handleFilterReset = (event: rplEventPayload) => {
  emitRplEvent(
    'reset',
    {
      ...event,
      ...baseEvent(),
      action: 'clear_search'
    },
    { global: true }
  )

  searchTerm.value = ''
  locationQuery.value = null
  resetFilters()
  submitSearch()
  closeMapPopup()
}

const handleUpdateSearchTerm = (term) => {
  searchTerm.value = term
  if (
    props.autocompleteQuery &&
    props.searchListingConfig?.suggestions?.enabled !== false
  ) {
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

const handleToggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value

  emitRplEvent(
    'toggleFilters',
    {
      ...baseEvent(),
      action: filtersExpanded.value ? 'open' : 'close',
      text: toggleFiltersLabel.value
    },
    { global: true }
  )
}

const numAppliedFilters = computed(() => {
  return getActiveFiltersTally(appliedFilters.value)
})

const toggleFiltersLabel = computed(() => {
  let label = 'Refine search'

  return numAppliedFilters.value
    ? `${label} (${numAppliedFilters.value})`
    : label
})

const handleTabChange = (tab: TideSearchListingTab) => {
  changeActiveTab(tab.key)
  closeMapPopup()
}

function handleLocationSearch(payload: any) {
  locationQuery.value = payload
  handleSearchSubmit({})
}

const rplMapRef = ref(null)
const popup = ref({
  isOpen: false,
  position: [0, 0],
  feature: null
})
provide('rplMapInstance', {
  rplMapRef,
  setRplMapRef,
  popup
})
function setRplMapRef(mapInstance: any) {
  rplMapRef.value = mapInstance
}
function closeMapPopup() {
  if (popup.value.isOpen) {
    popup.value.isOpen = false
  }
}

const mapFeatures = computed(() => {
  if (Array.isArray(mapResults.value)) {
    return mapResults.value.filter((itm) => !itm.isArea)
  }
  return []
})
const mapAreas = computed(() => {
  if (Array.isArray(mapResults.value)) {
    return mapResults.value.filter((itm) => itm.isArea)
  }
  return []
})

const altBackground = computed(() => props.pageBackground === 'alt')

const reverseTheme = computed(
  () => props.searchListingConfig?.formTheme === 'reverse'
)
const reverseFields = computed(
  () =>
    (reverseTheme.value && !altBackground.value) ||
    (altBackground.value && !reverseTheme.value)
)
</script>

<template>
  <div class="rpl-u-margin-t-8">
    <div
      :class="{
        'tide-search-header': true,
        'tide-search-header--inset': reverseTheme,
        'tide-search-header--neutral': reverseTheme && !altBackground,
        'tide-search-header--light': reverseTheme && altBackground
      }"
    >
      <RplSearchBar
        v-if="!locationQueryConfig?.component"
        id="custom-collection-search-bar"
        :variant="reverseFields ? 'reverse' : 'default'"
        :input-label="searchListingConfig.labels?.submit"
        :inputValue="searchTerm"
        :placeholder="searchListingConfig.labels?.placeholder"
        :global-events="false"
        @submit="handleSearchSubmit"
        @update:input-value="handleUpdateSearchTerm"
      />

      <component
        :is="locationQueryConfig?.component"
        v-if="locationQueryConfig?.component"
        v-bind="locationQueryConfig?.props"
        :inputValue="locationQuery"
        :resultsloaded="mapFeatures.length > 0"
        @update="handleLocationSearch"
      />

      <RplSearchBarRefine
        v-if="userFilters && userFilters.length > 0"
        class="tide-search-refine-btn"
        :expanded="filtersExpanded"
        @click="handleToggleFilters"
        >{{ toggleFiltersLabel }}</RplSearchBarRefine
      >
      <RplExpandable
        v-if="userFilters && userFilters.length > 0"
        :expanded="filtersExpanded"
      >
        <ClientOnly>
          <TideSearchFilters
            :title="title"
            :filter-form-values="filterForm"
            :filterInputs="userFilters"
            :reverseStyling="reverseFields"
            @reset="handleFilterReset"
            @submit="handleFilterSubmit"
          >
          </TideSearchFilters>
        </ClientOnly>
      </RplExpandable>
    </div>

    <RplTabs
      v-if="searchListingConfig?.displayMapTab"
      :tabs="tabs"
      :activeTab="activeTab"
      @toggleTab="handleTabChange"
    />
    <template
      v-if="!searchListingConfig?.displayMapTab || activeTab === 'listing'"
    >
      <TideSearchAboveResults
        v-if="results?.length || (sortOptions && sortOptions.length)"
        :hasSidebar="hasSidebar"
        class="rpl-u-margin-t-8 rpl-u-margin-b-6"
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
            v-if="sortOptions && sortOptions.length > 1"
            :currentValue="userSelectedSort"
            :sortOptions="sortOptions"
            @change="handleSortChange"
          />
        </template>
      </TideSearchAboveResults>

      <TideSearchResultsLoadingState :isActive="isBusy">
        <TideSearchError v-if="searchError" class="rpl-u-margin-t-8" />
        <TideCustomCollectionNoResults
          v-else-if="!isBusy && !results?.length"
          class="rpl-u-margin-t-8 rpl-u-margin-b-8"
        />

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
    </template>

    <template v-if="activeTab === 'map'">
      <TideSearchListingResultsMap
        v-if="mapFeatures"
        :results="mapFeatures"
        :areas="mapAreas"
        v-bind="mapConfig?.props"
        :noresults="!isBusy && !results?.length"
      >
        <template #noresults>
          <TideCustomCollectionNoResults v-if="!isBusy && !results?.length" />
        </template>
      </TideSearchListingResultsMap>
    </template>
  </div>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-header {
  display: flex;
  flex-direction: column;
}

.tide-search-header--neutral {
  background-color: var(--rpl-clr-neutral-100);
}

.tide-search-header--light {
  background-color: var(--rpl-clr-light);
}

.tide-search-header--inset {
  padding: var(--rpl-sp-4);
  margin-bottom: var(--rpl-sp-4);

  @media (--rpl-bp-s) {
    padding: var(--rpl-sp-5);
  }
}

.tide-search-filters.rpl-grid {
  row-gap: var(--rpl-sp-6);
}

.tide-search-filters .rpl-form__outer {
  margin: 0;
}

.tide-search-refine-btn {
  align-self: flex-end;
  padding: 0;
  margin-top: var(--rpl-sp-5);
}

.tide-search-results--loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>
