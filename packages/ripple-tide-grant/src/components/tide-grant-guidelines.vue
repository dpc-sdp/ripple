<script lang="ts">
export default { name: 'TideGrantGuidelines' }
</script>

<template>
  <div class="tide-grant__guidelines rpl-u-margin-t-6">
    <h2 v-if="title" class="tide-grant__title rpl-type-h2-fixed">
      {{ title }}
    </h2>
    <RplAccordion
      :id="id"
      :items="accordions"
      :numbered="false"
      class="rpl-type-p"
    />
  </div>
</template>

<script setup lang="ts">
import { RplAccordion } from '@dpc-sdp/ripple-ui-core'
import type { TideGrantGuidelineItem } from '../../types'

// Redefining TideGrantGuidelines type here since vue can't import child interfaces
defineProps<{
  title: string
  id: string
  accordions: Array<TideGrantGuidelineItem>
}>()
</script>
