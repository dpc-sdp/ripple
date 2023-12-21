<template>
  <!--
    Avator or 'profile' card will be used when the content author chooses
    the 'Profile' display type. However if there is no image a promo card will
    display instead. In all other scenarios a promo card will be used.
  -->
  <RplAvatarCard
    v-if="displayStyle === 'profile' && image"
    :title="title"
    :image="image"
    :url="url"
  >
    <template v-if="showMetadata && metadataExists" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
    <p>{{ summary }}</p>
  </RplAvatarCard>
  <RplPromoCard
    v-else
    :title="title"
    :image="displayStyle !== 'noImage' ? image : null"
    :url="url"
    :highlight="displayStyle === 'noImage' || !image"
  >
    <p>{{ summary }}</p>
    <template v-if="showMetadata && metadataExists" #meta>
      <TideLandingPageCardSharedMeta :meta="metadata" />
    </template>
  </RplPromoCard>
</template>

<script setup lang="ts">
import { computed } from '#imports'

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

const props = withDefaults(defineProps<Props>(), {})

const metadataExists = computed(
  () =>
    props.metadata.contentType?.length > 0 ||
    props.metadata.topic?.length > 0 ||
    props.metadata.isGrantOngoing
)
</script>
