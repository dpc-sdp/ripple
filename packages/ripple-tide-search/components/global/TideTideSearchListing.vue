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

const searchResultsMappingFn = (item): TideSearchListingResultItem => {
  if (props.page.config.results.item) {
    for (const key in props.page.config.results.item) {
      const mapping = props.page.config.results.item[key]
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
  return item
}
</script>

<template>
  <TideSearchListingPage
    :site="site"
    :contentPage="page"
    :title="page.title"
    :introText="page.introText"
    :searchListingConfig="page.config.searchListingConfig"
    :queryConfig="page.config.queryConfig"
    :globalFilters="page.config.globalFilters"
    :userFilters="page.config.userFilters"
    :resultsLayout="page.config.results?.layout"
    :searchResultsMappingFn="searchResultsMappingFn"
    :sortOptions="page.config.sortOptions"
  />
</template>
