<script lang="ts">
export default { name: 'TideNewsPage' }
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
      <TideNewsHeader :header="page.header" />
    </template>
    <template #body="{ hasSidebar }">
      <TideNewsBody
        :body="page.body"
        :details="page.details"
        :components="page.dynamicComponents"
      />
      <TideDynamicComponents
        v-if="page.dynamicComponents?.length > 0"
        :components="page.dynamicComponents"
        :hasSidebar="hasSidebar"
      />
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
import type { TideNewsPage } from './types'
import { RplLayout } from '@dpc-sdp/ripple-ui-core'
import TideNewsHeader from './components/tide-news-header.vue'
import TideNewsBody from './components/tide-news-body.vue'

interface Props {
  page: TideNewsPage
}

defineProps<Props>()
</script>
