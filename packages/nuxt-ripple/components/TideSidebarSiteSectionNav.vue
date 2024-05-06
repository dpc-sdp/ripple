<template>
  <RplSidebarComponent v-if="nav && nav.items && nav.items.length">
    <RplVerticalNav
      data-sidebar-component-id="tide-sidebar-site-section-nav"
      :title="nav.title"
      :items="nav.items"
      :toggle-levels="toggleLevels"
    />
  </RplSidebarComponent>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

interface Props {
  nav?: {
    title: string
    items: Array<any>
  } | null
}

withDefaults(defineProps<Props>(), {
  nav: null
})

const featureFlags: IRplFeatureFlags = inject('featureFlags', {})

const toggleLevels = computed(() => {
  return featureFlags?.sectionNavToggleLevels
    ? Number(featureFlags?.sectionNavToggleLevels)
    : undefined
})
</script>
