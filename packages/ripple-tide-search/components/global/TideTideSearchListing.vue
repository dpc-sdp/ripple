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
  if (props.page.results.item) {
    for (const key in props.page.results.item) {
      const mapping = props.page.results.item[key]
      if (item._source?.type[0] === key || key === '*') {
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
}
</script>

<template>
  <TideSearchListingPage
    :title="page.title"
    :summary="page.summary"
    :meta="page.meta"
    :searchListingConfig="page.searchListingConfig"
    :index="page.index"
    :queryConfig="page.queryConfig"
    :globalFilters="page.globalFilters"
    :userFilters="page.userFilters"
    :resultsLayout="page.results?.layout"
    :searchResultsMappingFn="searchResultsMappingFn"
  />
</template>
