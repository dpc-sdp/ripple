<template>
  <rpl-row row-gutter class="app-content">
    <rpl-col cols="full">
      <rpl-anchor-links v-if="anchorLinks" title="On this page:" :links="anchorLinks" />
      <rpl-markup v-if="page.body" :html="page.body.processed"></rpl-markup>
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: {
    RplRow,
    RplCol,
    RplMarkup,
    RplAnchorLinks
  },
  props: {
    page: Object,
    anchorLinks: Array
  }
}
</script>
