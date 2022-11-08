<template>
  <RplCallToActionCard
    :title="title"
    :image="image"
    :imageAlt="imageAlt"
    :url="url"
  >
    <div v-html="summary"></div>
  </RplCallToActionCard>
</template>

<script setup lang="ts">
import { RplCallToActionCard } from '@dpc-sdp/ripple-ui-core'

interface Props {
  title: string
  image: string
  imageAlt: string
  url: string
  summary: string
}

withDefaults(defineProps<Props>(), {})
</script>
