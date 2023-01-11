<template>
  <RplLayoutSidebarComponent
    v-if="items && items.length"
    data-sidebar-component-id="tide-sidebar-related-links"
  >
    <RplRelatedLinks :title="title" :items="items" />
  </RplLayoutSidebarComponent>
</template>

<script setup lang="ts">
import { TideLink } from '../../../../types'

interface Props {
  title: string
  items: TideLink[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>
