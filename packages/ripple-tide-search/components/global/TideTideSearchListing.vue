<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type {
  TideSearchListingPage,
  TideSearchListingResultItem
} from './../../types'

interface Props {
  site: TideSiteData
  page: TideSearchListingPage
}

const props = defineProps<Props>()

const resultsConfig = computed(() => {
  return props.page.config?.resultsConfig || props.page.config?.results
})

const searchResultsMappingFn = (item: any): TideSearchListingResultItem => {
  if (resultsConfig.value?.item) {
    for (const key in resultsConfig.value.item) {
      const mapping = resultsConfig.value.item[key]
      if (!item._source?.type || item._source?.type[0] === key || key === '*') {
        /* If there is no type, a component will be required */
        return {
          id: item._id,
          component: mapping.component,
          props: {
            result: item._source
          }
        }
      } else {
        /* Add default search result mapping if none provided */
        return {
          id: item._id,
          component: 'TideSearchResult',
          props: {
            result: item._source
          }
        }
      }
    }
  }

  return {
    id: item._id,
    props: {
      result: item._source
    }
  }
}
</script>

<template>
  <TideSearchListingPage
    :site="site"
    :contentPage="(page as any)"
    :title="page.title"
    :introText="page.introText"
    :searchListingConfig="page.config.searchListingConfig"
    :queryConfig="page.config.queryConfig"
    :globalFilters="page.config.globalFilters"
    :userFilters="page.config.userFilters"
    :resultsLayout="resultsConfig?.layout"
    :noResultsLayout="resultsConfig?.empty"
    :belowFilterComponent="page.config?.layoutConfig?.belowFilter"
    :searchResultsMappingFn="(searchResultsMappingFn as any)"
    :sortOptions="page.config.sortOptions"
  />
</template>
