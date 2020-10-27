<template>
  <rpl-link class="rpl-card-promo" :class="modifiers" :href="link.url">
    <slot name="image">
      <rpl-responsive-img class="rpl-card-promo__image" v-bind="computedImg" alt="" :srcSet="[{ size: 'xs', height: 534, width: 764  }, { size: 's', height: 200, width: 764  }, {  size: 'm', height: 232, width: 448 }, {  size: 'l', height: 232, width: 333 }]" />
    </slot>
    <div class="rpl-card-promo__content">
      <div class="rpl-card-promo__meta">
        <slot name="meta">
          <div class="rpl-card-promo__tag" v-if="tag" >{{ tag }}</div>
          <div class="rpl-card-promo__topic" v-if="topic" >{{ topic }}</div>
          <slot name="status">
            <div class="rpl-card-promo__status" :class="`rpl-card-promo__status--${this.status.toLowerCase()}`" v-if="status" >
              <rpl-icon class="rpl-card-promo__status-icon" :symbol="statusIcon.symbol" :color="statusIcon.color" size="s" />
              <span>{{status}}</span>
            </div>
          </slot>
          <div class="rpl-card-promo__date" v-if="computedDate">{{ computedDate }}</div>
        </slot>
      </div>
      <slot name="content">
        <h2 class="rpl-card-promo__title" v-if="title">{{ trimmedTitle }}</h2>
        <p class="rpl-card-promo__summary" v-if="summary" >{{ trimmedSummary }}</p>
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </rpl-link>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplLink from '@dpc-sdp/ripple-link'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'
import RplIcon from '@dpc-sdp/ripple-icon'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers.js'
import statusIcon from '@dpc-sdp/ripple-card/mixins/status-icon'

export default {
  name: 'RplCardPromo',
  mixins: [formatdate, statusIcon],
  props: {
    image: [String, Object],
    date: [String, Object],
    variation: String,
    tag: String,
    topic: String,
    status: String,
    title: String,
    summary: String,
    link: Object
  },
  components: {
    RplResponsiveImg,
    RplIcon,
    RplLink
  },
  computed: {
    modifiers () {
      const prefix = 'rpl-card-promo'
      const modifiers = []
      if (this.image) {
        modifiers.push(`${prefix}--with-image`)
      } else if (!this.image) {
        modifiers.push(`${prefix}--no-image`)
      }
      if (this.variation) {
        modifiers.push(`${prefix}--${this.variation}`)
      }

      return modifiers
    },
    trimmedTitle () {
      const titleLength = 150
      return this.title ? truncateText(this.title, titleLength) : ''
    },
    trimmedSummary () {
      let summaryLength = 300
      if (this.image) {
        summaryLength = 200
      }
      return this.summary ? truncateText(this.summary, summaryLength) : ''
    },
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    },
    computedDate () {
      if (this.date) {
        if (typeof this.date === 'string') {
          return this.date
        } else if (typeof this.date === 'object' && this.date.hasOwnProperty('from')) {
          if (this.date.to) {
            return this.formatDateRange(this.date.from, this.date.to, { day: 'DD', month: 'MMM', year: 'YYYY' })
          }
          return this.formatDate(this.date.from)
        }
      }
    },
    hasMeta () {
      return this.tag || this.date || this.topic || this.status
    },
    statusIcon () {
      return this.getStatusIcon(this.status)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";
  $rpl-card-promotion-bg-color: rpl_color('white') !default;
  $rpl-card-promo-min-height: rem(400px) !default;
  $rpl-card-promo-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promo-meta-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-card-promo-meta-text-color: rpl_color('dark_neutral') !default;
  $rpl-card-promo-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promo-tag-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promo-tag-bg-color: rpl_color('light_neutral') !default;
  $rpl-card-promo-tag-padding: $rpl-space $rpl-space-2;
  $rpl-card-promo-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promo-link-color-hover: rpl_color('primary') !default;
  $rpl-card-promo-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-promo-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promo-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promo-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-promo-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promo-content-padding: $rpl-space-4 !default;
  $rpl-card-promo-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-promo-border: 1px solid $rpl-card-promo-border-color !default;
  $rpl-card-promo-border-radius: 4px !default;
  $rpl-card-promo-no-image-border: rpl_gradient('decorative_gradient') !default;
  $rpl-card-promo-no-image-border-height: rem(8px) !default;
  $rpl-card-promo-no-image-padding-top: rem(89px) !default;
  $rpl-card-promo-profile-image-margin-top: rem(56px) !default;
  $rpl-card-promo-profile-image-size: rem(148px) !default;
  $rpl-card-promo-img-height: (
    'xs': rem(300px),
    'm': rem(200px),
    'l': rem(232px),
    'xl': rem(200px)
  ) !default;

  .rpl-card-promo {
    $root: &;
    display: flex;
    height: 100%;
    min-height: $rpl-card-promo-min-height;
    flex-direction: column;
    border: $rpl-card-promo-border;
    border-radius: $rpl-card-promo-border-radius;
    background-color: $rpl-card-promotion-bg-color;
    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__title {
        color: $rpl-card-promo-link-color-hover;
        text-decoration: underline;
      }
    }

    &__image {
      border-radius: $rpl-card-promo-border-radius $rpl-card-promo-border-radius 0 0;
      @each $bp, $height in $rpl-card-promo-img-height {
        @include rpl_breakpoint($bp) {
          height: $height;
        }
      }
    }

    &__meta {
      margin: $rpl-card-promo-meta-margin;
    }

    &__date,
    &__topic {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline;
      color: $rpl-card-promo-meta-text-color;
      text-transform: uppercase;
    }

    &__date {
      padding: $rpl-card-promo-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline-block;
      color: $rpl-card-promo-tag-color;
      background-color: $rpl-card-promo-tag-bg-color;
      text-transform: capitalize;
      padding: $rpl-card-promo-tag-padding;
    }

    &__status {
      display: inline-flex;
      align-items: center;
      padding-left: $rpl-space;
      span {
        @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
        padding-left: $rpl-space;
        color: rpl_color('dark_neutral');
        text-transform: uppercase;
        padding-left: $rpl-space-4;
      }
      &-icon {
        position: absolute;

      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-promo-title-ruleset);
      color: $rpl-card-promo-title-text-color;
      margin: $rpl-card-promo-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-promo-summary-ruleset);
      color: $rpl-card-promo-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }

    &__content {
      padding: $rpl-card-promo-content-padding;

      #{$root}--no-image & {
        padding-top: $rpl-card-promo-no-image-padding-top;
      }
    }

    &--no-image {
      background-image: $rpl-card-promo-no-image-border;
      background-size: 100% $rpl-card-promo-no-image-border-height;
      background-repeat: no-repeat;
    }

    &--profile {
      #{$root}__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        text-align: center;
      }

      #{$root}__image {
        margin-top: $rpl-card-promo-profile-image-margin-top;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        display: block;
        width: $rpl-card-promo-profile-image-size;
        height: $rpl-card-promo-profile-image-size;
      }
    }
  }
</style>
