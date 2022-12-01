<script lang="ts">
export default { name: 'TidePublicationPage' }
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
      <TidePublicationHeader :header="page.header"></TidePublicationHeader>
    </template>
    <template #body>
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.dynamicComponents"
        class="rpl-u-margin-b-9"
      />
      <TidePublicationBody
        :details="page.details"
        :components="page.dynamicComponents"
      ></TidePublicationBody>
      <TidePublicationChapters
        :chapters="page.chapters"
      ></TidePublicationChapters>
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
import type { TidePublicationPage } from './types'

interface Props {
  site: any
  page: TidePublicationPage
}

defineProps<Props>()
</script>
