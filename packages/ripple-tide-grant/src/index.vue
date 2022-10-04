<template>
  <tide-grant-layout :raw="page">
    <template #aboveContainer>
      <tide-grant-header :header="page.header"></tide-grant-header>
    </template>
    <tide-grant-overview :overview="page.overview"></tide-grant-overview>
    <tide-grant-timeline :timeline="page.timeline"></tide-grant-timeline>
    <tide-grant-guidelines v-bind="page.guidelines"></tide-grant-guidelines>
    <tide-grant-documents :documents="page.documents"></tide-grant-documents>
  </tide-grant-layout>
</template>

<script setup lang="ts">
import type TideGrantPage from './../types'
import TideGrantLayout from './components/tide-grant-layout.vue'
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
