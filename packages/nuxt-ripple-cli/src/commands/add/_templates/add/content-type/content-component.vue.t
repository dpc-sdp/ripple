---
to: components/global/Tide<%= h.changeCase.pascalCase(name) %>Page.vue
---
<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
    :pageTitle="page.title"
    :pageLanguage="page.lang"
    :updatedDate="page.changed || page.created"
    :showContentRating="page.showContentRating">
    <template #aboveHeader>
      <slot name="aboveHeader" />
    </template>
    <template #primaryNav>
      <slot name="primaryNav" />
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs" />
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <slot name="aboveBody" />
    </template>
    <template #body="{ hasSidebar }">
      <slot name="body" />
    </template>
    <template #sidebar>
      <slot name="sidebar" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { Tide<%= h.changeCase.pascalCase(name) %>Page } from '../../types'

interface Props {
  site: TideSiteData
  page: Tide<%= h.changeCase.pascalCase(name) %>Page
}

defineProps<Props>()
</script>
