<template>
  <RplLayout>
    <template #aboveHeader>
      <RplIconSprite />
    </template>
    <template #primaryNav>
      <slot name="primaryNav">
        <RplPrimaryNav :primary-logo="primaryLogo" :items="site?.menus.menuMain"></RplPrimaryNav>
      </slot>
    </template>
    <template #aboveBody>
      <RplHeroHeader title="Search" :behind-nav="true" :breadcrumbs="true" :full-width="true" :corner-top="cnrImg">
        <div class="rpl-search__header">
          <RplSearchBar variant="default" input-label="Search" :inputValue="queryTerm" @on-submit="handleSubmit"
            @update:input-value="handleTermUpdate" />
          <RplButton class="rpl-search__refine-btn" variant="white" icon-name="icon-chevron-down" icon-position="right">
            Refine search</RplButton>
        </div>
        <ul v-if="autocompleteResultsListing.length > 0" class="rpl-search__autocomplete-results">
          <li v-for="res in autocompleteResultsListing" :key="res">
            <button class="rpl-text-link rpl-u-focusable-inline" @click="updateQueryTerm(res.title.raw[0])">{{
                res.title.raw[0]
            }}</button>
          </li>
        </ul>
      </RplHeroHeader>
    </template>
    <template #body>
      <p class="rpl-type-label">{{ resultsCountText }}</p>
      <ul>
        <li v-for="(result, idx) in results" :key="`result-${idx}-${result.title}`">
          <RplSearchResult v-bind="result">

          </RplSearchResult>
        </li>
      </ul>
      <RplPageLinks v-bind="paginationLinks" />
    </template>
    <template #footer>
      <slot name="footer">
        <RplFooter></RplFooter>
      </slot>
    </template>
  </RplLayout>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RplSearchBar, RplHeroHeader } from '@dpc-sdp/ripple-ui-core'
import RplSearchResult from './../components/RplSearchResult/RplSearchResult.vue'
import {
  useRuntimeConfig,
  useFetch,
  useRoute
} from '#imports'
import useTideSearch from './../composables/use-tide-search'
const route = useRoute()
const { public: config } = useRuntimeConfig()
const siteId = config.tide?.contentApi.site

const { data: site } =
  useFetch('/api/tide/site', {
    baseURL: config.API_URL || '',
    params: {
      id: siteId
    }
  })

const primaryLogo = {
  href: '#',
  src: '/img/primary-nav-logo-primary.svg',
  altText: 'Primary logo alt text'
}

const cnrImg = 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Parliament-of-Victoria.jpg'

const apiConnectorOptions = {
  searchKey: 'search-r53dt9vrcmow7jehdb7671uy',
  endpointBase:
    'https://search-improvements-poc.ent.australiaeast.azure.elastic-cloud.com',
  engineName: 'content-vic-production-app-search',

}

const searchDriverOptions = {
  initialState: { resultsPerPage: 10 },
  search_fields: {
    title: {
      weight: 10,
    },
    body: {},
    field_paragraph_body: {}
  },
  suggestions: {
    popularQueries: {
      search_fields: {
        "event.query_string": {} // fields used to query
      },
      index: "ds-logs-app_search.analytics-default-2022.12.09-000002",
      queryType: "results"
    }
  }


}

const searchResultsMappingFn = (itm) => {
  return {
    title: itm.title?.raw?.[0],
    url: itm.url?.raw?.[0].replace(/\/site-(\d+)/, ''),
    summary:
      itm.field_paragraph_summary?.raw?.[0] ||
      itm.field_landing_page_intro_text?.raw?.[0],
    updated: itm.changed?.raw?.[0]
  }
}

const {
  results,
  resultsCountText,
  searchDriver,
  autocompletedSuggestions,
  autocompletedResults,
  searchState
} = await useTideSearch(apiConnectorOptions, searchDriverOptions, searchResultsMappingFn)

searchDriver.setSearchQuery(route.params?.q || '')

let searchResultsListing = ref([])
let suggestionsListing = ref([])
let autocompleteResultsListing = ref([])
const { searchTerm } = searchDriver.getState()
let queryTerm = ref(searchTerm || '')



const paginationLinks = computed(() => {
  return {
    prev: { text: 'Check out this page', url: '#page' },
    next: { text: 'Another page to look at', url: '#another-page' }
  }
})

function updateQueryTerm(term, searchTermOptions = {}) {
  queryTerm.value = term
  handleTermUpdate(term)
  handleSubmit()
}

function handleTermUpdate(value) {
  const searchTermOptions = {
    autocompleteResults: true,
    autocompleteSuggestions: true,
    autocompleteMinimumCharacters: 3,
  }
  searchDriver.getActions().setSearchTerm(value, searchTermOptions)
  suggestionsListing.value = autocompletedSuggestions.value
  autocompleteResultsListing.value = autocompletedResults.value
}


function handleSubmit() {
  console.log('handleSubmit')
  searchResultsListing.value = results.value
  suggestionsListing.value = []
  autocompleteResultsListing.value = []
}

// onMounted(() => {
//   console.log('onMounted')
// })
handleSubmit()
searchResultsListing.value = results.value
// TODO: Add pagination
// function setCurrentPage(page) {
//   searchDriver.setCurrent(page);
// }

</script>

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
