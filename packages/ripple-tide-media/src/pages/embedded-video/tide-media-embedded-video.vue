<script lang="ts">
export default { name: 'TideMediaEmbeddedVideoPage' }
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
  </TideBaseLayout>
</template>

<script setup lang="ts">
import type { TideMediaPage } from '../../types'
import TideMediaHeader from '../../components/tide-media-header.vue'
import TideMediaBody from '../../components/tide-media-body.vue'

interface Props {
  site: any
  page: TideMediaPage
}

defineProps<Props>()
</script>
