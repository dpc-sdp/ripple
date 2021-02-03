<template>
  <rpl-link v-if="link" :class="['rpl-card-nav', classModifiers]" :href="link.url" :innerWrap="false">
    <div v-if="image && displayStyle !== 'noImage'" class="rpl-card-nav__image-wrapper">
      <rpl-responsive-img class="rpl-card-nav__image" v-bind="image" alt="" :srcSet="srcSet" />
    </div>
    <div class="rpl-card-nav__content">
      <div v-if="showMeta" class="rpl-card-nav__meta">
        <div v-if="contentTypeLabel" class="rpl-card-nav__content-type" >{{ contentTypeLabel }}</div>
        <div v-if="topicLabel" class="rpl-card-nav__topic" >{{ topicLabel }}</div>
        <div v-if="isContentTypeGrant && grantStatusData" class="rpl-card-nav__status">
          <rpl-icon class="rpl-card-nav__status-icon" :symbol="grantStatusData.symbol" :color="grantStatusData.color" size="s" />
          <span>{{ grantStatusData.label }}</span>
        </div>
        <div v-if="formattedDate && !isContentTypeGrant" class="rpl-card-nav__date">{{ formattedDate }}</div>
      </div>
      <h2 v-if="title" class="rpl-card-nav__title"><span>{{ trimmedTitle }}</span></h2>
      <p v-if="summary" class="rpl-card-nav__summary">{{ trimmedSummary }}</p>
      <p v-if="authors && authors.length > 0" class="rpl-card-nav__author"><strong>Author:</strong> {{ authors.join(', ') }}</p>
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import card from '@dpc-sdp/ripple-card/mixins/card'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers'

export default {
  name: 'RplCardNav',
  mixins: [formatdate, card],
  components: {
    RplLink,
    RplResponsiveImg,
    RplIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default () {
        return {}
      }
    },
    summary: {
      type: String,
      default: ''
    },
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    topic: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: ''
    },
    showMeta: {
      type: Boolean,
      default: false
    },
    dateStart: {
      type: String,
      default: ''
    },
    dateEnd: {
      type: String,
      default: ''
    },
    authors: {
      type: Array,
      default () {
        return []
      }
    },
    displayStyle: {
      type: String,
      default: 'noImage',
      validator: val => ['noImage', 'thumbnail', 'featured'].includes(val)
    },
    isGrantOnGoing: {
      type: String,
      default: ''
    }
  },
  computed: {
    classModifiers () {
      return this.modifiers('rpl-card-nav')
    },
    trimmedSummary () {
      let summaryLength = 300
      if (this.image && Object.keys(this.image).length) {
        summaryLength = 200
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

$rpl-card-nav-bg-color: $rpl-card-background !default;
$rpl-card-nav-border-color: $rpl-card-border-color !default;
$rpl-card-nav-border: 1px solid $rpl-card-nav-border-color !default;
$rpl-card-nav-border-radius: $rpl-card-border-radius !default;
$rpl-card-nav-content-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs !default;
$rpl-card-nav-content-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s !default;
$rpl-card-nav-inline-padding-m: ($rpl-space * 8) !default;
$rpl-card-nav-title-ruleset: ('xl', 1.5em, 'bold') !default;
$rpl-card-nav-title-text-color: $nav-card-text-color !default;
$rpl-card-nav-title-hover-color: $rpl-card-link-hover-color !default;
$rpl-card-nav-title-text-decoration: $rpl-card-title-text-decoration !default;
$rpl-card-nav-title-margin: 0 0 rem(12px) !default;
$rpl-card-nav-summary-ruleset: ('s', 1.5em, 'regular') !default;
$rpl-card-nav-summary-color: $nav-card-text-color !default;
$rpl-card-nav-link-color-hover: $rpl-card-link-hover-color !default;
$rpl-card-nav-topic-color: $nav-card-text-color !default;
$rpl-card-nav-topic-background-color: rpl_color('mid_neutral_2') !default;
$rpl-card-nav-meta-padding: $rpl-space $rpl-space-2 !default;
$rpl-card-nav-meta-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-nav-meta-ruleset: $rpl-card-meta-ruleset !default;
$rpl-card-nav-content-type-ruleset: ('xs', .875em, 'medium') !default;
$rpl-card-nav-date-text-color: $rpl-card-meta-text-color !default;
$rpl-card-nav-img-width: (
  'm': rem(280px),
  'l': rem(153px),
  'xxl': rem(213px),
  'xxxl': rem(294px)
) !default;
$rpl-card-nav-img-height: (
  'xs': rem(161px),
  'l': rem(159px),
  'xxl': rem(194px)
) !default;
$rpl-card-nav-img-wrapper-padding-xs: $rpl-component-padding-xs $rpl-component-padding-xs 0 !default;
$rpl-card-nav-img-wrapper-padding-m: 0 rem(25px) 0 0 !default;
$rpl-card-nav-author-font-size: rem(14px) !default;
$rpl-card-nav-featured-title-bg-color: rpl-color('primary') !default;
$rpl-card-nav-featured-title-bg-color-hover: rpl-color('secondary') !default;
$rpl-card-nav-featured-title-ruleset: (
  's': ('mega', 1.75em, 'bold', true)
) !default;
$rpl-card-nav-featured-content-padding: 2rem !default;
$rpl-card-nav-featured-meta-margin-bottom: rem(14px) !default;
$rpl-card-nav-featured-meta-margin-bottom-m: rem(18px) !default;
$rpl-card-nav-featured-img-height: (
  'xs': rem(200px),
  'l': rem(285px),
  'xxl': rem(355px)
) !default;
$rpl-card-nav-featured-max-width: (
  'xs': rem(320px),
  'l': rem(488px),
  'xxl': rem(608px)
) !default;
$rpl-card-nav-thumbnail-max-width: rem(818px) !default;
$rpl-card-nav-noimage-max-width: rem(607px) !default;

.rpl-card-nav {
  $root: &;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  background-color: $rpl-card-nav-bg-color;
  border: $rpl-card-nav-border;
  border-radius: $rpl-card-nav-border-radius;
  @include rpl_breakpoint('m') {
    flex-wrap: nowrap;
    padding: $rpl-card-nav-inline-padding-m;
  }

  &:hover,
  &:focus {
    @include rpl_dropshadow;

    &.rpl-link {
      text-decoration: none;
    }

    #{$root}__link {
      color: $rpl-card-nav-link-color-hover;
    }

    #{$root}__title {
      color:  $rpl-card-nav-title-hover-color;
      text-decoration: $rpl-card-nav-title-text-decoration;
    }
  }

  &__image-wrapper {
    padding: $rpl-card-nav-img-wrapper-padding-xs;
    @include rpl_breakpoint('m') {
      padding: $rpl-card-nav-img-wrapper-padding-m;
    }
    @each $bp, $width in $rpl-card-nav-img-width {
      @include rpl_breakpoint($bp) {
        max-width: $width;
      }
    }
    @each $bp, $height in $rpl-card-nav-img-height {
      @include rpl_breakpoint($bp) {
        max-height: $height;
      }
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    display: table;
    @include rpl_breakpoint('s') {
      border-radius: $rpl-card-nav-border-radius;
    }
  }

  &__title {
    @include rpl_typography_ruleset($rpl-card-nav-title-ruleset);
    color: $rpl-card-nav-title-text-color;
    margin: $rpl-card-nav-title-margin;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    padding-left: $rpl-space;
    span {
      @include rpl_typography_ruleset($rpl-card-nav-meta-ruleset);
      padding-left: $rpl-space;
      color: rpl_color('dark_neutral');
      text-transform: uppercase;
      padding-left: $rpl-space-4;
    }
    &-icon {
      position: absolute;
    }
  }

  &__summary {
    @include rpl_typography_ruleset($rpl-card-nav-summary-ruleset);
    margin: 0;
    width: 100%;
  }

  &__author {
    font-size: $rpl-card-nav-author-font-size;
    margin-bottom: 0;
  }

  &__content {
    color: $rpl-card-nav-summary-color;
    box-sizing: border-box;
    padding: $rpl-card-nav-content-padding-xs;

    @include rpl_breakpoint('s') {
      padding: $rpl-card-nav-content-padding-s;
    }
    @include rpl_breakpoint('m') {
      padding: 0;
    }
  }

  &__meta {
    margin: $rpl-card-nav-meta-margin;
  }

  &__date {
    @include rpl_typography_ruleset($rpl-card-nav-meta-ruleset);
    display: inline;
  }

  &__content-type,
  &__topic {
    @include rpl_typography_ruleset($rpl-card-nav-content-type-ruleset);
    display: inline;
    color: $rpl-card-nav-topic-color;
    background-color: $rpl-card-nav-topic-background-color;
    padding: $rpl-card-nav-meta-padding;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  &__date {
    color: $rpl-card-nav-date-text-color;
    text-transform: uppercase;
  }

  &--thumbnail {
    max-width: $rpl-card-nav-thumbnail-max-width;
  }

  &--noimage {
    max-width: $rpl-card-nav-noimage-max-width;
  }

  &--featured {
    padding: 0;
    flex-wrap: wrap;

    @each $bp, $max-width in $rpl-card-nav-featured-max-width {
      @include rpl_breakpoint($bp) {
        max-width: $max-width;
      }
    }

    &:hover,
    &:focus {
      #{$root}__title {
        text-decoration: none;
        span {
          background-color: $rpl-card-nav-featured-title-bg-color-hover;
        }
      }
    }

    #{$root}__image-wrapper {
      max-width: 608px;
      padding: 0;
      @each $bp, $height in $rpl-card-nav-featured-img-height {
        @include rpl_breakpoint($bp) {
          max-height: $height;
        }
      }
    }

    #{$root}__content, #{$root}__image-wrapper, #{$root}__image {
      width: 100%;
    }

    #{$root}__content {
      padding: $rpl-card-nav-featured-content-padding;
    }

    #{$root}__image {
      border-radius: 0;
    }

    #{$root}__title {
      @include rpl_typography_ruleset($rpl-card-nav-featured-title-ruleset);
      margin: 0;
      padding-bottom: $rpl-card-nav-featured-meta-margin-bottom;

      @include rpl_breakpoint('m') {
        padding-bottom: $rpl-card-nav-featured-meta-margin-bottom-m;
      }

      span {
        background-color: $rpl-card-nav-featured-title-bg-color;
        line-height: 1.5em;
      }
    }

    #{$root}__meta {
      margin-bottom: $rpl-card-nav-featured-meta-margin-bottom;
      @include rpl_breakpoint('m') {
        margin-bottom: $rpl-card-nav-featured-meta-margin-bottom-m;
      }
    }
  }
}
</style>
