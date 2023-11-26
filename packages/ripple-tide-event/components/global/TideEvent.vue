<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
    :background="page.background"
    :pageTitle="page.title"
    :pageLanguage="page.lang"
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
    <template #body>
      <TideEventOverview
        :date="page.date"
        :showTime="page.showTime"
        :overview="page.overview"
        :details="page.details"
        :link="page.websiteURL"
        :description="page.description"
      ></TideEventOverview>
      <TideEventBody :body="page.body" :link="page.bookingURL"></TideEventBody>
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
