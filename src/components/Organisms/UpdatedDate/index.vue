<template>
  <p v-if="date" class="rpl-updated-date">{{ prefix }} {{ formattedDate }}</p>
</template>

<script>
import moment from 'moment'

export default {
  name: 'RplUpdatedDate',
  props: {
    date: String,
    prefix: { default: 'Reviewed', type: String },
    locale: { default: 'en-au', type: String }
  },
  computed: {
    formattedDate: function () {
      moment.locale(this.locale)
      return moment(this.date).format('DD MMMM YYYY')
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-updated-date-ruleset: ('xs', 1.4em, 'regular');
  $rpl-updated-date-color: rpl_color('extra_dark_neutral');

  .rpl-updated-date {
    @include rpl_typography_ruleset($rpl-updated-date-ruleset);
    color: $rpl-updated-date-color;
  }
</style>
