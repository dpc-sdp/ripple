<template>
  <rpl-row row-gutter class="app-content tide-content tide-content--page">
    <rpl-col cols="full">
      <rpl-anchor-links v-if="anchorLinks" title="On this page:" :links="anchorLinks" />
      <rpl-markup v-if="page.body" :html="page.body.processed"></rpl-markup>
    </rpl-col>
    <rpl-col v-if="page.field_show_topic_term_and_tags" cols="full">
      <app-topic-tags :topic="this.page.field_topic" :tags="this.page.field_tags" />
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import AppTopicTags from '../../../lib/components/AppTopicTags'

export default {
  components: {
    RplRow,
    RplCol,
    RplMarkup,
    RplAnchorLinks,
    AppTopicTags
  },
  props: {
    page: Object,
    anchorLinks: Array
  }
}
</script>
