<template>
  <RplDataTable
    data-component-type="search-listing-layout-table"
    caption=""
    class="tide-search-listing-results-table"
    :columns="processedColumns"
    :items="items"
  />
</template>

<script setup lang="ts">
import { computed } from '#imports'

type tableColumnConfig = {
  label: string
  objectKey: string
  format?: 'date' | null
  cols?: number
  component?: string
  props?: any
}

interface Props {
  results: Record<string, unknown>[]
  columns: tableColumnConfig[]
}

const props = defineProps<Props>()

const items = computed(() => {
  return (props.results || []).map((result) => {
    return {
      id: result._id,
      ...(result._source as Record<string, unknown>)
    }
  })
})

const processedColumns = computed(() => {
  return props.columns.map((column) => {
    const classes = [`tide-search-listing-table-cols__${column.cols}`]

    if (column.component) {
      return {
        ...column,
        classes
      }
    } else {
      return {
        ...column,
        classes,
        component: 'TideSearchListingTableValue'
      }
    }
  })
})
</script>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-listing-results-table {
  padding: 0;
  margin: 0;
}

@media (--rpl-bp-s) {
  .tide-search-listing-table-cols__1 {
    width: 8.3333333333%;
  }

  .tide-search-listing-table-cols__2 {
    width: 16.6666666667%;
  }

  .tide-search-listing-table-cols__3 {
    width: 25%;
  }

  .tide-search-listing-table-cols__4 {
    width: 33.3333333333%;
  }

  .tide-search-listing-table-cols__5 {
    width: 41.6666666667%;
  }

  .tide-search-listing-table-cols__6 {
    width: 50%;
  }

  .tide-search-listing-table-cols__7 {
    width: 58.3333333333%;
  }

  .tide-search-listing-table-cols__8 {
    width: 66.6666666667%;
  }

  .tide-search-listing-table-cols__9 {
    width: 75%;
  }

  .tide-search-listing-table-cols__10 {
    width: 83.3333333333%;
  }

  .tide-search-listing-table-cols__11 {
    width: 91.6666666667%;
  }

  .tide-search-listing-table-cols__12 {
    width: 100%;
  }
}
</style>
