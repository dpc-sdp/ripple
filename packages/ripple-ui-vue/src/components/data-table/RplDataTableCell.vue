<script setup lang="ts">
import { getCellText, hasComponent } from './helpers'
import type { tableColumnConfig, tableRow } from './types'

interface Props {
  columns: tableColumnConfig[]
  column: tableColumnConfig
  row: tableRow
  i: number
}

defineProps<Props>()
</script>

<template>
  <template v-if="hasComponent(column)">
    <component
      :is="(column as tableColumnConfig).component"
      :item="row"
      :column="column"
    />
  </template>
  <template v-else>
    <div v-if="column?.isHTML" v-html="getCellText(i, null, columns, row)" />
    <template v-else>
      {{ getCellText(i, null, columns, row) }}
    </template>
  </template>
</template>
