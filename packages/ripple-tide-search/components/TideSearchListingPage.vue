<script setup lang="ts">
import { useRuntimeConfig, useFetch, useRoute, ref, toRaw } from '#imports'
import useTideSearch from './../composables/useTideSearch'
import type {
  TideSearchListingPage,
  MappedSearchResult,
  TideSearchListingResultLayout
} from './../types'

interface Props {
  title: string
  summary?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  index: string
  autocompleteQuery?: boolean
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  resultsLayout: TideSearchListingResultLayout
  searchResultsMappingFn?: (item: any) => MappedSearchResult<any>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Search',
  summary: '',
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

const { public: config } = useRuntimeConfig()
const siteId = config.tide?.site
const route = useRoute()

const { data: site } = useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  suggestions,
  filterForm,
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

const handleSearchSubmit = () => {
  submitSearch()
}

const handleFilterSubmit = (form) => {
  filterForm.value = form
  submitSearch()
}

const handleFilterReset = () => {
  filterForm.value = {}
  submitSearch()
}

const handleUpdateSearchTerm = (term) => {
  searchTerm.value = term
  if (props.autocompleteQuery) {
    getSuggestions()
  }
}

function scrollToElementTopWithOffset(element, offset) {
  const elementTop = element.getBoundingClientRect().top + window.scrollY
  const scrollToPosition = elementTop - offset

  window.scrollTo({
    top: scrollToPosition,
    behavior: 'smooth'
  })
}

const handlePageChange = (newPage: number) => {
  const navHeight = 92
  const layoutBody = document.querySelector('.rpl-layout__body-wrap')

  if (layoutBody) {
    scrollToElementTopWithOffset(layoutBody, navHeight)
  }

  goToPage(newPage)
}
</script>

<template>
  <TideBaseLayout :site="site">
    <template #aboveBody>
      <RplHeroHeader
        :title="title"
        :behind-nav="true"
        :breadcrumbs="true"
        :full-width="true"
        :corner-top="true"
        :corner-bottom="false"
      >
        <p v-if="summary" class="rpl-type-p-large">{{ summary }}</p>
        <div class="tide-search-header">
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            :input-label="searchListingConfig.labels?.submit"
            :inputValue="searchTerm"
            :placeholder="searchListingConfig.labels?.placeholder"
            :suggestions="suggestions"
            @on-submit="handleSearchSubmit"
            @update:input-value="handleUpdateSearchTerm"
          />
          <div
            v-if="userFilters && userFilters.length > 0"
            class="rpl-u-margin-t-4"
          >
            <TideSearchFilters
              :filter-form-values="filterForm"
              :filterInputs="userFilters"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </div>
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
          <p class="rpl-type-label rpl-u-padding-b-6">
            Displaying {{ pagingStart + 1 }}-{{ pagingEnd + 1 }} of
            {{ totalResults }} results
          </p>
        </RplPageComponent>
      </slot>
      <RplPageComponent>
        <div :class="{ 'tide-search-results--loading': isBusy }">
          <div v-if="searchError">
            <RplContent data-component-type="search-listing-error">
              <p class="rpl-type-h3">
                Sorry! Something went wrong. Please try again later.
              </p>
            </RplContent>
          </div>
          <RplContent
            v-else-if="!isBusy && !results?.length"
            data-component-type="search-listing-no-results"
          >
            <p class="rpl-type-h3">
              Sorry! We couldn't find any matches for '{{ route.query.q }}'.
            </p>
            <p>To improve your search results:</p>
            <ul>
              <li>use different or fewer keywords</li>
              <li>check spelling.</li>
            </ul>
          </RplContent>

          <slot name="results" :results="results">
            <component
              v-if="results && results.length > 0"
              :key="`TideSearchListingResultsLayout${resultsLayout.component}`"
              :is="resultsLayout.component"
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
          <RplPagination
            v-if="totalPages > 1"
            :currentPage="page"
            :totalPages="totalPages"
            @change="handlePageChange"
          />
        </slot>
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
