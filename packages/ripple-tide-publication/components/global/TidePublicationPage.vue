<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
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
      <slot name="breadcrumbs">
        <TideBreadcrumbs
          :items="page.breadcrumbs"
          :besideQuickExit="site?.showQuickExit"
        />
      </slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <slot name="aboveBody" :hasBreadcrumbs="hasBreadcrumbs"></slot>
    </template>
    <template #body>
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.bodyComponents"
      />
      <TidePublicationBody
        :components="page.bodyComponents"
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
