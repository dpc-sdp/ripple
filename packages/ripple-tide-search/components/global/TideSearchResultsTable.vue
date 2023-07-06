<template>
  <RplDataTable caption="" :columns="columns" :items="items" />
</template>

<script setup lang="ts">
import { computed, getSearchResultValue } from '#imports'

import type { TideSearchListingResult } from './../../types'

type tableColumnConfig = {
  key: string
  label: string
  component?: string
}

interface Props {
  results: TideSearchListingResult[]
  config: {
    columns: tableColumnConfig[]
  }
}

const props = defineProps<Props>()

const items = computed(() => {
  return props.results.map((itm) =>
    props.config.columns.map((col) => getSearchResultValue(itm, col.key))
  )
})

const columns = computed(() => {
  return props.config.columns.map((col) => col.label)
})
</script>
