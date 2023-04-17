<script setup lang="ts">
import { RplMediaEmbed } from '#components'
import type {
  RplMediaEmbedTypes,
  RplMediaEmbedVariants,
  RplMediaEmbedSizes
} from '@dpc-sdp/ripple-ui-core/src/components/media-embed/constants'

defineProps<{
  type: RplMediaEmbedTypes
  variant?: RplMediaEmbedVariants
  size?: RplMediaEmbedSizes
  title: string
  src: string
  showTitle?: boolean
  transcriptUrl?: string
  caption?: string
  sourceCaption?: string
  allowFullscreen?: boolean
  dataContent?: string
  downloadUrl?: string
}>()
</script>

<template>
  <RplMediaEmbed v-bind="$props" />
</template>
