---
to: components/global/Tide<%= h.pascalCaseMerge(name) %>.vue
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
      <Tide<%= h.pascalCaseMerge(name) %>Header
        :header="page.header"
        :hasBreadcrumbs="hasBreadcrumbs"
      />
    </template>
    <template #body="{ hasSidebar }">
      <Tide<%= h.pascalCaseMerge(name) %>Body :bodyContent="page.body.content" />
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
import type { Tide<%= h.pascalCaseMerge(name) %>Page } from '../../types'

interface Props {
  site: TideSiteData
  page: Tide<%= h.pascalCaseMerge(name) %>Page
}

defineProps<Props>()
</script>
