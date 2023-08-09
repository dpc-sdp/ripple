<template>
  <RplDataTable
    data-component-type="search-listing-layout-table"
    caption=""
    class="tide-search-listing-results-table"
    :columns="columns"
    :items="items"
  />
</template>

<script setup lang="ts">
import { computed, getSearchResultValue } from '#imports'

type tableColumnConfig = {
  key: string
  label: string
  component?: string
  props?: any
}

interface Props {
  results: Record<string, unknown>[]
  columns: tableColumnConfig[]
}

const props = defineProps<Props>()

const items = computed(() => {
  if (Array.isArray(props.columns) && Array.isArray(props.results)) {
    return props.results?.map((itm) =>
      props.columns?.map((col) => {
        if (col.component) {
          if (itm.hasOwnProperty('_source')) {
            return itm._source
          }
        }
        return getSearchResultValue(itm && itm._source, col.key)
      })
    )
  }
})
</script>

<style>
.tide-search-listing-results-table {
  padding: 0;
  margin: 0;
}
</style>
