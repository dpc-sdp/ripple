<template>
  <RplPromoCard
    v-if="displayStyle === 'noImage' || displayStyle === 'thumbnail'"
    :title="title"
    :image="displayStyle !== 'noImage' ? image : null"
    :url="url"
    :highlight="displayStyle === 'noImage'"
  >
    <p>{{ summary }}</p>
    <template v-if="showMetadata" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
  </RplPromoCard>
  <RplAvatarCard
    v-if="displayStyle === 'profile'"
    :title="title"
    :image="image"
    :url="url"
  >
    <template v-if="showMetadata" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
    <p>{{ summary }}</p>
  </RplAvatarCard>
</template>

<script setup lang="ts">
import { RplAvatarCard, RplPromoCard } from '#components'

interface Props {
  title: string
  summary: string
  url: string
  image: {
    src: string
    alt: string
    focalPoint?: {
      x: number
      y: number
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

withDefaults(defineProps<Props>(), {})
</script>
