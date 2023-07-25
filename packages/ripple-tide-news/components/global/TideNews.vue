<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
    :pageTitle="page.title"
    :pageLanguage="page.lang"
    :topicTags="page.showTopicTags ? page.topicTags : []"
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
    <template #aboveBody="{ hasBreadcrumbs }">
      <slot name="aboveBody" :hasBreadcrumbs="hasBreadcrumbs"></slot>
    </template>
    <template #body="{ hasSidebar }">
      <TideNewsBody :body="page.body" :details="page.details" />
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
