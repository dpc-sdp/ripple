<template>
  <rpl-profile-highlight class="rpl-profile-highlight-honour-roll" :image="image">
    <template slot="details">
      <rpl-description-list :list="profileListing" />
    </template>
  </rpl-profile-highlight>
</template>

<script>
import RplProfileHighlight from './ProfileHighlight.vue'
import RplDescriptionList from '@dpc-sdp/ripple-description-list'

export default {
  name: 'RplProfileHighlightHonourRoll',
  components: {
    RplProfileHighlight,
    RplDescriptionList
  },
  props: {
    image: String,
    inductedYear: String,
    category: String
  },
  computed: {
    profileListing () {
      const terms = []
      if (this.inductedYear) {
        terms.push({term: 'Inducted', description: this.inductedYear})
      }
      if (this.category) {
        terms.push({term: 'Category', description: this.category})
      }
      return terms
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-rpl-profile-highlight-honour-roll-detail-ruleset: ('s', 1.5em, 'medium') !default;

  .rpl-profile-highlight-honour-roll {
    .rpl-description-list__description {
      @include rpl_typography_ruleset($rpl-rpl-profile-highlight-honour-roll-detail-ruleset);
    }
  }
</style>
