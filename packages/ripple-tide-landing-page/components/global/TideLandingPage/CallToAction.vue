<template>
  <RplCardCallToAction
    :title="title"
    :image="image"
    :url="url"
    :ctaText="ctaText"
    :theme="featureFlags.buttonTheme"
  >
    <div data-cy="summary" v-html="summary"></div>
  </RplCardCallToAction>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { RplCardCallToAction } from '#components'
const featureFlags = inject('featureFlags', {
  buttonTheme: 'default'
})
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
