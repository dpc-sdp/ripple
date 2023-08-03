<template>
  <TideSearchListingPage
    :site="site"
    :contentPage="page"
    :title="page.header.title"
    :searchListingConfig="searchListingConfig"
    :queryConfig="queryConfig"
    :globalFilters="globalFilters"
    :userFilters="[]"
    :resultsLayout="resultsLayout"
    :searchResultsMappingFn="searchResultsMappingFn"
  />
</template>

<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { TideTopicPage } from '../../types'
import { useRuntimeConfig } from '#imports'
import type { MappedSearchResult } from '@dpc-sdp/ripple-tide-search/types'

interface Props {
  site: TideSiteData
  page: TideTopicPage
}

const props = defineProps<Props>()

const { public: config } = useRuntimeConfig()
const siteId = config.tide?.site

const searchListingConfig = {
  labels: {
    placeholder: `Search in '${props.page.filter.value}'`
  },
  customSort: [
    {
      _score: 'desc'
    }
  ]
}

const globalFilters = [
  { terms: { field_node_site: [siteId] } },
  {
    terms: {
      [props.page.filter.field]: [props.page.filter.value]
    }
  }
]

const resultsLayout = {
  component: 'TideSearchResultsList'
}

const queryConfig = {
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
}

const searchResultsMappingFn = (item): MappedSearchResult<any> => {
  return {
    id: item._id,
    component: 'TideSearchResult',
    props: {
      result: item._source
    }
  }
}
</script>
