<template>
  <rpl-row row-gutter class="app-content">
    <rpl-col cols="full">
      <rpl-markup v-if="page.body" :html="page.body.processed"></rpl-markup>
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  name: 'MoviePage',
  components: {
    RplRow,
    RplCol,
    RplMarkup
  },
  props: {
    page: Object
  }
}
</script>
