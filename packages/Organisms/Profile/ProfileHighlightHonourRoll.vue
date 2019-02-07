<template>
  <rpl-profile-highlight class="rpl-profile-highlight-honour-roll" :image="image">
    <template slot="details">
      <div class="rpl-profile-highlight-honour-roll__detail" v-if="inductedYear">
        <span class="rpl-profile-highlight-honour-roll__label">Inducted:</span> {{ inductedYear }}
      </div>
      <div class="rpl-profile-highlight-honour-roll__detail" v-if="category">
        <span class="rpl-profile-highlight-honour-roll__label">Category:</span> {{ category }}
      </div>
    </template>
  </rpl-profile-highlight>
</template>

<script>
import RplProfileHighlight from './ProfileHighlight.vue'

export default {
  name: 'RplProfileHighlightHonourRoll',
  components: {
    RplProfileHighlight
  },
  props: {
    image: String,
    inductedYear: String,
    category: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-rpl-profile-highlight-honour-roll-label-ruleset: ('s', 1.5em, 'bold') !default;
  $rpl-rpl-profile-highlight-honour-roll-detail-ruleset: ('s', 1.5em, 'medium') !default;

  .rpl-profile-highlight-honour-roll {
    @include rpl_mobile_padding;

    @include rpl_breakpoint('m') {
      padding-left: 0;
      padding-right: 0;
    }

    &__detail {
      @include rpl_typography_ruleset($rpl-rpl-profile-highlight-honour-roll-detail-ruleset);
    }

    &__label {
      @include rpl_typography_ruleset($rpl-rpl-profile-highlight-honour-roll-label-ruleset);
    }
  }
</style>
