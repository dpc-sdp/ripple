<script lang="ts">
export default { name: 'TideMediaBody' }
</script>

<template>
  <figure class="rpl-u-margin-none">
    <slot />
    <figcaption>
      <RplContent
        :html="media.content"
        class="tide-media__content rpl-u-margin-t-6"
      />
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { TideMediaMedia } from '../../types'
import { RplContent } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  media: TideMediaMedia
}>()
</script>
