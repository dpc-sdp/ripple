<template>
  <div class=" tide-content tide-content--profile">
    <rpl-row row-gutter v-if="profileHightlightHonourRoll">
      <rpl-col cols="full">
        <rpl-profile-highlight-honour-roll v-bind="profileHightlightHonourRoll"/>
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="page.body">
      <rpl-col cols="full">
        <rpl-markup :html="page.body.processed" />
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplProfileHighlightHonourRoll } from '@dpc-sdp/ripple-profile'
import RplMarkup from '@dpc-sdp/ripple-markup'

export default {
  components: {
    RplCol,
    RplRow,
    RplProfileHighlightHonourRoll,
    RplMarkup
  },
  props: {
    page: Object
  },
  computed: {
    profileHightlightHonourRoll () {
      return {
        image: this.page.field_featured_image ? this.page.field_featured_image.field_media_image.url : null,
        inductedYear: this.page.field_year,
        category: this.page.field_profile_category ? this.page.field_profile_category.name : null
      }
    }
  }
}
</script>
