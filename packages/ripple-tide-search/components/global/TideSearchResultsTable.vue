<template>
  <TideSearchResultsTableSkeleton
    v-if="loading"
    :columns="processedColumns"
    :perPage="perPage"
    :hasSidebar="hasSidebar"
  />
  <RplDataTable
    v-else-if="results?.length"
    data-component-type="search-listing-layout-table"
    class="tide-search-listing-results-table"
    :columns="processedColumns"
    :items="items"
    :offset="offset"
    :caption="caption"
    :footer="footer"
    :headingType="headingType"
    :showExtraContent="showExtraContent"
    :hasSidebar="hasSidebar"
  />
</template>

<script setup lang="ts">
import { computed, getSearchResultValue } from '#imports'
import type { TideSearchListingResultItem } from './../../types'

type tableColumnConfig = {
  label: string
  objectKey: string
  format?: 'date' | null
  cols?: number
  component?: string
  props?: any
}

type tableHeadingTypeConfig = {
  horizontal: boolean
  vertical: boolean
}

type tableExtraContentItems = {
  label: string
  objectKey: string
  component?: string
  props?: any
}

type tableExtraContentConfig = {
  component?: string
  items?: tableExtraContentItems[]
}

interface Props {
  results: TideSearchListingResultItem[]
  hasSidebar?: boolean
  perPage?: number
  loading: boolean
  skeleton?: string
  offset?: number
  columns: tableColumnConfig[]
  headingType?: tableHeadingTypeConfig
  extraContent?: tableExtraContentConfig
  showExtraContent?: boolean
  caption?: string
  footer?: string
}

const props = withDefaults(defineProps<Props>(), {
  results: () => [],
  perPage: 10,
  skeleton: 'TideSearchResultTableSkeleton',
  caption: '',
  footer: '',
  offset: 1,
  extraContent: undefined,
  showExtraContent: false,
  headingType: () => ({
    horizontal: true,
    vertical: false
  }),
  hasSidebar: false
})

const getExtraContent = (result: any) => {
  if (!props.extraContent) return null

  let content = { ...props.extraContent }
  if (props.extraContent?.items) {
    content.items = props.extraContent.items
      .map((item) => ({
        ...item,
        component: 'TideSearchListingTableLabelValue',
        props: { component: item?.component, props: item?.props }
      }))
      .filter((item) => {
        const value = getSearchResultValue(result, item.objectKey, true)
        return Array.isArray(value) ? value.length : value
      })

    if (!content.items.length) {
      delete content.items
    }
  }
  return Object.keys(content).length ? content : null
}

const items = computed(() => {
  return (props.results || []).map((item) => {
    return {
      id: item.id,
      __extraContent: getExtraContent(item.props?.result),
      ...(item.props?.result as Record<string, unknown>)
    }
  })
})

const processedColumns = computed(() => {
  return props.columns.map((column) => {
    const classes =
      typeof column.cols === 'number'
        ? [`tide-search-listing-table-cols__${column.cols}`]
        : []

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
