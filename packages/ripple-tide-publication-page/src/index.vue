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
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.dynamicComponents"
      />
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

interface Props {
  page: TidePublicationPagePage
}

defineProps<Props>()
</script>
