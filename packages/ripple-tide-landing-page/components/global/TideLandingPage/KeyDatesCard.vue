<script setup lang="ts">
import { RplKeyDatesCard } from '#components'
import type {
  RplCardElements,
  IRplCardItem
} from '@dpc-sdp/ripple-ui-core/src/components/card/constants'

defineProps<{
  ctaTitle: string
  el?: (typeof RplCardElements)[number]
  items: IRplCardItem[]
  title?: string
  url?: string
}>()
</script>

<template>
  <RplKeyDatesCard v-bind="$props" />
</template>
