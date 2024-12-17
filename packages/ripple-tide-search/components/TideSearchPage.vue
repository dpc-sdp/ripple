<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  getActiveFilterURL,
  scrollToElementTopWithOffset,
  useRuntimeConfig
} from '#imports'
import useSearchUI from './../composables/useSearchUI'
import {
  AppSearchFilterConfigItem,
  MappedSearchResult
} from 'ripple-tide-search/types'
import { FormKit } from '@formkit/vue'
import { SearchDriverOptions } from '@elastic/search-ui'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { TideSiteData, TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

interface Props {
  id?: string
  site: TideSiteData
  page: TidePageBase
  pageTitle: string
  filtersConfig: AppSearchFilterConfigItem[]
  searchDriverOptions: Omit<SearchDriverOptions, 'apiConnector'>
  searchResultsMappingFn: (item: any) => MappedSearchResult<any>
  scrollToResults?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-page',
  pageTitle: 'Search',
  filtersConfig: () => [],
  scrollToResults: true,
  searchDriverOptions: () => ({
    initialState: { resultsPerPage: 10 },
    alwaysSearchOnInitialLoad: true,
    searchQuery: {
      search_fields: {
        title: {
          weight: 10
        },
        body: {},
        field_paragraph_body: {}
      }
    },
    autocompleteQuery: {
      suggestions: {
        types: {
          documents: { fields: ['title'] }
        },
        size: 8
      }
    }
  }),
  searchResultsMappingFn: (item): MappedSearchResult<any> => {
    return {
      id: item._meta.id,
      component: 'TideAppSearchResult',
      props: {
        title: item.title?.raw?.[0],
        url: stripSiteId(item.url?.raw?.[0]),
        updated: item.changed?.raw?.[0]
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
  (e: 'reset', payload: rplEventPayload & { action: 'clear_search' }): void
}>()

const { emitRplEvent } = useRippleEvent('tide-search', emit)

const { public: config } = useRuntimeConfig()

const apiConnectorOptions = {
  // Omit the search key, we'll add it on the server
  engineName: config.tide?.appSearch.engineName,
  // The search request is proxied through the API to avoid CORS issues
  endpointBase: '/api/tide/search'
}

const {
  updateSearchTerm,
  doSearch,
  goToPage,
  searchState,
  searchTermSuggestions,
  results,
  staticFacetOptions,
  filterFormValues,
  searchComplete
} = await useSearchUI(
  apiConnectorOptions,
  props.searchDriverOptions,
  props.filtersConfig,
  props.searchResultsMappingFn
)

const initialLoad = ref(true)
const filtersExpanded = ref(false)
const submitFiltersLabel = 'Apply search filters'

const toggleFiltersLabel = computed(() => {
  let label = 'Filters'

  return searchState.value?.filters?.length
    ? `${label} (${searchState.value.filters.length})`
    : label
})

const baseEvent = () => ({
  contextId: props.id,
  name: props.pageTitle,
  index: searchState.value.current,
  label: searchState.value.searchTerm,
  value: searchState.value.totalResults,
  options: getActiveFilterURL(filterFormValues.value),
  section: 'search'
})

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

const scrollToResults = () => {
  if (props.scrollToResults) {
    const scrollToElement = document.querySelector('.rpl-layout__body-wrap')

    if (scrollToElement) {
      scrollToElementTopWithOffset(scrollToElement)
    }
  }
}

const handleSubmit = (event) => {
  doSearch()
  emitSearchEvent(event)

  if (event?.type === 'button') {
    scrollToResults()
  }
}

const handleFilterSubmit = (event) => {
  filterFormValues.value = event.data
  doSearch()
  scrollToResults()

  emitSearchEvent({ ...event, text: submitFiltersLabel, type: 'button' })
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

  updateSearchTerm('')
  filterFormValues.value = {}
  doSearch()
}

const toggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value

  emitRplEvent(
    'toggleFilters',
    {
      ...baseEvent(),
      action: filtersExpanded.value ? 'open' : 'close',
      text: toggleFiltersLabel
    },
    { global: true }
  )
}

const getFilterOptions = (field) => {
  if (!staticFacetOptions.value?.[field]) {
    return []
  }

  return staticFacetOptions.value?.[field].map((item) => ({
    id: item,
    label: item,
    value: item
  }))
}

const handlePagination = (event) => {
  goToPage(event.value)

  emitRplEvent(
    'paginate',
    {
      ...event,
      ...baseEvent()
    },
    { global: true }
  )
}

const displayResults = computed(() => {
  if (loading.value) {
    return Array(props.searchDriverOptions?.initialState?.resultsPerPage).fill({
      id: 'skeleton',
      component: 'TideSearchResultSkeleton'
    })
  }

  return results.value?.length ? results.value : []
})

const loading = computed(() => initialLoad.value || searchState.value.isLoading)

watch(
  () => searchState.value.isLoading,
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

      initialLoad.value = false
    }
  }
)
</script>

<template>
  <TideBaseLayout :id="id" :site="site" :page="page" :pageTitle="pageTitle">
    <template #aboveBody>
      <RplHeroHeader
        :title="pageTitle"
        :behind-nav="true"
        :breadcrumbs="true"
        :full-width="true"
        :corner-top="site?.cornerGraphic?.top?.src || true"
        :corner-bottom="false"
      >
        <div class="tide-search-header">
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            input-label="Search"
            :inputValue="searchState.searchTerm"
            :suggestions="searchTermSuggestions"
            :global-events="false"
            maxlength="128"
            @submit="handleSubmit"
            @update:input-value="updateSearchTerm"
          />
          <RplSearchBarRefine
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            aria-controls="tide-search-page-filters"
            @click="toggleFilters"
            >{{ toggleFiltersLabel }}</RplSearchBarRefine
          >
          <RplExpandable
            id="tide-search-page-filters"
            :expanded="filtersExpanded"
          >
            <RplForm
              v-if="staticFacetOptions !== null"
              id="tide-search-filter-form"
              v-model:model-value="filterFormValues"
              :title="pageTitle"
              @submit="handleFilterSubmit"
            >
              <div
                class="rpl-grid rpl-grid--no-row-gap rpl-u-margin-t-6 tide-search-filters"
              >
                <div
                  v-for="filter in filtersConfig"
                  :key="filter.field"
                  class="rpl-col-12 rpl-col-6-m"
                >
                  <FormKit
                    :id="filter.field"
                    :name="filter.field"
                    type="RplFormDropdown"
                    :multiple="true"
                    :label="filter.label"
                    :placeholder="filter.placeholder"
                    :options="getFilterOptions(filter.field)"
                  />
                </div>
              </div>
              <RplFormActions
                id="tide-search-page-actions"
                :label="submitFiltersLabel"
                resetLabel="Clear search filters"
                :displayResetButton="true"
                :globalEvents="false"
                @reset="handleFilterReset"
              />
            </RplForm>
          </RplExpandable>
        </div>
      </RplHeroHeader>
    </template>
    <template #body>
      <RplPageComponent v-if="!searchState.error">
        <TideSearchResultsCount
          :pagingStart="searchState.pagingStart"
          :pagingEnd="searchState.pagingEnd"
          :totalResults="searchState.totalResults"
          :results="results"
          :loading="loading"
        />
      </RplPageComponent>
      <RplPageComponent>
        <div class="rpl-grid">
          <div class="rpl-col-12 rpl-col-8-m">
            <div
              :class="{
                'tide-search-results': true,
                'tide-search-results--loading': loading && !searchState.error
              }"
            >
              <TideSearchError v-if="searchState.error" />
              <TideSearchNoResults
                v-else-if="
                  searchComplete && !loading && !searchState.totalResults
                "
                :query="searchState.searchTerm"
              />
              <RplResultListing v-else>
                <RplResultListingItem
                  v-for="(result, idx) in displayResults"
                  :key="`result-${idx}-${result.id}`"
                  data-component-type="search-result"
                >
                  <component :is="result.component" v-bind="result.props" />
                </RplResultListingItem>
              </RplResultListing>
            </div>
          </div>
        </div>
      </RplPageComponent>
      <RplPageComponent id="tide-search-pagination">
        <RplPagination
          v-if="searchState.totalPages > 1 && !searchState.error"
          :currentPage="searchState.current"
          :totalPages="searchState.totalPages"
          @change="handlePagination"
        />
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
