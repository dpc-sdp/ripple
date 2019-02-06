<template>
  <rpl-profile-highlight class="rpl-profile-highlight-honour-roll" :image="image">
    <template slot="details">
      <div v-if="inductedYear">
        <span class="rpl-profile-highlight-honour-roll__label">Inducted:</span>
        <span class="rpl-profile-highlight-honour-roll__value">{{ inductedYear }}</span>
      </div>
      <div v-if="category">
        <span class="rpl-profile-highlight-honour-roll__label">Category:</span>
        <span class="rpl-profile-highlight-honour-roll__value">{{ category }}</span>
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
  $rpl-rpl-profile-highlight-honour-roll-value-ruleset: ('s', 1.5em, 'medium') !default;

  .rpl-profile-highlight-honour-roll {

    &__label {
      @include rpl_typography_ruleset($rpl-rpl-profile-highlight-honour-roll-label-ruleset);
    }

    &__value {
      @include rpl_typography_ruleset($rpl-rpl-profile-highlight-honour-roll-value-ruleset);
    }
  }
</style>
