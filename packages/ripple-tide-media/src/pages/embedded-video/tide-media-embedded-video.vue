<script lang="ts">
export default { name: 'TideMediaEmbeddedVideoPage' }
</script>

<template>
  <RplLayout :background="page.background">
    <template #aboveHeader>
      <slot name="aboveHeader"></slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav"></slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody>
      <TideMediaHeader :header="page.header" />
    </template>
    <template #body>
      <TideMediaBody :media="page.media" :date="page.modified">
        <!-- NOTE: this may be changed to the future video component -->
        <iframe
          :src="page.media.url"
          width="100%"
          class="tide-media__embedded-video rpl-u-aspect-wide"
        />
      </TideMediaBody>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import type { TideMediaPage } from '../../types'
import { RplLayout } from '@dpc-sdp/ripple-ui-core'
import TideMediaHeader from '../../components/tide-media-header.vue'
import TideMediaBody from '../../components/tide-media-body.vue'

interface Props {
  page: TideMediaPage
}

defineProps<Props>()
</script>
