<script setup lang="ts">
import { useTideSite } from '#imports'
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type {
  TideSearchListingConfig,
  TideSearchListingResultItem
} from './../types'

const searchConfig: TideSearchListingConfig = {
  searchListingConfig: {
    filterByCurrentSite: true,
    resultsPerPage: 10,
    showFiltersOnLoad: true,
    labels: {
      submit: 'Search',
      placeholder: ''
    },
    customSort: [
      {
        _score: 'desc'
      },
      {
        changed: 'desc'
      }
    ]
  },
  queryConfig: {
    multi_match: {
      query: '{{query}}',
      fields: [
        'title^3',
        'field_landing_page_summary^2',
        'body',
        'field_paragraph_body',
        'summary_processed',
        'field_paragraph_summary',
        'field_event_details_event_locality'
      ]
    }
  },
  resultsConfig: {
    layout: {
      component: 'TideSearchResultsList'
    },
    item: {
      '*': {
        component: 'TideSearchResult'
      }
    }
  },
  globalFilters: [
    {
      terms: {
        type: [
          'landing_page',
          'event',
          'grant',
          'news',
          'publication',
          'tide_search_listing'
        ]
      }
    }
  ],
  userFilters: [
    {
      id: 'topic',
      component: 'TideSearchFilterDropdown',
      filter: {
        type: 'terms',
        value: 'field_topic_name.keyword',
        multiple: true
      },
      aggregations: {
        field: 'field_topic_name.keyword',
        source: 'elastic'
      },
      props: {
        id: 'topic',
        label: 'Select a topic',
        placeholder: 'Select',
        type: 'RplFormDropdown',
        multiple: true
      }
    }
  ]
}

const site: TideSiteData = await useTideSite()
const page = { title: 'Search' }

const searchResultsMappingFn = (item: any): TideSearchListingResultItem => {
  let itemComponent = 'TideSearchResult'

  if (searchConfig?.resultsConfig?.item) {
    const mapping =
      searchConfig.resultsConfig.item[item._source?.type] ??
      searchConfig.resultsConfig.item?.['*']

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
    :searchListingConfig="searchConfig.searchListingConfig"
    :customQueryConfig="searchConfig.customQueryConfig"
    :queryConfig="searchConfig.queryConfig"
    :globalFilters="searchConfig.globalFilters"
    :userFilters="searchConfig.userFilters"
    :resultsLayout="searchConfig?.resultsConfig?.layout"
    :noResultsLayout="searchConfig?.resultsConfig?.empty"
    :belowFilterComponent="searchConfig?.layoutConfig?.belowFilter"
    :searchResultsMappingFn="searchResultsMappingFn as any"
    :sortOptions="searchConfig.sortOptions"
  />
</template>
