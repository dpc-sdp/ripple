<template>
  <rpl-link v-if="link" :class="['rpl-card-promo', classModifiers]" :href="link.url">
    <rpl-responsive-img v-if="image && displayStyle !== 'noImage'" class="rpl-card-promo__image" v-bind="image" alt="" :srcSet="srcSet" />
    <div class="rpl-card-promo__content" v-cloak>
      <div v-if="showMeta" class="rpl-card-promo__meta">
        <div class="rpl-card-promo__content-type" v-if="contentTypeLabel">{{ contentTypeLabel }}</div>
        <div class="rpl-card-promo__topic" v-if="topicLabel">{{ topicLabel }}</div>
        <div v-if="isContentTypeGrant && grantStatusData" class="rpl-card-promo__status">
          <rpl-icon class="rpl-card-promo__status-icon" :symbol="grantStatusData.symbol" :color="grantStatusData.color" size="s" />
          <span>{{ grantStatusData.label }}</span>
        </div>
        <div class="rpl-card-promo__date" v-if="formattedDate && !isContentTypeGrant">{{ formattedDate }}</div>
      </div>
      <h2 class="rpl-card-promo__title" v-if="title">{{ trimmedTitle }}</h2>
      <p class="rpl-card-promo__summary" v-if="summary" >{{ trimmedSummary }}</p>
    </div>
  </rpl-link>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplLink from '@dpc-sdp/ripple-link'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'
import RplIcon from '@dpc-sdp/ripple-icon'
import card from '@dpc-sdp/ripple-card/mixins/card'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers'

export default {
  name: 'RplCardPromo',
  mixins: [formatdate, card],
  components: {
    RplResponsiveImg,
    RplIcon,
    RplLink
  },
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    summary: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default () {
        return {}
      }
    },
    dateStart: {
      type: String,
      default: ''
    },
    dateEnd: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: ''
    },
    topic: {
      type: String,
      default: ''
    },
    showMeta: {
      type: Boolean,
      default: false
    },
    displayStyle: {
      type: String,
      default: 'noImage',
      validator: val => ['noImage', 'thumbnail', 'profile'].includes(val)
    },
    isGrantOnGoing: {
      type: String,
      default: ''
    }
  },
  computed: {
    classModifiers () {
      return this.modifiers('rpl-card-promo')
    },
    trimmedSummary () {
      let summaryLength = 300
      if (this.image && Object.keys(this.image).length && this.displayStyle === 'profile') {
        summaryLength = 150
      }

      return this.summary ? truncateText(this.summary, summaryLength) : ''
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";
  $rpl-card-promotion-bg-color: $rpl-card-background !default;
  $rpl-card-promo-min-height: rem(400px) !default;
  $rpl-card-promo-meta-margin: 0 0 rem(19px) 0 !default;
  $rpl-card-promo-meta-ruleset: $rpl-card-meta-ruleset !default;
  $rpl-card-promo-content-type-ruleset: ('xs', .875em, 'medium') !default;
  $rpl-card-promo-meta-text-color: $rpl-card-meta-text-color !default;
  $rpl-card-promo-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promo-content-type-bg-color: rpl_color('light_neutral') !default;
  $rpl-card-promo-content-type-color: $nav-card-text-color !default;
  $rpl-card-nav-topic-padding: $rpl-space $rpl-space $rpl-space 0 !default;
  $rpl-card-promo-meta-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promo-link-color: $nav-card-text-color !default;
  $rpl-card-promo-link-color-hover: $rpl-card-link-hover-color !default;
  $rpl-card-promo-title-ruleset: $rpl-card-title-ruleset !default;
  $rpl-card-promo-title-text-color: $nav-card-text-color !default;
  $rpl-card-promo-title-text-decoration: $rpl-card-title-text-decoration !default;
  $rpl-card-promo-title-margin: 0 0 rem(9px) 0 !default;
  $rpl-card-promo-summary-ruleset: ('xs', 1.25em, 'regular') !default;
  $rpl-card-promo-summary-text-color: $nav-card-text-color !default;
  $rpl-card-promo-content-padding: ($rpl-space * 5) !default;
  $rpl-card-promo-border-color: $rpl-card-border-color !default;
  $rpl-card-promo-border: 1px solid $rpl-card-promo-border-color !default;
  $rpl-card-promo-border-radius: $rpl-card-border-radius !default;
  $rpl-card-promo-no-image-border: rpl_gradient('decorative_gradient') !default;
  $rpl-card-promo-no-image-border-height: rem(8px) !default;
  $rpl-card-promo-no-image-padding-top: rem(96px) !default;
  $rpl-card-promo-thumbnail-padding-top: rem(27px) !default;
  $rpl-card-promo-profile-image-margin-top: rem(56px) !default;
  $rpl-card-promo-profile-image-size: rem(148px) !default;
  $rpl-card-promo-img-height: (
    'xs': rem(300px),
    'm': rem(200px),
    'l': rem(232px),
    'xl': rem(200px)
  ) !default;
  $rpl-card-promo-max-width: rem(336px);

  .rpl-card-promo {
    $root: &;
    display: flex;
    height: 100%;
    min-height: $rpl-card-promo-min-height;
    flex-direction: column;
    border: $rpl-card-promo-border;
    border-radius: $rpl-card-promo-border-radius;
    background-color: $rpl-card-promotion-bg-color;
    max-width: $rpl-card-promo-max-width;

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__title {
        color: $rpl-card-promo-link-color-hover;
        text-decoration: $rpl-card-promo-title-text-decoration;
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

    &__date {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline;
      color: $rpl-card-promo-meta-text-color;
      text-transform: uppercase;
    }

    &__date {
      padding: $rpl-card-promo-date-padding;
    }

    &__topic {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline-block;
      color: $rpl-card-promo-meta-text-color;;
      text-transform: uppercase;
      padding: $rpl-card-nav-topic-padding;;
    }

    &__content-type {
      @include rpl_typography_ruleset($rpl-card-promo-content-type-ruleset);
      display: inline-block;
      color: $rpl-card-promo-content-type-color;
      background-color: $rpl-card-promo-content-type-bg-color;
      padding: $rpl-card-promo-meta-padding;

      &::first-letter {
        text-transform: capitalize;
      }
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
      width: 100%;
    }

    &__content {
      padding: $rpl-card-promo-content-padding;

      #{$root}--noimage & {
        padding-top: $rpl-card-promo-no-image-padding-top;
      }

      #{$root}--thumbnail & {
        padding-top: $rpl-card-promo-thumbnail-padding-top;
      }
    }

    &--noimage {
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
