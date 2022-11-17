<script lang="ts">
export default { name: 'TideNewsBody' }
</script>

<template>
  <div v-if="details" class="tide-news__details rpl-page-component rpl-content">
    <RplDescriptionList :items="detailsList" data-cy="details" />
  </div>
  <figure v-if="body.image" class="tide-news__image rpl-u-margin-none">
    <RplImage
      v-if="body.image"
      :src="body.image.src"
      :alt="body.image.alt"
      :width="body.image.width"
      :height="body.image.height"
      data-cy="featured-image"
    />
    <figcaption v-if="body.caption" class="rpl-type-p rpl-u-margin-t-2">
      {{ body.caption }}
    </figcaption>
  </figure>
  <RplContent
    :html="body.content"
    class="tide-news__content rpl-u-margin-t-4"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  RplImage,
  RplContent,
  RplDescriptionList
} from '@dpc-sdp/ripple-ui-core'
import type { TideNewsBody, TideNewsDetails } from '../types'

const props =
  defineProps<{
    details: TideNewsDetails
    body: TideNewsBody
  }>()

const detailsList = computed(() => {
  return Object.keys(props.details).map((key) => ({
    term: key[0].toUpperCase() + key.substring(1) + ':',
    description: props.details[key]
  }))
})
</script>
