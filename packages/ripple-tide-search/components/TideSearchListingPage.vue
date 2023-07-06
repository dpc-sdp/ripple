<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRuntimeConfig, useFetch, useRoute } from '#imports'
import useTideSearch from './../composables/useTideSearch'
import type {
  TideSearchListingPage,
  MappedSearchResult,
  TideSearchListingResultLayout
} from './../types'

interface Props {
  title: string
  summary?: string
  pageConfig?: TideSearchListingPage['pageConfig']
  searchConfig?: null | {
    index: string
  }
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
  searchConfig: null,
  pageConfig: () => ({
    searchLabel: 'Submit',
    searchPlaceholder: 'Enter a search term'
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

const { data: site } = useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

const {
  getSearchResults,
  getSuggestions,
  searchTerm,
  results,
  suggestions,
  filterForm
} = useTideSearch(
  props.queryConfig,
  props.userFilters,
  props.globalFilters,
  props.searchResultsMappingFn
)

const handleSearchSubmit = () => {
  getSearchResults()
}

const handleFilterSubmit = (form) => {
  filterForm.value = form.data
  getSearchResults()
}

const handleFilterReset = () => {
  filterForm.value = []
  getSearchResults()
}

const updateSearchTerm = (term) => {
  searchTerm.value = term
  if (props.autocompleteQuery) {
    getSuggestions()
  }
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
            :input-label="pageConfig.searchLabel"
            :inputValue="searchTerm"
            :placeholder="pageConfig.searchPlaceholder"
            :suggestions="suggestions"
            @on-submit="handleSearchSubmit"
            @update:input-value="updateSearchTerm"
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
      <RplPageComponent>
        <slot name="results" :results="results">
          <component
            :is="resultsLayout.component"
            v-bind="resultsLayout.props"
            :results="results"
          />
        </slot>
      </RplPageComponent>
      <RplPageComponent>
        <slot name="pagination" :results="results"> </slot>
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
