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
      <TideGrantHeader :header="page.header"></TideGrantHeader>
    </template>
    <template #body>
      <TideGrantOverview :overview="page.overview"></TideGrantOverview>
      <TideGrantTimeline :timeline="page.timeline"></TideGrantTimeline>
      <TideGrantGuidelines v-bind="page.guidelines"></TideGrantGuidelines>
      <TideGrantDocuments :documents="page.documents"></TideGrantDocuments>
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
import type TideGrantPage from './../types'
import TideGrantHeader from './components/tide-grant-header.vue'
import TideGrantOverview from './components/tide-grant-overview.vue'
import TideGrantTimeline from './components/tide-grant-timeline.vue'
import TideGrantGuidelines from './components/tide-grant-guidelines.vue'
import TideGrantDocuments from './components/tide-grant-documents.vue'

interface Props {
  page: TideGrantPage
}

defineProps<Props>()
</script>

<style>
.tide-grant__title {
  margin-top: var(--rpl-sp-8);
  margin-bottom: var(--rpl-sp-4);
}
</style>
