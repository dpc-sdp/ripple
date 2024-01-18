<template>
  <RplSidebarComponent
    v-if="items && filteredItems.length"
    data-sidebar-component-id="tide-sidebar-related-links"
  >
    <RplRelatedLinks :title="title" :items="filteredItems" />
  </RplSidebarComponent>
</template>

<script setup lang="ts">
import { computed } from '#imports'
import { TideLink } from '../../../../types'

interface Props {
  title: string
  items: TideLink[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const filteredItems = computed(() => props.items.filter((i) => i.text && i.url))
</script>
