<template>
  <TideBaseLayout :site="site" :background="page.background" :pageTitle="page.title" :pageDescription="page.description"
    :pageLanguage="page.lang" :updatedDate="page.changed || page.created">
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
      <TideEventHeader :header="page.header" :hasBreadcrumbs="hasBreadcrumbs"></TideEventHeader>
    </template>
    <template #body>
      <TideEventOverview :date="page.date" :showTime="page.showTime" :overview="page.overview" :details="page.details"
        :link="page.link" :description="page.description"></TideEventOverview>
      <TideEventBody :body="page.body" :link="page.link"></TideEventBody>
    </template>
    <template #aboveSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #belowSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { TideEventPage } from './../../types'

interface Props {
  site: TideSiteData
  page: TideEventPage
}

defineProps<Props>()
</script>
