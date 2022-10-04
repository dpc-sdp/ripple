<script lang="ts">
export default { name: 'TideGrantGuidelines' }
</script>

<template>
  <div class="tide-grant__guidelines">
    <h2 v-if="title" class="tide-grant__title rpl-type-h2">{{ title }}</h2>
    <RplAccordion
      :id="id"
      :items="accordions"
      :numbered="false"
      class="rpl-type-p"
    />
  </div>
</template>

<script setup lang="ts">
import type { TideGrantGuidelineItem } from '../../types'

// Redefining TideGrantGuidelines type here since vue can't import child interfaces
defineProps<{
  title: string
  id: string
  accordions: Array<TideGrantGuidelineItem>
}>()
</script>
