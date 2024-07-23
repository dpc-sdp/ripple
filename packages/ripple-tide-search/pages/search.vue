<script setup lang="ts">
import { AppSearchFilterConfigItem, MappedSearchResult } from '../types'
import {
  formatDate,
  useRuntimeConfig,
  useAppConfig,
  useTideSite
} from '#imports'

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
const site = await useTideSite()

const filtersConfig: AppSearchFilterConfigItem[] = [
  {
    label: 'Select a topic',
    placeholder: 'Select',
    field: 'field_topic_name',
    filterType: 'any'
  }
]

const searchDriverOptions = {
  initialState: { resultsPerPage: 10 },
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    filters: [
      {
        field: 'field_node_site',
        values: [runtimeConfig.public.tide?.site]
      },
      {
        field: 'type',
        values: site?.featureFlags?.siteSearchContentTypes
          ? site?.featureFlags?.siteSearchContentTypes
              .split(',')
              .map((type) => type.trim())
          : appConfig.ripple?.search?.contentTypes
      }
    ],
    search_fields: {
      title: {
        weight: 10
      },
      body: {},
      field_paragraph_body: {},
      field_landing_page_summary: {},
      summary_processed: {},
      field_paragraph_summary: {},
      field_event_details_event_locality: {}
    },
    result_fields: {
      title: {
        raw: {
          size: 150
        }
      },
      field_landing_page_summary: {
        snippet: {
          size: 150,
          fallback: true
        }
      },
      summary_processed: {
        snippet: {
          size: 150,
          fallback: true
        }
      },
      changed: {
        raw: {}
      },
      url: {
        raw: {}
      },
      type: {
        raw: {}
      }
    }
  },
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: { fields: ['title'] }
      },
      size: 8
    }
  }
}

const searchResultsMappingFn = (item): MappedSearchResult<any> => {
  const { $app_origin } = useNuxtApp()
  let summaryField =
    item.summary_processed?.snippet || item.field_landing_page_summary?.snippet

  const rawUpdated = item.changed?.raw?.[0]

  return {
    id: item._meta.id,
    component: 'TideAppSearchResult',
    props: {
      title: item.title?.raw?.[0],
      url: stripSiteId(item.url?.raw?.[0], $app_origin || ''),
      content: summaryField,
      updated: rawUpdated ? formatDate(rawUpdated) : ''
    }
  }
}
</script>

<template>
  <TideSearchPage
    pageTitle="Search"
    :site="site"
    :searchDriverOptions="searchDriverOptions"
    :filtersConfig="filtersConfig"
    :searchResultsMappingFn="searchResultsMappingFn"
  />
</template>
