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
      :aspect="aspectRatio"
      sizes="sm:768px"
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
import { format } from 'date-fns'
import type { TideNewsBody, TideNewsDetails } from '../types'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

const props = defineProps<{
  details: TideNewsDetails
  body: TideNewsBody
}>()

const { news: flags }: IRplFeatureFlags = inject('featureFlags', {})

const aspectRatio = computed(() =>
  flags?.featuredImageAspect !== 'auto' ? flags?.featuredImageAspect : null
)

const detailsList = computed(() => {
  const list = []

  if (props.details?.published) {
    list.push({
      term: 'Published:',
      hideTerm: flags?.hideDetailLabels,
      description: format(
        new Date(props.details.published),
        // Wednesday, 16 April 2025 at 8:41 am
        "EEEE, d MMMM yyyy 'at' K:mm aaa"
      )
    })
  }
  if (props.details?.location) {
    list.push({
      term: 'Location:',
      hideTerm: flags?.hideDetailLabels,
      description: props.details.location
    })
  }
  if (props.details?.department) {
    list.push({
      term: 'Published by:',
      hideTerm: flags?.hideDetailLabels,
      description: props.details.department
    })
  }

  return list
})
</script>
