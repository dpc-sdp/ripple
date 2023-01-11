<template>
  <TideBaseLayout :site="site" :pageTitle="page.title" :pageDescription="page.description" :pageLanguage="page.lang"
    :topicTags="page.showTopicTags ? page.topicTags : []" :updatedDate="page.changed || page.created">
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
      <TideNewsHeader :header="page.header" :hasBreadcrumbs="hasBreadcrumbs" />
    </template>
    <template #body="{ hasSidebar }">
      <TideNewsBody :body="page.body" :details="page.details" :components="page.dynamicComponents" />
      <TideDynamicComponents v-if="page.dynamicComponents?.length > 0" :components="page.dynamicComponents"
        :hasSidebar="hasSidebar" />
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
import type { TideNewsPage } from '../../types'

interface Props {
  site: TideSiteData
  page: TideNewsPage
}

defineProps<Props>()
</script>
