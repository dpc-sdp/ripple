<script lang="ts">
export default {
  name: 'TidePublicationPagePage'
}
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
      <TidePublicationPageHeader
        :header="page.header"
      ></TidePublicationPageHeader>
    </template>
    <template #body>
      <RplInPageNavigation
        v-if="toc.length > 0"
        :items="toc"
      ></RplInPageNavigation>
      <TidePublicationPageBody
        :components="page.dynamicComponents"
      ></TidePublicationPageBody>
      <TidePublicationPagePagination
        :pagination="page.publication.pagination"
      ></TidePublicationPagePagination>
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
import { TidePublicationPagePage } from './types'
import { computed } from 'vue'

defineProps<{
  page: TidePublicationPagePage
}>()

// Placeholder for in-page nave, will need to figure this out dynamically from content - maybe a RplLayout concern?
const toc = computed(() =>
  // []
  [
    {
      text: 'This is the first anchor link',
      url: '#',
      items: [
        { text: 'This is sub heading following first anchor link', url: '#' }
      ]
    },
    { text: 'Second link to extra content', url: '#' }
  ]
)
</script>
