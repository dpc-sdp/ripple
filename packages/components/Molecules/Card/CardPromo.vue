<template>
  <rpl-link v-if="link" :class="['rpl-card-promo', classModifiers]" :href="link.url">
    <rpl-responsive-img v-if="computedImg && displayStyle !== 'noImage'" class="rpl-card-promo__image" v-bind="computedImg" alt="" :srcSet="srcSet" />
    <div class="rpl-card-promo__content" v-cloak>
      <div v-if="showMeta && isMetaInfoNotEmpty" class="rpl-card-promo__meta">
        <div v-if="contentTypeLabel" class="rpl-card-promo__content-type">{{ contentTypeLabel }}</div>
        <div v-if="topicLabel" class="rpl-card-promo__topic">{{ topicLabel }}</div>
        <div v-if="isContentTypeGrant && grantStatusData" class="rpl-card-promo__status">
          <rpl-icon class="rpl-card-promo__status-icon" :symbol="grantStatusData.symbol" :color="grantStatusData.color" size="s" />
          <span>{{ grantStatusData.label }}</span>
        </div>
        <div v-if="fvRecommendationStatus && !isContentTypeGrant" class="rpl-card-promo__fv-status">{{ fvRecommendationStatus }}</div>
        <div v-if="formattedDate && !isContentTypeGrant" class="rpl-card-promo__date">{{ formattedDate }}</div>
        <div v-if="inductionYear && !isContentTypeGrant" class="rpl-card-promo__year">{{ inductionYear }}</div>
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
      type: [Object, String],
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
    },
    inductionYear: {
      type: String,
      default: ''
    },
    fvRecommendationStatus: {
      type: String,
      default: ''
    }
  },
  computed: {
    classModifiers () {
      // if thumbnail or profile don't have image, fallback to noimage styling
      const classPrefix = 'rpl-card-promo'
      if (!this.image) {
        return `${classPrefix}--noimage`
      }
      return this.modifiers(classPrefix)
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
  $rpl-card-promo-meta-margin: 0 0 rem(13px) 0 !default;
  $rpl-card-promo-meta-ruleset: $rpl-card-meta-ruleset !default;
  $rpl-card-promo-content-type-ruleset: $rpl-card-content-type-ruleset !default;
  $rpl-card-promo-meta-text-color: $rpl-card-meta-text-color !default;
  $rpl-card-promo-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promo-content-type-bg-color: $rpl-card-meta-background !default;
  $rpl-card-promo-content-type-color: $rpl-card-text-color !default;
  $rpl-card-promo-topic-padding: $rpl-space $rpl-space $rpl-space 0 !default;
  $rpl-card-promo-meta-padding: $rpl-card-meta-padding !default;
  $rpl-card-promo-link-color: $rpl-card-text-color !default;
  $rpl-card-promo-link-color-hover: $rpl-card-link-hover-color !default;
  $rpl-card-promo-title-ruleset: $rpl-card-title-ruleset !default;
  $rpl-card-promo-title-text-color: $rpl-card-text-color !default;
  $rpl-card-promo-title-text-decoration: $rpl-card-title-text-decoration !default;
  $rpl-card-promo-title-margin: 0 0 rem(9px) 0 !default;
  $rpl-card-promo-summary-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-card-promo-summary-text-color: $rpl-card-text-color !default;
  $rpl-card-promo-content-padding: 0 ($rpl-space * 5) ($rpl-space * 5) ($rpl-space * 5) !default;
  $rpl-card-promo-border-color: $rpl-card-border-color !default;
  $rpl-card-promo-border: 1px solid $rpl-card-promo-border-color !default;
  $rpl-card-promo-border-radius: $rpl-card-border-radius !default;
  $rpl-card-promo-no-image-border: rpl_gradient('decorative_gradient') !default;
  $rpl-card-promo-no-image-border-height: rem(8px) !default;
  $rpl-card-promo-no-image-padding-top: ($rpl-space * 6) !default;
  $rpl-card-promo-thumbnail-padding-top: $rpl-space-4 !default;
  $rpl-card-promo-profile-image-margin-top: rem(56px) !default;
  $rpl-card-promo-profile-image-padding-top: ($rpl-space * 5) !default;
  $rpl-card-promo-profile-image-size: rem(148px) !default;
  $rpl-card-promo-img-height: rem(200px) !default;

  .rpl-card-promo {
    $root: &;
    display: flex;
    height: 100%;
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
        text-decoration: $rpl-card-promo-title-text-decoration;
      }
    }

    &__meta {
      margin: $rpl-card-promo-meta-margin;
    }

    &__date,
    &__year,
    &__fv-status {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline;
      color: $rpl-card-promo-meta-text-color;
      text-transform: uppercase;
      padding: $rpl-card-promo-date-padding;
    }

    &__topic {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline-block;
      color: $rpl-card-promo-meta-text-color;
      text-transform: uppercase;
      padding: $rpl-card-promo-topic-padding;
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

    &__title, &__summary {
      overflow-wrap: break-word;
      word-wrap: break-word;
    }

    &__content {
      padding: $rpl-card-promo-content-padding;
      max-width: $rpl-content-max-width;

      #{$root}--noimage & {
        padding-top: $rpl-card-promo-no-image-padding-top;
      }

      #{$root}--thumbnail & {
        padding-top: $rpl-card-promo-thumbnail-padding-top;
      }

      #{$root}--profile & {
        padding-top: $rpl-card-promo-profile-image-padding-top;
      }
    }

    &--thumbnail {
      #{$root}__image {
        border-radius: $rpl-card-promo-border-radius $rpl-card-promo-border-radius 0 0;
        height: $rpl-card-promo-img-height;
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
        max-width: none;

        #{$root}__title, #{$root}__summary {
          max-width: $rpl-content-max-width;
        }
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
