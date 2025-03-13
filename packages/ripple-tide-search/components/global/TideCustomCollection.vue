<script setup lang="ts">
import {
  computed,
  getActiveFiltersTally,
  getActiveFilterURL,
  ref,
  watch,
  nextTick,
  provide,
  onMounted,
  toRaw
} from '#imports'
import { submitForm } from '@formkit/vue'
import { useBreakpoints, useDebounceFn } from '@vueuse/core'
import useTideSearch from './../../composables/useTideSearch'
import type {
  TideSearchListingResultItem,
  TideSearchListingTab,
  TideSearchListingConfig
} from './../../types'
import { bpMin, useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { get } from 'lodash-es'
import { useEventContext } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  title?: string
  introText?: string
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
    showFiltersOnly: false,
    scrollToResultsOnSubmit: true
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
  let itemComponent = 'TideSearchResult'

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

  if (props.resultsConfig?.item) {
    const mapping =
      props.resultsConfig.item[item._source?.type] ??
      props.resultsConfig.item?.['*']

    if (mapping) {
      itemComponent = mapping.component
    }
  }

  return {
    id: item._id,
    component: itemComponent,
    props: {
      result: {
        // NOTE: id was added to match the mapResultsMappingFn signature; _id remains for backwards compatibility
        id: item._id,
        _id: item._id,
        ...transformedItem
      }
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

const breakpoints = useBreakpoints(bpMin)
const isMobile = breakpoints.smaller('m')

const initialFiltersExpanded = Boolean(
  props.searchListingConfig?.showFiltersOnLoad ||
    props.searchListingConfig?.showFiltersOnly
)

const filtersExpanded = ref(initialFiltersExpanded)
const filtersMobileClass = ref('hidden')

const isGettingLocation = ref<boolean>(false)
const geolocationError = ref<string | null>(null)

const {
  isBusy,
  searchError,
  getSuggestions,
  clearSuggestions,
  suggestions,
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
  userGeolocation,
  scrollToResults
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
// this offset is used to avoid the result count hitting
// the top of the screen when scrolling to the results
const scrollTopOffset = 16

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: props.locationQueryConfig?.component
    ? locationOrGeolocation.value?.name
    : searchTerm.value.q,
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
    (
      map: any,
      results: any,
      locationQuery: any,
      mapDeadSpace: any,
      options: Record<string, any>
    ) => Promise<any>
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

  hookFn(
    rplMapRef.value,
    mapResults.value,
    locationOrGeolocation.value,
    deadSpace.value,
    { defaultExtent: props.mapConfig?.props?.defaultExtent }
  )
}

const resultsContainer = computed(
  () => `[data-component-id='${props.id}'] .tide-search-results-wrapper`
)

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
  geolocationError.value = null

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
    if (event?.type === 'button') {
      scrollToResults(resultsContainer.value, scrollTopOffset)
    }
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event) => {
  filterForm.value = event.value
  submitSearch()
  closeMapPopup()

  if (
    !cachedSubmitEvent.value?.type ||
    cachedSubmitEvent.value?.type === 'button'
  ) {
    scrollToResults(resultsContainer.value, scrollTopOffset)
  }

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
  geolocationError.value = null
  resetSearch()
  resetFilters()
  submitSearch()
  closeMapPopup()
}

const handleUpdateSearchTerm = (term: string) => {
  searchTerm.value.q = term
  getDebouncedSuggestions(term)
}

const getDebouncedSuggestions = useDebounceFn((term: string) => {
  if (props.searchListingConfig?.suggestions?.enabled) {
    const minCharacters =
      props.searchListingConfig?.suggestions?.minCharacters || 3

    if (term?.length >= minCharacters) {
      getSuggestions()
    } else if (suggestions.value?.length) {
      clearSuggestions()
    }
  }
}, 300)

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

const handleToggleFilters = (event: rplEventPayload) => {
  filtersExpanded.value = !filtersExpanded.value

  emitRplEvent(
    'toggleFilters',
    {
      ...baseEvent(),
      ...event,
      action: filtersExpanded.value ? 'open' : 'close'
    },
    { global: true }
  )
}

const numAppliedFilters = computed(() => {
  return getActiveFiltersTally(appliedFilters.value, props.userFilters)
})

const handleTabChange = (tab: TideSearchListingTab) => {
  changeActiveTab(tab.key)
  closeMapPopup()
}

function handleLocationSearch(payload: any) {
  locationQuery.value = payload
  handleSearchSubmit({ type: 'suggestion' })
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
  deadSpace,
  defaultExtent: props.mapConfig?.props?.defaultExtent
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

const handleGeolocateError = () => {
  isGettingLocation.value = false
  geolocationError.value = `We couldn't find your location. Check your browser permissions or input your location manually.`
}

const locationOrGeolocation = computed(() => {
  return locationQuery.value?.useGeolocation && userGeolocation.value
    ? userGeolocation.value
    : locationQuery.value
})

watch(
  () => isBusy.value,
  (loading, prevLoading) => {
    if (!loading && prevLoading) {
      emitRplEvent(
        'results',
        {
          ...baseEvent(),
          action: 'view'
        },
        { global: true }
      )
    }
  }
)

onMounted(() => {
  // If filters are shown on load for desktop, we still need to hide them on mobile
  if (initialFiltersExpanded && isMobile.value) {
    filtersExpanded.value = false
  }

  nextTick(() => (filtersMobileClass.value = 'visible'))
})

const { updateContext } = useEventContext({ mode: activeTab })

watch(activeTab, (newActiveTab) => {
  updateContext('mode', newActiveTab)
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
        'tide-search-header--light': reverseTheme && altBackground,
        'rpl-u-margin-b-8': true
      }"
    >
      <template v-if="!searchListingConfig?.showFiltersOnly">
        <component
          :is="locationQueryConfig?.component"
          v-if="locationQueryConfig?.component"
          v-bind="locationQueryConfig?.props"
          :label="searchListingConfig.labels?.submit"
          :placeholder="searchListingConfig.labels?.placeholder"
          :variant="reverseFields ? 'reverse' : 'default'"
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
          :suggestions="suggestions"
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
          :suggestions="suggestions"
          :global-events="false"
          :maxlength="128"
          @submit="handleSearchSubmit"
          @update:input-value="handleUpdateSearchTerm"
        />
      </template>

      <div
        v-if="
          locationQueryConfig?.showGeolocationButton ||
          (userFilters && userFilters.length > 0)
        "
        :class="{
          'tide-search-util-bar': true,
          'tide-search-util-bar--geolocate':
            locationQueryConfig?.showGeolocationButton
        }"
      >
        <RplMapGeolocateButton
          v-if="locationQueryConfig?.showGeolocationButton"
          :isBusy="isGettingLocation"
          :error="geolocationError"
          class="tide-search-map-geolocate"
          @click="handleGeolocateClick"
          @success="handleGeolocateSuccess"
          @error="handleGeolocateError"
        >
          {{
            searchListingConfig.labels?.geolocateBtn ||
            'Use my current location'
          }}
        </RplMapGeolocateButton>
        <div
          v-if="
            !searchListingConfig?.showFiltersOnly &&
            userFilters &&
            userFilters.length > 0
          "
          class="tide-search-refine-wrapper"
        >
          <TideSearchFilterToggle
            class="tide-search-refine-btn"
            :appliedTally="numAppliedFilters"
            :expanded="filtersExpanded"
            :onClick="handleToggleFilters"
          />
        </div>
      </div>

      <RplExpandable
        v-if="userFilters && userFilters.length > 0"
        :class="`tide-search-filters--${filtersMobileClass}`"
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

    <div class="tide-search-results-wrapper">
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
          :hasSidebar="hasSidebar"
          class="rpl-u-margin-t-4"
        >
          <template #left>
            <TideSearchResultsCount
              v-if="!resultsConfig.hideResultsCount && !searchError"
              :pagingStart="pagingStart + 1"
              :pagingEnd="pagingEnd + 1"
              :totalResults="totalResults"
              :results="results"
              :loading="isBusy"
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

          <div v-if="!searchError">
            <component
              :is="resultsConfig.layout?.component"
              :key="`TideSearchListingResultsLayout${resultsConfig.layout?.component}`"
              v-bind="resultsConfig.layout?.props"
              :hasSidebar="hasSidebar"
              :loading="isBusy"
              :results="results"
              :perPage="searchListingConfig?.resultsPerPage"
            />
          </div>
        </TideSearchResultsLoadingState>

        <div class="tide-search-pagination">
          <TideSearchPagination
            v-if="!searchError"
            :currentPage="page"
            :totalPages="totalPages"
            :scrollToSelector="resultsContainer"
            @paginate="handlePageChange"
          />
        </div>
      </template>
      <template v-if="activeTab === 'map'">
        <TideSearchListingResultsMap
          :results="mapFeatures"
          :areas="mapAreas"
          v-bind="mapConfig?.props"
          :noresults="
            !searchListingConfig?.disableSearch && !isBusy && !results?.length
          "
          :hasSidePanel="mapConfig?.sidePanel?.enabled"
          :initialising="!firstLoad"
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
  padding: var(--rpl-sp-4) var(--rpl-sp-4) var(--rpl-sp-5);
  margin-bottom: var(--rpl-sp-4);

  @media (--rpl-bp-s) {
    padding: var(--rpl-sp-5) var(--rpl-sp-5) var(--rpl-sp-6);
  }
}

.tide-search-filters.rpl-grid {
  row-gap: var(--rpl-sp-6);
}

.tide-search-filters .rpl-form__outer {
  margin: 0;
}

.tide-search-filters--hidden {
  display: none;

  @media (--rpl-bp-m) {
    display: block;
  }
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
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: var(--rpl-sp-4);
  column-gap: var(--rpl-sp-9);
  margin-top: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    row-gap: var(--rpl-sp-3);
    margin-top: var(--rpl-sp-5);
  }

  @media (--rpl-bp-m) {
    flex-direction: row;
  }
}

.tide-search-util-bar--geolocate {
  margin-top: var(--rpl-sp-3);

  @media (--rpl-bp-m) {
    margin-top: var(--rpl-sp-5);
  }
}

.tide-search-map-geolocate {
  @media (--rpl-bp-m) {
    display: contents;
  }

  .rpl-map-geolocate__error {
    width: 100%;

    @media (--rpl-bp-m) {
      margin: 0;
    }
  }
}

.tide-search-refine-wrapper {
  flex-grow: 1;
  display: flex;

  @media (--rpl-bp-m) {
    order: -1;
  }
}
</style>
