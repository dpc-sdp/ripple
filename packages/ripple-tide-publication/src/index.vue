<script lang="ts">
export default { name: 'TidePublicationPage' }
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
      <TidePublicationPageActions
        :documents="page.documents"
      ></TidePublicationPageActions>
      <TidePublicationSideNav
        :items="items"
        :title="page.title"
      ></TidePublicationSideNav>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import type { TidePublicationPage } from './types'
import { computed } from 'vue'
import { RplInPageNavigation } from '@dpc-sdp/ripple-ui-core'
import TidePublicationHeader from './components/tide-publication-header.vue'
import TidePublicationBody from './components/tide-publication-body.vue'
import TidePublicationChapters from './components/tide-publication-chapters.vue'
import TidePublicationPageActions from './components/tide-publication-page-actions.vue'
import TidePublicationSideNav from './components/tide-publication-side-nav.vue'

defineProps<{
  site: any
  page: TidePublicationPage
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

// Placeholder for Publication sidebar nav
const items = computed(() => [
  { id: '15', text: 'First level no children', url: '#', active: true },
  {
    id: '17',
    text: 'First level',
    items: [
      { id: '18', text: 'First level repeat', url: '#' },
      {
        id: '19',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '20',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [{ id: '21', text: 'Fourth level', url: '#' }]
          }
        ]
      },
      { id: '22', text: 'Second level', url: '#' },
      { id: '23', text: 'Second level', url: '#' }
    ]
  }
])
</script>
