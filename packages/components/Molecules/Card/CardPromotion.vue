<template>
  <rpl-card-content class="rpl-card-promotion" :image="computedImg" :link="link">
    <div class="rpl-card-promotion__meta" v-if="date || topic">
      <div class="rpl-card-promotion__date" v-if="date">{{ formatDate(date) }}</div>
      <div class="rpl-card-promotion__tag" >{{ topic }}</div>
    </div>
    <h2 class="rpl-card-promotion__title" v-if="title">{{ title }}</h2>
    <div class="rpl-card-promotion__trim-wrapper" v-if="summary" :style="{ maxHeight: trimFieldMaxHeight }">
      <p class="rpl-card-promotion__summary">{{ summary }}</p>
    </div>
  </rpl-card-content>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import cardtrimfield from './mixins/cardtrimfield'
import RplCardContent from './CardContent.vue'
import deprecate from '@dpc-sdp/ripple-global/mixins/deprecate'

export default {
  name: 'RplCardPromotion',
  mixins: [formatdate, cardtrimfield, deprecate],
  props: {
    image: [String, Object],
    date: String,
    topic: String,
    title: String,
    summary: String,
    link: Object,
    locale: { default: 'en-au', type: String }
  },
  components: {
    RplCardContent
  },
  data: function () {
    return {
      trimFieldSelector: '.rpl-card-promotion__summary',
      trimFieldRefreshOnFonts: true
    }
  },
  mounted () {
    this.deprecatedWarn('"rpl-card-promotion" is deprecated, please import "rpl-card-promo" from @dpc-sdp/ripple-card-promo instead')
  },
  methods: {
    getTrimFieldMaxHeightOffset: function (card) {
      const link = this.$el.querySelector('.rpl-card-content__link')
      return link ? (card.clientHeight - link.clientHeight) : card.clientHeight
    }
  },
  computed: {
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-promotion-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promotion-date-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-card-promotion-date-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promotion-date-background-color: rpl_color('light_neutral') !default;
  $rpl-card-promotion-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promotion-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-promotion-tag-text-color: rpl_color('dark_neutral') !default;
  $rpl-card-promotion-tag-margin: 0 0 0 $rpl-space-2 !default;
  $rpl-card-promotion-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-promotion-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promotion-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promotion-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-promotion-summary-text-color: rpl_color('extra_dark_neutral') !default;

  .rpl-card-promotion {
    &__meta {
      margin: $rpl-card-promotion-meta-margin;
    }

    &__date {
      @include rpl_typography_ruleset($rpl-card-promotion-date-ruleset);
      display: inline;
      color: $rpl-card-promotion-date-color;
      background-color: $rpl-card-promotion-date-background-color;
      padding: $rpl-card-promotion-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-promotion-tag-ruleset);
      display: inline;
      color: $rpl-card-promotion-tag-text-color;
      text-transform: uppercase;
      margin: $rpl-card-promotion-tag-margin;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-promotion-title-ruleset);
      color: $rpl-card-promotion-title-text-color;
      margin: $rpl-card-promotion-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-promotion-summary-ruleset);
      color: $rpl-card-promotion-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }

    &__trim-wrapper {
      @include rpl_breakpoint('m') {
        overflow: hidden;
      }
    }
  }
</style>
