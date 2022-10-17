<template>
  <RplLayoutSidebarComponent
    v-if="items && items.length"
    data-sidebar-component-id="tide-sidebar-related-links"
  >
    <RplRelatedLinks title="Related Links" :items="items" />
  </RplLayoutSidebarComponent>
</template>

<script setup lang="ts">
import { TideLink } from '../../../mapping/sidebar-related-links/sidebar-related-links-mapping-types'

interface Props {
  items: TideLink[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>
