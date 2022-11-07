<script lang="ts">
export default { name: 'TideGrantTimeline' }
</script>

<template>
  <div class="tide-grant__timeline">
    <h2 class="tide-grant__title rpl-type-h2-fixed">{{ timeline.title }}</h2>
    <rpl-timeline :items="timeline.list"></rpl-timeline>
  </div>
</template>

<script setup lang="ts">
import type { TideGrantTimeline } from '../types'
import { RplTimeline } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  timeline: TideGrantTimeline
}>()
</script>
