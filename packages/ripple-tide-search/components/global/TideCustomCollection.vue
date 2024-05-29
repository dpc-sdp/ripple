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
  customQueryConfig?: TideSearchListingConfig['customQueryConfig']
  queryConfig?: TideSearchListingConfig['queryConfig']
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
  customQueryConfig: undefined,
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
    hideSearchForm: false,
    resultsPerPage: 9,
    labels: {
      submit: 'Submit',
      reset: 'Reset',
      placeholder: 'Enter a search term',
      geolocateBtn: 'Use my current location'
    },
    displayMapTab: false,
    suggestions: {
      key: 'title',
      enabled: false
    },
    formTheme: 'default',
    showFiltersOnLoad: false,
    showFiltersOnly: false
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
  let transformedItem = item._source

  const transformResultFnName = props.resultsConfig?.transformResultFn
  const fns: Record<string, (result: any) => Promise<any>> =
    appConfig?.ripple?.search?.transformResultFns || {}

  if (transformResultFnName) {
    const transformResultFn = fns[transformResultFnName]

    if (typeof transformResultFn !== 'function') {
      throw new Error(
        `Search listing: No matching transform result function called "${transformResultFnName}"`
      )
    }

    transformedItem = transformResultFn(item)
  }

  if (props.resultsConfig.item) {
    for (const key in props.resultsConfig.item) {
      const mapping = props.resultsConfig.item[key]
      if (!item._source?.type || item._source?.type[0] === key || key === '*') {
        /* If there is no type, a component will be required */
        return {
          id: item._id,
          component: mapping.component,
          props: {
            result: transformedItem
          }
        }
      } else {
        /* Add default search result mapping if none provided */
        return {
          id: item._id,
          component: 'TideSearchResult',
          props: {
            result: transformedItem
          }
        }
      }
    }
  }

  return {
    id: item._id,
    props: {
      result: transformedItem
    }
  }
}

const mapResultsMappingFn = (result) => {
  const location = get(result._source, props.mapConfig.props.locationObjPath)
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

const filtersExpanded = ref(
  props.searchListingConfig?.showFiltersOnLoad ||
    props.searchListingConfig?.showFiltersOnly
)

const isGettingLocation = ref<boolean>(false)
const geolocationError = ref<string | null>(null)

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  filterForm,
  appliedFilters,
  resetFilters,
  resetSearch,
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
  changeActiveTab,
  firstLoad,
  userGeolocation
} = useTideSearch({
  customQueryConfig: props.customQueryConfig,
  queryConfig: props.queryConfig,
  userFilters: props.userFilters,
  globalFilters: props.globalFilters,
  searchResultsMappingFn,
  searchListingConfig: props.searchListingConfig,
  sortOptions: props.sortOptions,
  locationQueryConfig: props.locationQueryConfig,
  mapResultsMappingFn
})

const uiFilters = ref(props.userFilters)
const cachedSubmitEvent = ref({})

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: searchTerm.value.q,
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
            id: item.key,
            label: `${item.key}${
              props.searchListingConfig?.dynamicAggregations
                ? ` (${item.doc_count})`
                : ''
            }`,
            value: item.key
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

  hookFn(rplMapRef.value, mapResults.value, locationOrGeolocation.value)
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

  locationQuery.value = null
  resetSearch()
  resetFilters()
  submitSearch()
  closeMapPopup()
}

const handleUpdateSearchTerm = (term: string) => {
  searchTerm.value.q = term

  if (
    props.autocompleteQuery &&
    props.searchListingConfig?.suggestions?.enabled !== false
  ) {
    getSuggestions()
  }
}

const handleUpdateSearch = (term: string | Record<string, any>) => {
  if (term && typeof term === 'object') {
    searchTerm.value = { ...searchTerm.value, ...term }
  } else {
    handleUpdateSearchTerm(term)
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

const deadSpace = useMapDeadSpace(
  props.mapConfig?.sidePanel?.enabled,
  props.mapConfig?.props?.popupType,
  popup
)

provide('rplMapInstance', {
  rplMapRef,
  setRplMapRef,
  popup,
  deadSpace
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

const handleGeolocateClick = () => {
  isGettingLocation.value = true
  geolocationError.value = null
}

const handleGeolocateSuccess = (pos: GeolocationPosition) => {
  isGettingLocation.value = false
  geolocationError.value = null

  userGeolocation.value = {
    name: 'Current Location',
    center: [pos.coords.longitude, pos.coords.latitude]
  }

  handleLocationSearch({
    useGeolocation: true,
    id: `__geo${pos.timestamp}`
  })
}

const handleGeolocateError = (error: GeolocationPositionError) => {
  isGettingLocation.value = false
  geolocationError.value = `We couldn't find your location. You could enable location services, or input your location search manually.`
}

const locationOrGeolocation = computed(() => {
  return locationQuery.value?.useGeolocation && userGeolocation.value
    ? userGeolocation.value
    : locationQuery.value
})
</script>

<template>
  <div class="rpl-u-margin-t-8">
    <div
      v-if="!searchListingConfig?.hideSearchForm"
      :class="{
        'tide-search-header': true,
        'tide-search-header--inset': reverseTheme,
        'tide-search-header--neutral': reverseTheme && !altBackground,
        'tide-search-header--light': reverseTheme && altBackground
      }"
    >
      <template v-if="!searchListingConfig?.showFiltersOnly">
        <component
          :is="locationQueryConfig?.component"
          v-if="locationQueryConfig?.component"
          v-bind="locationQueryConfig?.props"
          :label="searchListingConfig.labels?.submit"
          :placeholder="searchListingConfig.labels?.placeholder"
          :inputValue="locationQuery"
          :resultsloaded="mapFeatures.length > 0"
          :isGettingLocation="isGettingLocation"
          :userGeolocation="userGeolocation"
          @update="handleLocationSearch"
        />
        <component
          :is="customQueryConfig.component"
          v-else-if="customQueryConfig?.component"
          v-bind="customQueryConfig?.props"
          id="custom-collection-search-bar"
          :variant="reverseFields ? 'reverse' : 'default'"
          :input-label="searchListingConfig?.labels?.submit"
          :inputValue="searchTerm"
          :placeholder="searchListingConfig?.labels?.placeholder"
          :global-events="false"
          :handle-submit="handleSearchSubmit"
          :handle-update="handleUpdateSearch"
        />
        <RplSearchBar
          v-else
          id="custom-collection-search-bar"
          :variant="reverseFields ? 'reverse' : 'default'"
          :input-label="searchListingConfig.labels?.submit"
          :inputValue="searchTerm.q"
          :placeholder="searchListingConfig.labels?.placeholder"
          :global-events="false"
          @submit="handleSearchSubmit"
          @update:input-value="handleUpdateSearchTerm"
        />
      </template>

      <div class="tide-search-util-bar">
        <RplMapGeolocateButton
          v-if="locationQueryConfig?.showGeolocationButton"
          class="tide-search-geolocate"
          :isBusy="isGettingLocation"
          :error="geolocationError"
          @click="handleGeolocateClick"
          @success="handleGeolocateSuccess"
          @error="handleGeolocateError"
        >
          {{
            searchListingConfig.labels?.geolocateBtn ||
            'Use my current location'
          }}
        </RplMapGeolocateButton>
        <div class="tide-search-refine-wrapper">
          <RplSearchBarRefine
            v-if="
              !searchListingConfig?.showFiltersOnly &&
              userFilters &&
              userFilters.length > 0
            "
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            @click="handleToggleFilters"
          >
            {{ toggleFiltersLabel }}
          </RplSearchBarRefine>
        </div>
      </div>

      <RplExpandable
        v-if="userFilters && userFilters.length > 0"
        :expanded="filtersExpanded"
      >
        <ClientOnly>
          <TideSearchFilters
            :title="title"
            :filter-form-values="filterForm"
            :filterInputs="uiFilters"
            :reverseStyling="reverseFields"
            :is-busy="searchListingConfig.dynamicAggregations && isBusy"
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
        class="rpl-u-margin-t-4 rpl-u-padding-b-2 rpl-u-margin-b-4"
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

      <div class="tide-search-pagination">
        <TideSearchPagination
          v-if="!searchError"
          :currentPage="page"
          :totalPages="totalPages"
          :scrollToSelector="`[data-component-id='${id}']`"
          @paginate="handlePageChange"
        />
      </div>
    </template>

    <template v-if="activeTab === 'map'">
      <TideSearchListingResultsMap
        v-if="mapFeatures && firstLoad"
        :results="mapFeatures"
        :areas="mapAreas"
        v-bind="mapConfig?.props"
        :noresults="!isBusy && !results?.length"
        :hasSidePanel="mapConfig?.sidePanel?.enabled"
      >
        <template #noresults>
          <TideCustomCollectionNoResults v-if="!isBusy && !results?.length" />
        </template>

        <template #sidepanel="{ activatePin }">
          <TideSearchListingResultsMapSidepanel
            variant="desktop"
            :popup="popup"
            :mapConfig="mapConfig"
            :results="results"
            :activatePin="activatePin"
            :isBusy="isBusy"
            :isStandalone="true"
            :pagingStart="pagingStart + 1"
            :pagingEnd="pagingEnd + 1"
            :totalResults="totalResults"
            :currentPage="page"
            :totalPages="totalPages"
            @paginate="handlePageChange"
          >
            <template #noresults>
              <TideCustomCollectionNoResults />
            </template>
          </TideSearchListingResultsMapSidepanel>
        </template>

        <template #sidepanelMobile="{ activatePin }">
          <TideSearchListingResultsMapSidepanel
            variant="mobile"
            :popup="popup"
            :mapConfig="mapConfig"
            :results="results"
            :activatePin="activatePin"
            :isBusy="isBusy"
            :isStandalone="true"
            :pagingStart="pagingStart + 1"
            :pagingEnd="pagingEnd + 1"
            :totalResults="totalResults"
            :currentPage="page"
            :totalPages="totalPages"
            @paginate="handlePageChange"
          >
            <template #noresults> <TideCustomCollectionNoResults /> </template
          ></TideSearchListingResultsMapSidepanel>
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
}

.tide-search-results--loading {
  opacity: 0.5;
  pointer-events: none;
}

.tide-search-pagination {
  margin-top: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    margin-top: var(--rpl-sp-5);
  }
}

.tide-search-util-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-items: flex-start;
  row-gap: var(--rpl-sp-4);
  column-gap: var(--rpl-sp-8);
  margin-top: var(--rpl-sp-3);
  @media (--rpl-bp-s) {
    margin-top: var(--rpl-sp-5);
  }
}
.tide-search-refine-wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

.tide-search-geolocate {
  @media (--rpl-bp-m) {
    max-width: 500px;
  }
}
</style>
