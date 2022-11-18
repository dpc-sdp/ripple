<script lang="ts">
export default { name: 'TidePublicationPage' }
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
      <RplBreadcrumbs v-bind="page.breadcrumbs"></RplBreadcrumbs>
    </template>
    <template #aboveBody>
      <TidePublicationHeader :header="page.header"></TidePublicationHeader>
    </template>
    <template #body>
      <RplInPageNavigation
        v-if="toc.length > 0"
        :items="toc"
      ></RplInPageNavigation>
      <TidePublicationBody
        :details="page.details"
        :components="page.dynamicComponents"
      ></TidePublicationBody>
      <TidePublicationChapters
        :chapters="page.chapters"
      ></TidePublicationChapters>
    </template>
    <template #sidebar>
      <TidePublicationSidebar
        :publication="page.publication"
      ></TidePublicationSidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import type { TidePublicationPage } from './types'
import { computed } from 'vue'

defineProps<{
  page: TidePublicationPage
}>()

// Placeholder for in-page nave, will need to figure this out dynamically from content - maybe a RplLayout concern?
const toc = computed(() => [])
</script>
