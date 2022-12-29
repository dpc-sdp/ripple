<template>
  <RplNavCard
    :title="title"
    :image="displayStyle !== 'noImage' ? image?.src : null"
    :url="url"
    :highlight="displayStyle === 'featured'"
    :inset="displayStyle === 'thumbnail'"
  >
    <p>{{ summary }}</p>
    <template v-if="showMetadata" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
  </RplNavCard>
</template>

<script setup lang="ts">
import { RplNavCard } from '@dpc-sdp/ripple-ui-core'

interface Props {
  title: string
  summary: string
  url: string
  image: {
    src: string
    alt: string
    focalPoint?: {
      x: string
      y: string
    }
  } | null
  displayStyle: 'noImage' | 'thumbnail' | 'featured'
  showMetadata: boolean
  metadata: {
    contentType: string
    topic: string
    isGrantOngoing: boolean
  }
}

withDefaults(defineProps<Props>(), {})
</script>
