<script setup lang="ts">
import { getActiveFilterURL, ref, toRaw, computed } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../composables/useTideSearch'
import type { TidePageBase, TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type {
  TideSearchListingPage,
  MappedSearchResult,
  TideSearchListingResultLayout
} from './../types'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { watch } from 'vue'

interface TideContentPage extends TidePageBase {
  afterResults: string
}

interface Props {
  id: string
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  autocompleteQuery?: boolean
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  resultsLayout: TideSearchListingResultLayout
  searchResultsMappingFn?: (item: any) => MappedSearchResult<any>
  contentPage: TideContentPage
  site: TideSiteData
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-listing',
  title: 'Search',
  introText: '',
  autocompleteQuery: true,
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
    resultsPerPage: 9,
    labels: {
      submit: 'Submit',
      reset: 'Reset',
      placeholder: 'Enter a search term'
    }
  }),
  resultsLayout: () => ({
    component: 'TideSearchResultsList'
  }),
  searchResultsMappingFn: (item): MappedSearchResult<any> => {
    return {
      id: item._id,
      component: 'TideSearchResult',
      props: {
        result: item._source
      }
    }
  }
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

const filtersExpanded = ref(false)

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  suggestions,
  filterForm,
  appliedFilters,
  submitSearch,
  goToPage,
  page,
  pageSize,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  onAggregationUpdateHook
} = useTideSearch(
  props.queryConfig,
  props.userFilters,
  props.globalFilters,
  props.searchResultsMappingFn,
  props.searchListingConfig
)

const uiFilters = ref(props.userFilters)
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
  return Object.values(appliedFilters.value).filter((value) => {
    if (!value) {
      return false
    }

    if (Array.isArray(value) && !value.length) {
      return false
    }

    return true
  }).length
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
    :updatedDate="contentPage.changed || contentPage.created"
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
      >
        <p v-if="introText" class="rpl-type-p-large">{{ introText }}</p>
        <div class="tide-search-header">
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            :input-label="searchListingConfig.labels?.submit"
            :inputValue="searchTerm"
            :placeholder="searchListingConfig.labels?.placeholder"
            :suggestions="suggestions"
            :global-events="false"
            @submit="handleSearchSubmit"
            @update:input-value="handleUpdateSearchTerm"
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
            class="rpl-u-margin-t-4"
          >
            <TideSearchFilters
              :title="title"
              :filter-form-values="filterForm"
              :filterInputs="userFilters"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </RplExpandable>
        </div>
      </RplHeroHeader>
    </template>
    <template #body>
      <slot
        name="resultsCount"
        :results="results"
        :currentPage="page"
        :pageSize="pageSize"
        :totalPages="totalPages"
        :totalResults="totalResults"
      >
        <RplPageComponent
          v-if="results?.length"
          data-component-type="search-listing-result-count"
        >
          <TideSearchResultsCount
            :pagingStart="pagingStart"
            :pagingEnd="pagingEnd"
            :totalResults="totalResults"
          />
        </RplPageComponent>
      </slot>

      <RplPageComponent>
        <div :class="{ 'tide-search-results--loading': isBusy }">
          <TideSearchError v-if="searchError" />
          <TideSearchNoResults v-else-if="!isBusy && !results?.length" />

          <slot name="results" :results="results">
            <component
              :is="resultsLayout.component"
              v-if="results && results.length > 0"
              :key="`TideSearchListingResultsLayout${resultsLayout.component}`"
              v-bind="resultsLayout.props"
              :results="results"
            />
          </slot>
        </div>
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
            :currentPage="page"
            :totalPages="totalPages"
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
  </TideBaseLayout>
</template>

<style>
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
