<script setup lang="ts">
import { computed } from 'vue'
import { RplSearchBar, RplHeroHeader } from '@dpc-sdp/ripple-ui-core'
import { useRuntimeConfig, useFetch, useRoute } from '#imports'
import useTideSearch from './../composables/use-tide-search'
import { MappedSearchResult } from 'ripple-tide-search/types'

const route = useRoute()
const { public: config } = useRuntimeConfig()
const siteId = config.tide?.contentApi.site

const { data: site } = useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

const apiConnectorOptions = config.tide?.appSearch

const searchDriverOptions = {
  initialState: { resultsPerPage: 4 },
  search_fields: {
    title: {
      weight: 10
    },
    body: {},
    field_paragraph_body: {}
  },
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: { fields: ['title'] }
      },
      size: 10
    }
  }
}

const searchResultsMappingFn = (item): MappedSearchResult<any> => {
  return {
    id: item._meta.id,
    component: 'RplSearchResult',
    props: {
      title: item.title?.raw?.[0],
      url: item.url?.raw?.[0].replace(/\/site-(\d+)/, ''),
      summary:
        item.field_paragraph_summary?.raw?.[0] ||
        item.field_landing_page_intro_text?.raw?.[0],
      updated: item.changed?.raw?.[0]
    }
  }
}

const {
  updateSearchTerm,
  doSearch,
  goToPage,
  searchState,
  searchTermSuggestions,
  results
} = await useTideSearch(
  apiConnectorOptions,
  searchDriverOptions,
  searchResultsMappingFn
)

const prevLink = computed(() => {
  if (searchState.value.current <= 1) {
    return null
  }

  const searchParams = new URLSearchParams({
    ...route.query,
    current: `n_${searchState.value.current - 1}_n`
  })

  return {
    url: `${route.path}?${searchParams.toString()}`,
    description: `${searchState.value.current - 1} of ${
      searchState.value.totalPages
    }`
  }
})

const nextLink = computed(() => {
  if (searchState.value.current === searchState.value.totalPages) {
    return null
  }

  const searchParams = new URLSearchParams({
    ...route.query,
    current: `n_${searchState.value.current + 1}_n`
  })

  return {
    url: `${route.path}?${searchParams.toString()}`,
    description: `${searchState.value.current + 1} of ${
      searchState.value.totalPages
    }`
  }
})

const handlePrevClick = () => {
  goToPage(searchState.value.current - 1)
}

const handleNextClick = () => {
  goToPage(searchState.value.current + 1)
}
</script>

<template>
  <TideBaseLayout :site="site">
    <template #aboveBody>
      <RplHeroHeader
        title="Search"
        :behind-nav="true"
        :breadcrumbs="true"
        :full-width="true"
        :corner-top="true"
        :corner-bottom="false"
      >
        <div class="rpl-search__header">
          <RplSearchBar
            variant="default"
            input-label="Search"
            :inputValue="searchState.searchTerm"
            @on-submit="doSearch"
            @update:input-value="updateSearchTerm"
          />
          <RplButton
            class="rpl-search__refine-btn"
            variant="white"
            icon-name="icon-chevron-down"
            icon-position="right"
          >
            Refine search</RplButton
          >
        </div>
        <!-- <ul v-if="showSuggestions" class="rpl-search__autocomplete-results">
          <li v-for="res in displayedSuggestions" :key="res">
            <button
              class="rpl-text-link rpl-u-focusable-inline"
              @click="updateQueryTerm(res)"
            >
              {{ res }}
            </button>
          </li>
        </ul> -->
        <ul class="rpl-search__autocomplete-results">
          <li v-for="res in searchTermSuggestions" :key="res">
            <button class="rpl-text-link rpl-u-focusable-inline">
              {{ res }}
            </button>
          </li>
        </ul>
      </RplHeroHeader>
    </template>
    <template #body>
      <RplLayoutPageComponent>
        <p class="rpl-type-label rpl-u-padding-b-6">
          Displaying {{ searchState.pagingStart }}-{{
            searchState.pagingEnd
          }}
          of {{ searchState.totalResults }} results
        </p>
      </RplLayoutPageComponent>
      <RplLayoutPageComponent>
        <div class="rpl-grid">
          <div class="rpl-col-12 rpl-col-8-m">
            <RplResultListing>
              <RplResultListingItem
                v-for="(result, idx) in results"
                :key="`result-${idx}-${result.id}`"
              >
                <component :is="result.component" v-bind="result.props" />
              </RplResultListingItem>
            </RplResultListing>
          </div>
        </div>
      </RplLayoutPageComponent>
      <RplLayoutPageComponent>
        <RplPageLinks v-if="results && results.length">
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
      </RplLayoutPageComponent>
    </template>
  </TideBaseLayout>
</template>

<style>
.rpl-search__header {
  display: flex;
  flex-direction: column;
}

.rpl-search__refine-btn {
  align-self: flex-end;
}

.rpl-search__autocomplete-results {
  position: absolute;
  background-color: white;
  z-index: 999;
}
</style>
