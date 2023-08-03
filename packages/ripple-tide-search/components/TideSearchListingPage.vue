<script setup lang="ts">
import { useRoute, ref, toRaw, computed } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../composables/useTideSearch'
import type { TidePageBase, TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type {
  TideSearchListingPage,
  MappedSearchResult,
  TideSearchListingResultLayout
} from './../types'

interface Props {
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  autocompleteQuery?: boolean
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  resultsLayout: TideSearchListingResultLayout
  searchResultsMappingFn?: (item: any) => MappedSearchResult<any>
  contentPage: TidePageBase
  site: TideSiteData
}

const props = withDefaults(defineProps<Props>(), {
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

const route = useRoute()
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
  if (props.userFilters && props.userFilters.length) {
    // Submitting the search term should also 'apply' the filters, but the filters live in a seperate form.
    // To solve this, when the search term form is submitted, we trigger a submission of the filters form,
    // it is there where the actual search request will be triggered.
    // This will only work if there is an actual filter form to submit.
    submitForm('tide-search-filter-form')
  } else {
    // If there's no filters in the form, we need to just do the search without submitting the filter form
    submitSearch()
  }
}

const handleFilterSubmit = (form) => {
  filterForm.value = form
  submitSearch()
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

function scrollToElementTopWithOffset(element, offset) {
  const elementTop = element.getBoundingClientRect().top + window.scrollY
  const scrollToPosition = elementTop - offset

  window.scrollTo({
    top: scrollToPosition,
    behavior: 'smooth'
  })
}

const handlePageChange = ({ value }) => {
  const navHeight = 92
  const layoutBody = document.querySelector('.rpl-layout__body-wrap')

  if (layoutBody) {
    scrollToElementTopWithOffset(layoutBody, navHeight)
  }

  goToPage(value)
}

const handleToggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value
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
</script>

<template>
  <TideBaseLayout
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
            @on-submit="handleSearchSubmit"
            @update:input-value="handleUpdateSearchTerm"
          />
          <RplSearchBarRefine
            v-if="userFilters && userFilters.length > 0"
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            @click="handleToggleFilters"
            >Refine search{{
              numAppliedFilters ? ` (${numAppliedFilters})` : ''
            }}</RplSearchBarRefine
          >
          <RplExpandable
            v-if="userFilters && userFilters.length > 0"
            :expanded="filtersExpanded"
            class="rpl-u-margin-t-4"
          >
            <TideSearchFilters
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
