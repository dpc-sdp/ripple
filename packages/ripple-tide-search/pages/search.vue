<script setup lang="ts">
import { FilterConfigItem } from '../types'

const filtersConfig: FilterConfigItem[] = [
  {
    label: 'Select a topic',
    placeholder: 'Select',
    field: 'field_topic_name',
    filterType: 'any'
  }
]

const searchDriverOptions = {
  initialState: { resultsPerPage: 10 },
  searchQuery: {
    search_fields: {
      title: {
        weight: 10
      },
      body: {},
      field_paragraph_body: {}
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
</script>

<template>
  <TideSearchPage
    pageTitle="Search"
    :searchDriverOptions="searchDriverOptions"
    :filtersConfig="filtersConfig"
  />
</template>
