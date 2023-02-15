<script lang="ts">
export default { name: 'TideMediaBody' }
</script>

<template>
  <div class="rpl-u-margin-none rpl-content">
    <slot />
    <RplContent
      :html="media.content"
      class="tide-media__content rpl-u-margin-t-6"
    />
  </div>
</template>

<script setup lang="ts">
import type { TideMediaMedia } from '../../types'
import { RplContent } from '#components'

defineProps<{
  media: TideMediaMedia
}>()
</script>
