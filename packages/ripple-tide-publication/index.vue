<template>
  <rpl-row row-gutter class="app-content tide-content tide-content--publication">
    <rpl-col v-if="anchorLinks && anchorLinks.length > 0" cols="full">
      <rpl-anchor-links title="On this page:" :links="anchorLinks" />
    </rpl-col>
    <rpl-col v-if="page.publishingInfo" cols="full">
      <rpl-publication-author-information v-bind="page.publishingInfo" />
    </rpl-col>
    <template v-if="page.dynamicComponents">
      <page-components :componentMapping="page.dynamicComponents" />
    </template>
    <template v-if="page.chapters">
      <rpl-col cols="full" v-for="chapter in page.chapters" :key="chapter.id">
        <rpl-card-navigation v-bind="chapter"> </rpl-card-navigation>
      </rpl-col>
    </template>
    <rpl-col v-if="page.publicationPagination" cols="full">
      <rpl-publication-pagination v-bind="page.publicationPagination"> </rpl-publication-pagination>
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplPublicationPagination, RplPublicationAuthorInformation } from '@dpc-sdp/ripple-publication'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplCardNavigation } from '@dpc-sdp/ripple-card'

import PageComponents from '@dpc-sdp/ripple-tide-landing-page/page-components.vue'

export default {
  components: {
    PageComponents,
    RplAnchorLinks,
    RplRow,
    RplCol,
    RplMarkup,
    RplCardNavigation,
    RplPublicationAuthorInformation,
    RplPublicationPagination
  },
  props: {
    page: Object,
    anchorLinks: Array
  }
}
</script>
