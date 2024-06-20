<script setup lang="ts">
import {
  getActiveFilterURL,
  getActiveFiltersTally,
  ref,
  toRaw,
  computed
} from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../composables/useTideSearch'
import type { TidePageBase, TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type {
  MappedSearchResult,
  TideSearchListingResultLayout,
  TideSearchListingConfig
} from './../types'
import type { ITideSecondaryCampaign } from '@dpc-sdp/ripple-tide-landing-page/mapping/secondary-campaign/secondary-campaign-mapping'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { watch } from 'vue'

interface TideContentPage extends TidePageBase {
  beforeResults: string
  afterResults: string
  secondaryCampaign: ITideSecondaryCampaign
}

interface Props {
  id: string
  title: string
  introText?: string
  autocompleteQuery?: boolean
  autocompleteMinimumCharacters?: number
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
  autocompleteQuery: true,
  autocompleteMinimumCharacters: 3,
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

const filtersExpanded = ref(
  props.searchListingConfig?.showFiltersOnLoad ||
    props.searchListingConfig?.showFiltersOnly
)

const {
  isBusy,
  searchError,
  getSuggestions,
  clearSuggestions,
  searchTerm,
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

const resultsContainer = '.rpl-layout__body-wrap'

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
    scrollToResults(resultsContainer)
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event: any) => {
  filterForm.value = event.value
  submitSearch()
  scrollToResults(resultsContainer)

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

  if (
    props.autocompleteQuery &&
    props.searchListingConfig?.suggestions?.enabled !== false
  ) {
    if (term?.length >= props.autocompleteMinimumCharacters) {
      getSuggestions()
    } else if (suggestions.value?.length) {
      clearSuggestions()
    }
  }
}

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
        :corner-top="site?.cornerGraphic?.top?.src || true"
        :corner-bottom="false"
        :class="{ 'rpl-header--hero-tight': belowFilterComponent }"
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
              @submit="handleSearchSubmit"
              @update:input-value="handleUpdateSearchTerm"
            />
          </template>
          <RplSearchBarRefine
            v-if="
              !searchListingConfig?.showFiltersOnLoad &&
              !searchListingConfig?.showFiltersOnly &&
              userFilters &&
              userFilters.length > 0
            "
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            aria-controls="tide-search-listing-filters"
            @click="handleToggleFilters"
            >{{ toggleFiltersLabel }}</RplSearchBarRefine
          >
          <RplExpandable
            v-if="userFilters && userFilters.length > 0"
            id="tide-search-listing-filters"
            :expanded="filtersExpanded"
            class="rpl-u-margin-t-4"
          >
            <TideSearchFilters
              :title="title"
              :filter-form-values="filterForm"
              :filterInputs="userFilters as any"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </RplExpandable>
        </div>
        <template v-if="belowFilterComponent">
          <component :is="belowFilterComponent.component" />
        </template>
      </RplHeroHeader>
    </template>
    <template #body>
      <RplPageComponent v-if="contentPage.beforeResults">
        <RplContent
          class="tide-content-before-results"
          :html="contentPage.beforeResults"
        />
      </RplPageComponent>
      <TideSearchAboveResults>
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

      <RplPageComponent>
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
