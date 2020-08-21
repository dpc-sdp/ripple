<template>
  <rpl-card-content class="card-automated-listing" :image="image" :link="link">
    <div class="card-automated-listing__meta" v-if="date || topic">
      <div class="card-automated-listing__date" v-if="date">{{ formatDate(date) }}</div>
      <div class="card-automated-listing__tag" v-if="topic">{{ topic }}</div>
    </div>
    <h2 class="card-automated-listing__title" v-if="title">{{ title }}</h2>
    <div class="card-automated-listing__trim-wrapper" v-if="summary" :style="{ maxHeight: trimFieldMaxHeight }">
      <p class="card-automated-listing__summary">{{ summary }}</p>
    </div>
    <p class="card-automated-listing__location" v-if="location"><rpl-icon symbol="map_marker" size="0.75" color="secondary" />{{ location }}</p>
  </rpl-card-content>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import cardtrimfield from '@dpc-sdp/ripple-card/mixins/cardtrimfield'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplCardContent from '@dpc-sdp/ripple-card/CardContent'

export default {
  name: 'CardAutomatedListing',
  mixins: [formatdate, cardtrimfield],
  props: {
    image: String,
    date: String,
    topic: String,
    title: String,
    summary: String,
    location: String,
    link: Object,
    locale: { default: 'en-au', type: String }
  },
  components: {
    RplIcon,
    RplCardContent
  },
  data: function () {
    return {
      trimFieldSelector: '.card-automated-listing__summary',
      trimFieldRefreshOnFonts: true
    }
  },
  methods: {
    getTrimFieldMaxHeightOffset: function (card) {
      const link = this.$el.querySelector('.rpl-card-content__link')
      const location = this.$el.querySelector('.card-automated-listing__location')
      const rtnMaxHeight = link ? (card.clientHeight - link.clientHeight) : card.clientHeight
      return location ? (rtnMaxHeight - location.clientHeight) : rtnMaxHeight
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "~@dpc-sdp/ripple-card/scss/card";

  $card-automated-listing-meta-margin: 0 0 $rpl-space-3 0 !default;
  $card-automated-listing-date-ruleset: ('xs', 1em, 'medium') !default;
  $card-automated-listing-date-color: rpl_color('extra_dark_neutral') !default;
  $card-automated-listing-date-background-color: rpl_color('light_neutral') !default;
  $card-automated-listing-date-padding: $rpl-space $rpl-space-2 !default;
  $card-automated-listing-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $card-automated-listing-tag-text-color: rpl_color('dark_neutral') !default;
  $card-automated-listing-tag-margin: 0 0 0 $rpl-space-2 !default;
  $card-automated-listing-title-ruleset: ('l', 1.2em, 'bold') !default;
  $card-automated-listing-title-text-color: rpl_color('extra_dark_neutral') !default;
  $card-automated-listing-title-margin: 0 0 $rpl-space-3 0 !default;
  $card-automated-listing-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $card-automated-listing-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $card-automated-listing-location-ruleset: ('xs', 1.5em, 'medium') !default;
  $card-automated-listing-location-text-color: rpl_color('extra_dark_neutral') !default;
  $card-automated-listing-location-padding: ($rpl-space * 5) 0 $rpl-space-3 !default;
  $card-automated-listing-location-icon-margin: 0 $rpl-space rem(-3px) 0 !default;

  .card-automated-listing {
    &__meta {
      margin: $card-automated-listing-meta-margin;
    }

    &__date {
      @include rpl_typography_ruleset($card-automated-listing-date-ruleset);
      display: inline;
      color: $card-automated-listing-date-color;
      background-color: $card-automated-listing-date-background-color;
      padding: $card-automated-listing-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($card-automated-listing-tag-ruleset);
      display: inline;
      color: $card-automated-listing-tag-text-color;
      text-transform: uppercase;
      margin: $card-automated-listing-tag-margin;
    }

    &__title {
      @include rpl_typography_ruleset($card-automated-listing-title-ruleset);
      color: $card-automated-listing-title-text-color;
      margin: $card-automated-listing-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($card-automated-listing-summary-ruleset);
      color: $card-automated-listing-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }

    &__location {
      @include rpl_typography_ruleset($card-automated-listing-location-ruleset);
      color: $card-automated-listing-location-text-color;
      padding: $card-automated-listing-location-padding;
      margin: 0;

      .rpl-icon {
        margin: $card-automated-listing-location-icon-margin;
      }
    }

    &__trim-wrapper {
      @include rpl_breakpoint('m') {
        overflow: hidden;
      }
    }
  }
</style>
