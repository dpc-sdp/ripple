<template>
  <p v-if="date" class="rpl-updated-date">{{ prefix }} {{ formatDate(date, 'DD MMMM YYYY') }}</p>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'

export default {
  name: 'RplUpdatedDate',
  mixins: [formatdate],
  props: {
    date: String,
    prefix: { default: 'Reviewed', type: String },
    locale: { default: 'en-au', type: String }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-updated-date-ruleset: ('xs', 1.4em, 'regular');
  $rpl-updated-date-color: rpl_color('extra_dark_neutral') !default;

  .rpl-updated-date {
    @include rpl_typography_ruleset($rpl-updated-date-ruleset);
    @include rpl_text_color($rpl-updated-date-color);
  }
</style>
