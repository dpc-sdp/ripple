<template>
  <rpl-link class="rpl-card" :class="modifiers" :href="link.url">
    <slot name="image">
      <rpl-responsive-img class="rpl-card__image" v-bind="computedImg" alt="" :srcSet="[{ size: 'xs', height: 534, width: 764  }, { size: 's', height: 200, width: 764  }, {  size: 'm', height: 232, width: 448 }, {  size: 'l', height: 232, width: 333 }]" />
    </slot>
    <div class="rpl-card__content">
      <slot name="meta">
        <div class="rpl-card__meta" v-if="hasMeta">
          <div class="rpl-card__tag" v-if="tag" >{{ tag }}</div>
          <div class="rpl-card__topic" v-if="topic" >{{ topic }}</div>
          <div class="rpl-card__status" v-if="status" >
            {{status}}
          </div>
          <div class="rpl-card__date" v-if="computedDate">{{ computedDate }}</div>
        </div>
      </slot>
      <slot name="content">
        <h2 class="rpl-card__title" v-if="title">{{ trimmedTitle }}</h2>
        <p class="rpl-card__summary" v-if="summary" >{{ trimmedSummary }}</p>
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
import RplCardContent from './CardContent.vue'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplCard',
  mixins: [formatdate],
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
    RplCardContent,
    RplResponsiveImg,
    RplLink
  },
  computed: {
    modifiers () {
      const prefix = 'rpl-card'
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
        } else if (typeof this.date === 'object' && this.date.hasOwnProperty('from') && this.date.hasOwnProperty('to')) {
          return this.formatDateRange(this.date.from, this.date.to)
        }
      }
    },
    hasMeta () {
      return this.tag || this.date || this.topic || this.status
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-min-height: rem(400px);
  $rpl-card-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-date-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-date-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-tag-text-color: rpl_color('dark_neutral') !default;
  $rpl-card-tag-bg-color: rpl_color('light_neutral') !default;
  $rpl-card-tag-padding: $rpl-space;
  $rpl-card-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-link-color-hover: rpl_color('primary') !default;
  $rpl-card-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-content-padding: $rpl-space-4;
  $rpl-card-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-border: 1px solid $rpl-card-border-color !default;
  $rpl-card-border-radius: 4px !default;
  $rpl-card-no-image-border: rpl_gradient('decorative_gradient') !default;
  $rpl-card-no-image-border-height: rem(8px) !default;
  $rpl-card-no-image-padding-top: rem(89px) !default;
  $rpl-card-profile-image-margin-top: rem(56px) !default;
  $rpl-card-profile-image-size: rem(148px) !default;
  $rpl-card-img-height: (
    'xs': rem(300px),
    'm': rem(200px),
    'l': rem(232px),
    'xl': rem(200px)
  ) !default;

  .rpl-card {
    $root: &;
    display: flex;
    height: 100%;
    min-height: $rpl-card-min-height;
    flex-direction: column;
    border: $rpl-card-border;
    border-radius: $rpl-card-border-radius;

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__title {
        color: $rpl-card-link-color-hover;
      }
    }

    &__image {
      border-radius: $rpl-card-border-radius $rpl-card-border-radius 0 0;
      @each $bp, $height in $rpl-card-img-height {
        @include rpl_breakpoint($bp) {
          height: $height;
        }
      }
    }

    &__meta {
      margin: $rpl-card-meta-margin;
    }

    &__date,
    &__topic {
      @include rpl_typography_ruleset($rpl-card-date-ruleset);
      display: inline;
      color: $rpl-card-date-color;
      text-transform: uppercase;
    }

    &__date {
      padding: $rpl-card-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-tag-ruleset);
      display: inline;
      color: $rpl-card-tag-text-color;
      background-color: $rpl-card-tag-bg-color;
      text-transform: capitalize;
      padding: $rpl-card-tag-padding;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-title-ruleset);
      color: $rpl-card-title-text-color;
      margin: $rpl-card-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-summary-ruleset);
      color: $rpl-card-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }

    &__content {
      padding: $rpl-card-content-padding;

      #{$root}--no-image & {
        padding-top: $rpl-card-no-image-padding-top;
      }
    }

    &--no-image {
      background-image: $rpl-card-no-image-border;
      background-size: 100% $rpl-card-no-image-border-height;
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
        margin-top: $rpl-card-profile-image-margin-top;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        display: block;
        width: $rpl-card-profile-image-size;
        height: $rpl-card-profile-image-size;
      }
    }
  }
</style>
