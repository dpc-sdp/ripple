<script lang="ts">
export default { name: 'TideGrantPage' }
</script>

<template>
  <TideBaseLayout
    :site="site"
    :background="page.background"
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
    <template #aboveBody="{ hasBreadcrumbs }">
      <TideGrantHeader
        :header="page.header"
        :hasBreadcrumbs="hasBreadcrumbs"
      ></TideGrantHeader>
    </template>
    <template #body>
      <TideGrantOverview :overview="page.overview"></TideGrantOverview>
      <TideGrantTimeline :timeline="page.timeline"></TideGrantTimeline>
      <TideGrantGuidelines v-bind="page.guidelines"></TideGrantGuidelines>
      <TideGrantDocuments :documents="page.documents"></TideGrantDocuments>
    </template>
    <template #aboveSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #belowSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { TideGrantPage } from './types'
import TideGrantHeader from './components/tide-grant-header.vue'
import TideGrantOverview from './components/tide-grant-overview.vue'
import TideGrantTimeline from './components/tide-grant-timeline.vue'
import TideGrantGuidelines from './components/tide-grant-guidelines.vue'
import TideGrantDocuments from './components/tide-grant-documents.vue'

interface Props {
  site: TideSiteData
  page: TideGrantPage
}

defineProps<Props>()
</script>
