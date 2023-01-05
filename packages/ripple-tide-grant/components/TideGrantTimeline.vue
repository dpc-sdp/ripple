<template>
  <RplLayoutPageComponent class="tide-grant__timeline">
    <h2 class="tide-grant__title rpl-type-h2-fixed">{{ timeline.title }}</h2>
    <RplTimeline :items="timeline.list"></RplTimeline>
  </RplLayoutPageComponent>
</template>

<script setup lang="ts">
import type { TideGrantTimeline } from '../types'

interface Props {
  timeline: TideGrantTimeline
}

defineProps<Props>()
</script>
