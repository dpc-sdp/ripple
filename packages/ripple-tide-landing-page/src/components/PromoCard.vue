<template>
  <RplPromoCard
    v-if="displayStyle === 'noImage' || displayStyle === 'thumbnail'"
    :title="title"
    :image="displayStyle !== 'noImage' ? image?.src : null"
    :url="link.url"
    :highlight="displayStyle === 'noImage'"
  >
    <p>{{ summary }}</p>
    <!-- TODO DE-DUPE THIS -->
    <template v-if="showMetadata" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
  </RplPromoCard>
  <RplAvatarCard
    v-if="displayStyle === 'profile'"
    :title="title"
    :image="image?.src"
    :url="link.url"
  >
    <!-- TODO DE-DUPE THIS -->
    <template v-if="showMetadata" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
    <p>{{ summary }}</p>
  </RplAvatarCard>
</template>

<script setup lang="ts">
import { RplAvatarCard, RplPromoCard } from '@dpc-sdp/ripple-ui-core'

interface Props {
  title: string
  summary: string
  link: {
    text: string
    url: string
  }
  image: {
    src: string
    alt: string
    focalPoint?: {
      x: string
      y: string
    }
  } | null
  displayStyle: 'noImage' | 'thumbnail' | 'profile'
  showMetadata: boolean
  metadata: {
    contentType: string
    topic: string
    isGrantOngoing: boolean
  }
}

const props = withDefaults(defineProps<Props>(), {})
</script>
