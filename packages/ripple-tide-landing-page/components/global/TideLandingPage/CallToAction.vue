<template>
  <RplCallToActionCard
    :title="title"
    :image="image"
    :url="url"
    :ctaText="ctaText"
  >
    <div data-cy="summary" v-html="summary"></div>
  </RplCallToActionCard>
</template>

<script setup lang="ts">
import { RplCallToActionCard } from '#components'

interface Props {
  title: string
  image: {
    src: string
    alt: string
    focalPoint?: {
      x: number
      y: number
    }
  } | null
  url: string
  ctaText: string
  summary: string
}

withDefaults(defineProps<Props>(), {})
</script>
