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
    <rpl-row row-gutter v-if="page.body">
      <rpl-col cols="full">
        <rpl-prev-next
          v-bind="previous"
         />
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplProfileHighlightHonourRoll } from '@dpc-sdp/ripple-profile'
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplPrevNext } from '@dpc-sdp/ripple-pagination'

export default {
  components: {
    RplCol,
    RplRow,
    RplProfileHighlightHonourRoll,
    RplMarkup,
    RplPrevNext
  },
  props: {
    page: Object
  },
  computed: {
    previous () {
      const config = this.$tide.getModuleConfig('profile')
      return {
        previousLink: config.route || 'profiles',
        previousText: config.returnText || 'See all inductees',
        previousDescription: config.returnDescription || ''
      }
    },
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
