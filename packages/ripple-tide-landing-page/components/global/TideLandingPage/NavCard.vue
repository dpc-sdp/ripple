<template>
  <RplNavCard
    :title="title"
    :image="displayStyle !== 'noImage' ? image : null"
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
  displayStyle: 'noImage' | 'thumbnail' | 'featured'
  showMetadata: boolean
  metadata: {
    contentType: string
    topic: string
    isGrantOngoing: boolean
  }
  hasSidebar?: boolean
  hasTitle?: boolean
  pageBackground?: string
}

withDefaults(defineProps<Props>(), {
  pageBackground: 'default'
})
</script>
