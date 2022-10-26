<script lang="ts">
export default { name: 'TideMediaBody' }
</script>

<template>
  <!-- TODO: swap out for media embed component once ready -->
  <figure style="margin: 0">
    <iframe
      v-if="media.type === 'embedded_video'"
      :src="media.url"
      width="100%"
      class="tide-media__media rpl-u-aspect-wide"
    />
    <audio
      v-if="media.type === 'audio'"
      class="tide-media__media"
      :src="media.url"
      controls
    />
    <figcaption>
      <RplContent
        :html="media.content"
        class="tide-media__content rpl-u-margin-t-6"
      />
    </figcaption>
  </figure>
  <p class="tide-media__date rpl-type-p rpl-u-margin-t-6">
    Last updated: <time :datetime="date">{{ updatedAt }}</time>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TideMediaMedia } from '../../types'
import { RplContent } from '@dpc-sdp/ripple-ui-core'

const props =
  defineProps<{
    media: TideMediaMedia
    date: string
  }>()

const updatedAt = computed(() => {
  const date = new Date(props.date)

  return Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full'
  }).format(date)
})
</script>
