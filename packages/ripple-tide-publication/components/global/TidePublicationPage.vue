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
      <slot name="breadcrumbs">
        <TideBreadcrumbs :items="page.breadcrumbs" />
      </slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <TidePublicationHeader
        :header="page.header"
        :hasBreadcrumbs="hasBreadcrumbs"
      ></TidePublicationHeader>
    </template>
    <template #body>
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.dynamicComponents"
      />
      <TidePublicationBody
        :components="page.dynamicComponents"
      ></TidePublicationBody>
      <TidePublicationPagination
        :pagination="page.publication.pagination"
      ></TidePublicationPagination>
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
import { TidePublicationPagePage } from '../../types'

interface Props {
  site: any
  page: TidePublicationPagePage
}

defineProps<Props>()
</script>
