<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
    :pageTitle="page.title"
    :pageLanguage="page.lang"
    :updatedDate="page.changed || page.created"
    :showContentRating="page.showContentRating"
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
      <slot name="aboveBody" :hasBreadcrumbs="hasBreadcrumbs"></slot>
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

interface Props {
  site: TideSiteData
  page: TideMediaPage
}

defineProps<Props>()
</script>
