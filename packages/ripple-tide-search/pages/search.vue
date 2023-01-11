<script setup lang="ts">
import { computed } from 'vue'
import { RplSearchBar, RplHeroHeader } from '@dpc-sdp/ripple-ui-core'
import { useRuntimeConfig, useFetch } from '#imports'
import useTideSearch from './../composables/use-tide-search'
import { MappedSearchResult } from 'ripple-tide-search/types'

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
  initialState: { resultsPerPage: 5 },
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
    component: 'RplResultListing',
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
  searchState,
  searchDriver,
  searchTermSuggestions,
  results
} = await useTideSearch(
  apiConnectorOptions,
  searchDriverOptions,
  searchResultsMappingFn
)

searchDriver.URLManager.getStateFromURL

const paginationLinks = computed(() => {
  return {
    prev: { text: 'Check out this page', url: '#page' },
    next: { text: 'Another page to look at', url: '#another-page' }
  }
})
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
      <!-- <p class="rpl-type-label">{{ resultsCountText }}</p> -->
      <ul>
        <li
          v-for="(result, idx) in results"
          :key="`result-${idx}-${result.id}`"
        >
          <component :is="result.component" v-bind="result.props" />
        </li>
      </ul>
      <RplPageLinks v-bind="paginationLinks" />
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
