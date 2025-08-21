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
  let itemComponent = 'TideSearchResult'

  if (resultsConfig.value?.item) {
    const mapping =
      resultsConfig.value.item[item._source?.type] ??
      resultsConfig.value.item?.['*']

    if (mapping) {
      itemComponent = mapping.component
    }
  }

  return {
    id: item._id,
    component: itemComponent,
    props: {
      result: item._source
    }
  }
}
</script>

<template>
  <TideSearchListingPage
    :site="site"
    :contentPage="page as any"
    :title="page.title"
    :introText="page.introText"
    :searchListingConfig="page.config.searchListingConfig"
    :customQueryConfig="page.config.customQueryConfig"
    :queryConfig="page.config.queryConfig"
    :globalFilters="page.config.globalFilters"
    :userFilters="page.config.userFilters"
    :resultsLayout="resultsConfig?.layout"
    :noResultsLayout="resultsConfig?.empty"
    :emptyIndexLayout="resultsConfig?.emptyIndex"
    :belowFilterComponent="page.config?.layoutConfig?.belowFilter"
    :searchResultsMappingFn="searchResultsMappingFn as any"
    :sortOptions="page.config.sortOptions"
  />
</template>
