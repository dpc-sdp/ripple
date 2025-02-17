<script setup lang="ts">
import {
  getActiveFilterURL,
  getActiveFiltersTally,
  ref,
  toRaw,
  computed
} from '#imports'
import { submitForm } from '@formkit/vue'
import { useBreakpoints, useDebounceFn } from '@vueuse/core'
import useTideSearch from './../composables/useTideSearch'
import {
  TideImageField,
  TidePageBase,
  TideSiteData
} from '@dpc-sdp/ripple-tide-api/types'
import type {
  MappedSearchResult,
  TideSearchListingResultLayout,
  TideSearchListingConfig
} from './../types'
import type { ITideSecondaryCampaign } from '@dpc-sdp/ripple-tide-landing-page/mapping/secondary-campaign/secondary-campaign-mapping'
import { bpMin, useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { watch } from 'vue'

interface TideContentPage extends TidePageBase {
  cornerTop?: TideImageField
  beforeResults: string
  afterResults: string
  secondaryCampaign: ITideSecondaryCampaign
}

interface Props {
  id?: string
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingConfig['searchListingConfig']
  sortOptions?: TideSearchListingConfig['sortOptions']
  customQueryConfig?: TideSearchListingConfig['customQueryConfig']
  queryConfig?: TideSearchListingConfig['queryConfig']
  globalFilters?: TideSearchListingConfig['globalFilters']
  userFilters?: TideSearchListingConfig['userFilters']
  resultsLayout: TideSearchListingResultLayout
  noResultsLayout: any
  belowFilterComponent?: any
  searchResultsMappingFn?: (item: any) => MappedSearchResult<any>
  contentPage: TideContentPage
  site: TideSiteData
  showUpdatedDate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-listing',
  title: 'Search',
  introText: '',
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
  searchListingConfig: () =>
    ({
      hideSearchForm: false,
      resultsPerPage: 9,
      labels: {
        submit: 'Submit',
        reset: 'Reset',
        placeholder: 'Enter a search term'
      },
      suggestions: {
        key: 'title',
        enabled: true
      },
      showFiltersOnLoad: false,
      showFiltersOnly: false,
      filtersInSidebar: false,
      scrollToResultsOnSubmit: true
    }) as any,
  resultsLayout: () => ({
    component: 'TideSearchResultsList'
  }),
  noResultsLayout: () => ({
    component: 'TideSearchNoResults'
  }),
  belowFilterComponent: undefined,
  searchResultsMappingFn: (item: any): MappedSearchResult<any> => {
    return {
      id: item._id,
      component: 'TideSearchResult',
      props: {
        result: item._source
      }
    }
  },
  sortOptions: () => [],
  showUpdatedDate: false
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

const breakpoints = useBreakpoints(bpMin)
const isMobile = breakpoints.smaller('m')

const initialFiltersExpanded = Boolean(
  props.searchListingConfig?.filtersInSidebar ||
    props.searchListingConfig?.showFiltersOnLoad ||
    props.searchListingConfig?.showFiltersOnly
)

const filtersExpanded = ref(initialFiltersExpanded)
const filtersMobileClass = ref('hidden')

const {
  isBusy,
  searchError,
  getSuggestions,
  clearSuggestions,
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
  userSelectedSort,
  changeSortOrder,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  scrollToResults,
  onAggregationUpdateHook
} = useTideSearch({
  customQueryConfig: props.customQueryConfig,
  queryConfig: props.queryConfig,
  userFilters: props.userFilters,
  globalFilters: props.globalFilters,
  searchResultsMappingFn: props.searchResultsMappingFn,
  searchListingConfig: props.searchListingConfig,
  sortOptions: props.sortOptions
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
  section: 'search-listing'
})

// Updates filter options with aggregation value
onAggregationUpdateHook.value = (aggs: any) => {
  const updateTimestamp = Date.now()

  Object.keys(aggs).forEach((key) => {
    uiFilters.value.forEach((uiFilter, idx) => {
      if (uiFilter.id === key) {
        const getDynamicOptions = () => {
          const mappedOptions = aggs[key].map((item: any) => ({
            id: item.key,
            label: item.key,
            value: item.key
          }))

          if (uiFilters.value[idx].props?.hasOwnProperty('options')) {
            return [
              ...toRaw(uiFilters.value[idx].props?.options as unknown as any),
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

const resultsContainer = computed((): string => {
  return props.searchListingConfig?.filtersInSidebar
    ? '.rpl-layout__main'
    : '.rpl-layout__body-wrap'
})

const resultsScrollOffset = computed((): number => {
  return props.searchListingConfig?.filtersInSidebar ? 32 : 0
})

const emitSearchEvent = (event: any) => {
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

const handleSearchSubmit = (event: any) => {
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
    if (event?.type === 'button') {
      scrollToResults(resultsContainer.value, resultsScrollOffset.value)
    }
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event: any) => {
  filterForm.value = event.value
  submitSearch()

  if (
    !cachedSubmitEvent.value?.type ||
    cachedSubmitEvent.value?.type === 'button'
  ) {
    scrollToResults(resultsContainer.value, resultsScrollOffset.value)
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

  resetSearch()
  resetFilters()
  submitSearch()
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

const handlePageChange = (event: any) => {
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

const handleSortChange = (sortId: any) => {
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
</script>

<template>
  <TideBaseLayout
    :id="id"
    :site="site"
    :page="contentPage"
    :siteSection="contentPage.siteSection"
    :background="contentPage.background"
    :pageTitle="contentPage.title"
    :pageLanguage="contentPage.lang"
    :updatedDate="
      showUpdatedDate ? contentPage.changed || contentPage.created : null
    "
    :showContentRating="contentPage.showContentRating"
    :sideBarPlacement="searchListingConfig?.filtersInSidebar ? 'left' : 'right'"
    class="tide-search-listing-page"
  >
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        :title="title"
        :behind-nav="true"
        :breadcrumbs="hasBreadcrumbs"
        :full-width="true"
        :corner-top="
          contentPage?.cornerTop?.src || site?.cornerGraphic?.top?.src || true
        "
        :corner-bottom="false"
        class="rpl-header--hero-tight tide-search-header-component"
      >
        <p v-if="introText" class="rpl-type-p-large">{{ introText }}</p>
        <div
          v-if="!searchListingConfig?.hideSearchForm"
          class="tide-search-header"
        >
          <template v-if="!searchListingConfig?.showFiltersOnly">
            <component
              :is="customQueryConfig.component"
              v-if="customQueryConfig?.component"
              v-bind="customQueryConfig?.props"
              id="tide-search-bar"
              variant="default"
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
              id="tide-search-bar"
              variant="default"
              :input-label="searchListingConfig?.labels?.submit"
              :inputValue="searchTerm.q"
              :placeholder="searchListingConfig?.labels?.placeholder"
              :suggestions="suggestions"
              :global-events="false"
              :maxlength="128"
              @submit="handleSearchSubmit"
              @update:input-value="handleUpdateSearchTerm"
            />
          </template>
          <template
            v-if="
              !searchListingConfig?.filtersInSidebar && userFilters?.length > 0
            "
          >
            <TideSearchFilterToggle
              v-if="!searchListingConfig?.showFiltersOnly"
              class="tide-search-refine-btn tide-search-refine-btn--margin"
              :expanded="filtersExpanded"
              :appliedTally="numAppliedFilters"
              :onClick="handleToggleFilters"
              aria-controls="tide-search-listing-filters"
            />
            <RplExpandable
              id="tide-search-listing-filters"
              :class="`tide-search-listing-filters--${filtersMobileClass}`"
              :expanded="filtersExpanded"
            >
              <TideSearchFilters
                :title="title"
                :filter-form-values="filterForm"
                :filterInputs="uiFilters as any"
                @reset="handleFilterReset"
                @submit="handleFilterSubmit"
              >
              </TideSearchFilters>
            </RplExpandable>
          </template>
        </div>
        <template v-if="belowFilterComponent">
          <component :is="belowFilterComponent.component" />
        </template>
      </RplHeroHeader>
    </template>
    <template
      v-if="searchListingConfig?.filtersInSidebar && userFilters?.length > 0"
      #sidebar
    >
      <TideSearchFilterToggle
        v-if="isMobile"
        class="tide-search-refine-btn tide-search-refine-btn--margin"
        :expanded="filtersExpanded"
        :appliedTally="numAppliedFilters"
        :onClick="handleToggleFilters"
        aria-controls="tide-search-listing-filters"
      />
      <TideSearchFilterHeader v-else :numAppliedFilters="numAppliedFilters" />
      <RplExpandable
        id="tide-search-listing-filters"
        :class="`tide-search-listing-filters--${filtersMobileClass}`"
        :expanded="filtersExpanded || !isMobile"
      >
        <TideSearchFilters
          :title="title"
          :filter-form-values="filterForm"
          :filterInputs="uiFilters as any"
          display="block"
          @reset="handleFilterReset"
          @submit="handleFilterSubmit"
        />
      </RplExpandable>
    </template>
    <template #body>
      <RplPageComponent v-if="contentPage.beforeResults">
        <RplContent
          class="tide-content-before-results"
          :html="contentPage.beforeResults"
        />
      </RplPageComponent>
      <TideSearchResultsHeading
        v-if="results?.length && !searchError"
        :searchTerm="appliedSearchTerm.q"
      />
      <TideSearchAboveResults
        :hasSidebar="searchListingConfig?.filtersInSidebar"
      >
        <template #left>
          <slot
            name="resultsCount"
            :results="results"
            :currentPage="page"
            :pageSize="pageSize"
            :totalPages="totalPages"
            :totalResults="totalResults"
          >
            <div data-component-type="search-listing-result-count">
              <TideSearchResultsCount
                v-if="!searchError"
                :pagingStart="pagingStart + 1"
                :pagingEnd="pagingEnd + 1"
                :totalResults="totalResults"
                :results="results"
                :loading="isBusy"
              />
            </div>
          </slot>
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

      <RplPageComponent :full-width="true">
        <TideSearchResultsLoadingState :isActive="isBusy">
          <TideSearchError v-if="searchError" />
          <component
            :is="noResultsLayout.component"
            v-else-if="!isBusy && !results?.length"
          />

          <slot v-if="!searchError" name="results" :results="results">
            <component
              :is="resultsLayout.component"
              :key="`TideSearchListingResultsLayout${resultsLayout.component}`"
              v-bind="resultsLayout.props"
              :loading="isBusy"
              :results="results"
              :perPage="searchListingConfig?.resultsPerPage"
            />
          </slot>
        </TideSearchResultsLoadingState>
      </RplPageComponent>
      <RplPageComponent>
        <slot
          name="pagination"
          :results="results"
          :currentPage="page"
          :pageSize="pageSize"
          :totalPages="totalPages"
          :totalResults="totalResults"
        >
          <TideSearchPagination
            v-if="!searchError"
            :currentPage="page"
            :totalPages="totalPages"
            :scroll-to-selector="resultsContainer"
            @paginate="handlePageChange"
          />
        </slot>
      </RplPageComponent>
      <RplPageComponent v-if="contentPage.afterResults">
        <RplContent
          class="tide-content-after-results"
          :html="contentPage.afterResults"
        ></RplContent>
      </RplPageComponent>
    </template>
    <template #belowBody>
      <RplPageComponent v-if="contentPage.secondaryCampaign">
        <TideLandingPageSecondaryCampaignBanner
          :campaign="contentPage.secondaryCampaign"
        />
      </RplPageComponent>
    </template>
  </TideBaseLayout>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-listing-page .rpl-layout__sidebar--left {
  margin-top: calc(var(--rpl-sp-8) * -1);

  @media (--rpl-bp-m) {
    margin-top: 0;
  }
}

.tide-search-header-component {
  --local-min-height: auto;

  &.rpl-header {
    border-bottom: none;
  }
}

.tide-search-header {
  display: flex;
  flex-direction: column;
  margin-top: var(--rpl-sp-6);
}

.tide-search-filters.rpl-grid {
  row-gap: var(--rpl-sp-6);
}

.tide-search-filters .rpl-form__outer {
  margin: 0;
}

.tide-search-listing-filters--hidden {
  display: none;

  @media (--rpl-bp-m) {
    display: block;
  }
}

.tide-search-refine-btn--margin {
  margin-top: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    margin-top: var(--rpl-sp-5);
  }
}

.tide-search-results--loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>
