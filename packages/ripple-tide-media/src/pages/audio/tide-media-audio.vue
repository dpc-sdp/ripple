<script lang="ts">
export default { name: 'TideMediaAudioPage' }
</script>

<template>
  <TideBaseLayout
    :site="site"
    :pageTitle="page.title"
    :pageDescription="page.description"
    :pageLanguage="page.lang"
    :updatedDate="page.changed || page.created"
  >
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
      <TideMediaBody :media="page.media">
        <audio
          class="tide-media__audio"
          :title="page.title"
          :src="page.media.url"
          controls
        />
      </TideMediaBody>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { TideMediaPage } from '../../types'
import TideMediaHeader from '../../components/tide-media-header.vue'
import TideMediaBody from '../../components/tide-media-body.vue'

interface Props {
  site: TideSiteData
  page: TideMediaPage
}

defineProps<Props>()
</script>
