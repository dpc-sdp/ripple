<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRuntimeConfig, useFetch, useRoute } from '#imports'
import useTideSearch from './../composables/useTideSearch'
import type {
  TideSearchListingPage,
  TideSearchListingResultLayout
} from './../types'

interface Props {
  title: string
  summary: string
  searchListingConfig: TideSearchListingPage['searchListingConfig']
  index: TideSearchListingPage['index']
  queryConfig: TideSearchListingPage['queryConfig']
  globalFilters: TideSearchListingPage['globalFilters']
  userFilters: TideSearchListingPage['userFilters']
  resultsLayout?: TideSearchListingResultLayout
  searchResultsMappingFn: (item: any) => any
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Search',
  searchListingConfig: () => ({
    searchPlaceholder: 'Enter a search term',
    resultsPerPage: 9
  }),
  resultsLayout: {
    component: 'TideSearchResultsList',
    props: {}
  }
})

const route = useRoute()
const { public: config } = useRuntimeConfig()
const siteId = config.tide?.site

const { data: site } = useFetch('/api/tide/site', {
  baseURL: config.apiUrl || '',
  params: {
    id: siteId
  }
})

const {
  getSearchResults,
  getSuggestions,
  filterForm,
  suggestions,
  results,
  searchTerm
} = await useTideSearch(
  props.queryConfig,
  props.userFilters,
  props.globalFilters,
  props.searchResultsMappingFn,
  props.index
)

const filtersExpanded = ref(false)

// const prevLink = computed(() => {
//   if (searchState.value.current <= 1) {
//     return null
//   }

//   const searchParams = new URLSearchParams({
//     ...route.query,
//     current: `n_${searchState.value.current - 1}_n`
//   })

//   return {
//     url: `${route.path}?${searchParams.toString()}`,
//     description: `${searchState.value.current - 1} of ${
//       searchState.value.totalPages
//     }`
//   }
// })

// const nextLink = computed(() => {
//   if (searchState.value.current === searchState.value.totalPages) {
//     return null
//   }

//   const searchParams = new URLSearchParams({
//     ...route.query,
//     current: `n_${searchState.value?.current + 1}_n`
//   })

//   return {
//     url: `${route.path}?${searchParams.toString()}`,
//     description: `${searchState.value.current + 1} of ${
//       searchState.value.totalPages
//     }`
//   }
// })

// const handlePrevClick = () => {
//   goToPage(searchState.value.current - 1)
// }

// const handleNextClick = () => {
//   goToPage(searchState.value.current + 1)
// }

const updateSearchTerm = () => {
  getSuggestions()
}

const handleFilterSubmit = () => {
  getSearchResults()
}

const handleFilterReset = () => {
  console.log('test filter reset')
  filterForm.value = {}
  getSearchResults()
}

const toggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value
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
        <p class="rpl-type-p-large" v-if="summary">{{ summary }}</p>
        <div class="tide-search-header">
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            :input-label="searchListingConfig.searchLabel"
            :inputValue="searchTerm"
            :placeholder="searchListingConfig.searchPlaceholder"
            :suggestions="suggestions"
            @on-submit="getSearchResults"
            @update:input-value="updateSearchTerm"
          />
          <RplSearchBarRefine
            v-if="searchListingConfig.hideFilters"
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            @click="toggleFilters"
          />

          <RplExpandable v-if="searchListingConfig.hideFilters">
            <TideSearchFilters
              :filter-form-values="filterForm"
              :filterInputs="userFilters"
              :submitLabel="searchListingConfig.labels.submit"
              :resetLabel="searchListingConfig.labels.reset"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </RplExpandable>
          <div v-else class="rpl-u-margin-t-4">
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
      <!-- <RplPageComponent v-if="!searchState.error && searchState.totalResults">
        <p class="rpl-type-label rpl-u-padding-b-6">
          Displaying {{ searchState.pagingStart }}-{{
            searchState.pagingEnd
          }}
          of {{ searchState.totalResults }} results
        </p>
      </RplPageComponent> -->
      <RplPageComponent>
        <!-- <div
          :class="{
            'tide-search-results': true,
            'tide-search-results--loading':
              searchState.isLoading && !searchState.error
          }"
        >
          <div v-if="searchState.error">
            <slot name="error">
              <RplContent>
                <p class="rpl-type-h3">
                  Sorry! Something went wrong. Please try again later.
                </p>
              </RplContent>
            </slot>
          </div>
          <div v-else-if="!searchState.isLoading && !searchState.totalResults">
            <slot
              name="noresults"
              :resultSearchTerm="searchState.resultSearchTerm"
            >
              <RplContent>
                <p class="rpl-type-h3">
                  Sorry! We couldn't find any matches for '{{
                    searchState.resultSearchTerm
                  }}'.
                </p>
                <p>To improve your search results:</p>
                <ul>
                  <li>use different or fewer keywords</li>
                  <li>check spelling.</li>
                </ul>
              </RplContent>
            </slot>
          </div> -->
        <slot name="results" :results="results">
          <component :is="resultsLayout.component" :results="results" />
        </slot>
        <!-- </div> -->
      </RplPageComponent>
      <!--
        <RplPageComponent>
         <slot
          name="pagination"
          :results="results"
          :hasError="searchState.error"
        >
          <RplPageLinks v-if="results && results.length && !searchState.error">
            <RplPageLinksItem
              v-if="prevLink"
              :url="prevLink.url"
              label="Previous"
              direction="prev"
              @click.prevent="handlePrevClick"
            >
              {{ prevLink.description }}
            </RplPageLinksItem>
            <RplPageLinksItem
              v-if="nextLink"
              :url="nextLink.url"
              label="Next"
              direction="next"
              @click.prevent="handleNextClick"
            >
              {{ nextLink.description }}
            </RplPageLinksItem></RplPageLinks
          >
        </slot>
      </RplPageComponent> -->
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
