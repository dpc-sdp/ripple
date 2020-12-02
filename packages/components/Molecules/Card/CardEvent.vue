<template>
  <rpl-card-content :image="image" :link="link" class="rpl-card-event">
    <div class="rpl-card-event__meta" v-if="date">
      <div class="rpl-card-event__date">{{ date }}</div>
    </div>
    <h2 class="rpl-card-event__title" v-if="title">{{ title }}</h2>
    <div class="rpl-card-event__trim-wrapper" v-if="summary" :style="{ maxHeight: trimFieldMaxHeight }">
      <p class="rpl-card-event__summary">{{ summary }}</p>
    </div>
    <p class="rpl-card-event__location" v-if="location"><rpl-icon symbol="map_marker" size="0.75" color="secondary" />{{ location }}</p>
  </rpl-card-content>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import cardtrimfield from './mixins/cardtrimfield'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplCardContent from './CardContent.vue'

export default {
  name: 'RplCardEvent',
  mixins: [formatdate, cardtrimfield],
  props: {
    image: [String, Object],
    dateStart: String,
    dateEnd: String,
    location: String,
    title: String,
    summary: String,
    link: Object,
    locale: { default: 'en-au', type: String },
    rangeDivider: { default: ' to ', type: String }
  },
  components: {
    RplIcon,
    RplCardContent
  },
  data: function () {
    return {
      trimFieldSelector: '.rpl-card-event__summary',
      trimFieldRefreshOnFonts: true
    }
  },
  methods: {
    getTrimFieldMaxHeightOffset: function (card) {
      const link = this.$el.querySelector('.rpl-card-content__link')
      const location = this.$el.querySelector('.rpl-card-event__location')
      const rtnMaxHeight = link ? (card.clientHeight - link.clientHeight) : card.clientHeight
      return location ? (rtnMaxHeight - location.clientHeight) : rtnMaxHeight
    }
  },
  computed: {
    date () {
      if (!this.dateStart && !this.dateEnd) {
        return null
      } else if (this.dateStart && !this.dateEnd) {
        return this.formatDate(this.dateStart)
      } else if (this.dateStart && this.dateEnd) {
        return this.formatDateRange(this.dateStart, this.dateEnd)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-event-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-event-date-ruleset: ('s', 2em, 'bold') !default;
  $rpl-card-event-date-color: rpl_color('white') !default;
  $rpl-card-event-date-background-color: rpl_color('secondary') !default;
  $rpl-card-event-date-padding: $rpl-space-2 !default;
  $rpl-card-event-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-event-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-event-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-event-summary-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-card-event-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-event-location-ruleset: ('xs', 1.5em, 'medium') !default;
  $rpl-card-event-location-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-event-location-padding: ($rpl-space * 5) 0 $rpl-space-3 !default;
  $rpl-card-event-location-icon-margin: 0 $rpl-space rem(-3px) 0 !default;

  .rpl-card-event {
    &__meta {
      margin: $rpl-card-event-meta-margin;
    }

    &__date {
      @include rpl_typography_ruleset($rpl-card-event-date-ruleset);
      display: inline;
      color: $rpl-card-event-date-color;
      background-color: $rpl-card-event-date-background-color;
      padding: $rpl-card-event-date-padding;
      @supports (box-decoration-break: clone) or (-webkit-box-decoration-break: clone) {
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-event-title-ruleset);
      color: $rpl-card-event-title-text-color;
      margin: $rpl-card-event-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-event-summary-ruleset);
      color: $rpl-card-event-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }

    &__location {
      @include rpl_typography_ruleset($rpl-card-event-location-ruleset);
      color: $rpl-card-event-location-text-color;
      padding: $rpl-card-event-location-padding;
      margin: 0;

      .rpl-icon {
        margin: $rpl-card-event-location-icon-margin;
      }
    }

    &__trim-wrapper {
      @include rpl_breakpoint('m') {
        overflow: hidden;
      }
    }
  }
</style>
