<template>
  <RplStatsGrid :variant="variant">
    <RplStatsGridItem
      v-for="item in items"
      :key="item.id"
      :value="item.value"
      >{{ item.label }}</RplStatsGridItem
    >
  </RplStatsGrid>
</template>

<script setup lang="ts">
import { RplStatsGrid, RplStatsGridItem } from '@dpc-sdp/ripple-ui-core'

interface Props {
  variant: 'onLight' | 'onDark'
  items: Array<{
    id: string
    label: string
    value: string
  }>
}

withDefaults(defineProps<Props>(), {
  variant: 'onLight',
  items: () => []
})
</script>
