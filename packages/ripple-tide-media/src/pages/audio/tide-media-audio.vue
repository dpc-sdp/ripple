<script lang="ts">
export default { name: 'TideMediaAudioPage' }
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
      <TideMediaBody :media="page.media" :date="page.changed">
        <audio class="tide-media__audio" :src="page.media.url" controls />
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
