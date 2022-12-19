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
        <ul v-if="showSuggestions" class="rpl-search__autocomplete-results">
          <li v-for="res in displayedSuggestions" :key="res">
            <button class="rpl-text-link rpl-u-focusable-inline" @click="updateQueryTerm(res)">{{
                res
            }}</button>
          </li>
        </ul>
      </RplHeroHeader>
    </template>
    <template #body>
      <p class="rpl-type-label">{{ resultsCountText }}</p>
      <ul>
        <li v-for="(result, idx) in displayedResults" :key="`result-${idx}-${result.title}`">
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
  displayedResults,
  displayedSuggestions,
  updateQueryTerm,
  handleTermUpdate,
  handleSubmit,
  queryTerm,
  resultsCountText,
  searchDriver,
} = await useTideSearch(apiConnectorOptions, searchDriverOptions, searchResultsMappingFn)

searchDriver.setSearchQuery(route.params?.q || '')


const paginationLinks = computed(() => {
  return {
    prev: { text: 'Check out this page', url: '#page' },
    next: { text: 'Another page to look at', url: '#another-page' }
  }
})

handleSubmit()

onMounted(() => {
  console.log(displayedResults.value)
  handleSubmit()
})


const showSuggestions = computed(() => {
  if (displayedSuggestions.value.length > 0 && queryTerm.value.length > 0) {
    return true
  }
  return false
})
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
