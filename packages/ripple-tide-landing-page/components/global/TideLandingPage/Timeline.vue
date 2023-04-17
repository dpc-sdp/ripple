<script setup lang="ts">
import { RplTimeline } from '#components'
import type { IRplImageType } from '@dpc-sdp/ripple-ui-core/src/components/image/constants'

interface IRplTimelineItem {
  image?: IRplImageType
  title: string
  subtitle: string
  dateStart: string
  dateEnd: string
  current: boolean
  description: string
  url: string
}

defineProps<{
  title?: string | null
  items?: IRplTimelineItem[]
}>()
</script>

<template>
  <RplTimeline v-bind="$props" />
</template>
