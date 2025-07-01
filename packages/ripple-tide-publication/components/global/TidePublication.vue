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
    <template #body>
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.bodyComponents"
        class="rpl-u-margin-b-9"
      />
      <TidePublicationBody
        :details="page.details"
        :components="page.bodyComponents"
      ></TidePublicationBody>
      <TidePublicationChapters
        :chapters="page.chapters"
      ></TidePublicationChapters>
    </template>
    <template #sidebar>
      <TidePublicationSidebar
        :publication="page.publication"
        :navigation="nav"
      ></TidePublicationSidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import type { indexNode, TidePublicationPage } from '../../types'
import type { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import { processMenu, useRoute, useTidePublicationMenu, ref } from '#imports'

interface Props {
  site: TideSiteData
  page: TidePublicationPage
}

const props = defineProps<Props>()

const nav = ref<Array<indexNode>>([])

const menu = props.page?.publication?.id
  ? await useTidePublicationMenu(props.page.publication.id)
  : null

if (menu?.publication?.items) {
  nav.value = processMenu(menu.publication, useRoute())
}
</script>
