<template>
  <RplDataTable
    data-component-type="search-listing-layout-table"
    class="tide-search-listing-results-table"
    :columns="processedColumns"
    :items="items"
    :offset="offset"
    :caption="caption"
    :footer="footer"
    :headingType="headingType"
    :showExtraContent="showExtraContent"
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

type tableHeadingTypeConfig = {
  horizontal: boolean
  vertical: boolean
}

type tableExtraContentItems = {
  label: string
  objectKey: string
  component?: string
}

type tableExtraContentConfig = {
  component?: string
  items?: tableExtraContentItems[]
}

interface Props {
  results: Record<string, unknown>[]
  offset?: number
  columns: tableColumnConfig[]
  headingType?: tableHeadingTypeConfig
  extraContent?: tableExtraContentConfig
  showExtraContent?: boolean
  caption?: string
  footer?: string
}

const props = withDefaults(defineProps<Props>(), {
  caption: '',
  footer: '',
  offset: 1,
  extraContent: undefined,
  showExtraContent: false,
  headingType: () => ({
    horizontal: true,
    vertical: false
  })
})

const getExtraContent = () => {
  if (!props.extraContent) return null

  let content = { ...props.extraContent }
  if (props.extraContent?.items) {
    content.items = props.extraContent.items.map((item) => ({
      component: 'TideSearchListingTableValue',
      heading: item?.label,
      ...item
    }))
  }
  return content
}

const items = computed(() => {
  return (props.results || []).map((result) => {
    return {
      id: result._id,
      __extraContent: getExtraContent(),
      ...(result._source as Record<string, unknown>)
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
