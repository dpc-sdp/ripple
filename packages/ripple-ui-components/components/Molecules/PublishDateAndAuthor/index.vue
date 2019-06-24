<template>
  <div class="rpl-publish-date-and-author">
    <div class="rpl-publish-date-and-author__date-location" v-if="date">{{ formatDate(date, 'DD/MM/YY H.mma') }}<span v-if="location"> {{ location_prefix }} {{ location }}</span></div>
    <div class="rpl-publish-date-and-author__author" v-if="author">{{ author_prefix }} {{ author }}</div>
  </div>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'

export default {
  name: 'RplPublishDateAndAuthor',
  mixins: [formatdate],
  props: {
    date: String,
    location: String,
    author: String,
    location_prefix: { type: String, default: 'from' },
    author_prefix: { type: String, default: 'Published by' },
    locale: { default: 'en-au', type: String }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-publish-date-and-author-date-location-ruleset: ('xs', 1em, 'bold');
  $rpl-publish-date-and-author-author-ruleset: ('xs', 1.4em, 'regular');
  $rpl-publish-date-and-author-author-margin: $rpl-space 0 0 0;

  .rpl-publish-date-and-author {
    &__date-location {
      @include rpl_typography_ruleset($rpl-publish-date-and-author-date-location-ruleset);
      @include rpl_text_color(rpl-color('extra_dark_neutral'));
    }

    &__author {
      @include rpl_typography_ruleset($rpl-publish-date-and-author-author-ruleset);
      @include rpl_text_color(rpl-color('extra_dark_neutral'));
      margin: $rpl-publish-date-and-author-author-margin;
    }
  }
</style>
