<script lang="ts">
export default {
  name: 'TidePublicationPagePage'
}
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
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { TidePublicationPagePage } from './types'

interface Props {
  site: any
  page: TidePublicationPagePage
}

defineProps<Props>()
</script>
