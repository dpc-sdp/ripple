<template>
  <rpl-link v-if="link" :class="modifiers" :href="link.url" :innerWrap="false">
    <div v-if="image" class="rpl-card-navigation__image-wrapper">
      <rpl-responsive-img class="rpl-card-navigation__image" v-bind="image" alt="" :srcSet="srcSet" />
    </div>
    <div class="rpl-card-navigation__content">
      <div v-if="formattedDate || tag || status" class="rpl-card-navigation__meta">
        <div v-if="tag" class="rpl-card-navigation__tag" >{{ tag }}</div>
        <div v-if="status" class="rpl-card-navigation__status" :class="`rpl-card-navigation__status--${this.status.toLowerCase()}`">
          <rpl-icon v-if="statusIcon" class="rpl-card-navigation__status-icon" :symbol="statusIcon.symbol" :color="statusIcon.color" size="s" />
          <span>{{ status }}</span>
        </div>
        <div v-if="formattedDate" class="rpl-card-navigation__date">{{ formattedDate }}</div>
      </div>
      <h2 v-if="title" class="rpl-card-navigation__title"><span>{{ trimmedTitle }}</span></h2>
      <p v-if="summary" class="rpl-card-navigation__summary">{{ trimmedSummary }}</p>
      <p v-if="author" class="rpl-card-navigation__author"><strong>Author:</strong> {{ author }}</p>
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import card from '@dpc-sdp/ripple-card/mixins/card'

export default {
  name: 'RplCardNavigationV2',
  mixins: [formatdate, card],
  components: {
    RplLink,
    RplResponsiveImg,
    RplIcon
  },
  props: {
    title: String,
    image: Object,
    summary: String,
    link: Object,
    tag: String,
    dateStart: String,
    dateEnd: String,
    author: String,
    status: String,
    displayStyle: {
      type: String,
      default: 'noImage',
      validator: val => ['noImage', 'thumbnail', 'featured'].includes(val)
    }
  },
  data () {
    return {
      srcSet: [
        { size: 'xs', height: 534, width: 764 },
        { size: 's', height: 200, width: 764 },
        { size: 'm', height: 232, width: 448 },
        { size: 'l', height: 232, width: 333 }
      ]
    }
  },
  computed: {
    modifiers () {
      const prefix = 'rpl-card-navigation'
      const modifiers = [ prefix ]
      modifiers.push(`${prefix}--${this.displayStyle.toLowerCase()}`)

      return modifiers
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "scss/card";

$rpl-card-navigation-background: rpl_color('white') !default;
$rpl-card-navigation-border-color: rpl_color('mid_neutral_1') !default;
$rpl-card-navigation-border: 1px solid $rpl-card-navigation-border-color !default;
$rpl-card-navigation-border-radius: rem(4px) !default;
$rpl-card-navigation-content-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs !default;
$rpl-card-navigation-content-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s !default;
$rpl-card-navigation-content-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m !default;
$rpl-card-navigation-content-width-xxxl: rem(435px) !default;
$rpl-card-navigation-inline-padding-m: ($rpl-space * 8) ($rpl-space * 8) !default;
$rpl-card-navigation-title-ruleset:  ('l', 1.2em, 'bold') !default;
$rpl-card-navigation-title-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-navigation-title-hover-color: rpl_color('primary') !default;
$rpl-card-navigation-title-text-decoration: underline !default;
$rpl-card-navigation-title-margin: 0 0 rem(12px) !default;
$rpl-card-navigation-summary-ruleset: ('xs', 1.5em, 'regular') !default;
$rpl-card-navigation-summary-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-navigation-link-color-hover: rpl_color('primary') !default;
$rpl-card-navigation-no-image-padding: (rem(56px) - $rpl-card-vertical-padding) 0 0 0 !default;
$rpl-card-navigation-tag-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-navigation-tag-background-color: rpl_color('mid_neutral_2') !default;
$rpl-card-navigation-meta-padding: $rpl-space $rpl-space-2 !default;
$rpl-card-navigation-meta-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-navigation-meta-ruleset: ('xs', 1em, 'medium') !default;
$rpl-card-navigation-date-text-color: rpl_color('dark_neutral') !default;
$rpl-card-navigation-img-width: (
  'm': rem(280px),
  'l': rem(153px),
  'xxl': rem(213px),
  'xxxl': rem(294px)
) !default;
$rpl-card-navigation-img-height: (
  'xs': rem(161px),
  'l': rem(159px),
  'xxl': rem(194px)
) !default;
$rpl-card-navigation-img-wrapper-padding-xs: $rpl-component-padding-xs $rpl-component-padding-xs 0 !default;
$rpl-card-navigation-img-wrapper-padding-m: 0 rem(25px) 0 0 !default;
$rpl-card-navigation-author-font-size: rem(14px) !default;
$rpl-card-navigation-featured-title-bg-color: rpl-color('primary') !default;
$rpl-card-navigation-featured-title-bg-color-hover: rpl-color('secondary') !default;
$rpl-card-navigation-featured-title-ruleset: (
  'xs': ('mega', 1.3em, 'bold', true),
  's': ('giga', 1.6em, 'bold', true)
) !default;
$rpl-card-navigation-featured-content-padding: 2rem !default;
$rpl-card-navigation-featured-meta-margin-bottom: rem(14px) !default;
$rpl-card-navigation-featured-meta-margin-bottom-m: rem(18px) !default;
$rpl-card-navigation-featured-img-height: (
  'xs': rem(200px),
  'l': rem(285px),
  'xxl': rem(355px)
) !default;
$rpl-card-navigation-featured-max-width: (
  'xs': rem(320px),
  'l': rem(488px),
  'xxl': rem(608px)
) !default;
$rpl-card-navigation-thumbnail-max-width: rem(818px) !default;
$rpl-card-navigation-noimage-max-width: rem(607px) !default;

.rpl-card-navigation {
  $root: &;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  background-color: $rpl-card-navigation-background;
  border: $rpl-card-navigation-border;
  border-radius: $rpl-card-navigation-border-radius;
  @include rpl_breakpoint('m') {
    flex-wrap: nowrap;
    padding: $rpl-card-navigation-inline-padding-m;
  }

  &:hover,
  &:focus {
    @include rpl_dropshadow;

    &.rpl-link {
      text-decoration: none;
    }

    #{$root}__link {
      color: $rpl-card-navigation-link-color-hover;
    }

    #{$root}__title {
      color:  $rpl-card-navigation-title-hover-color;
      text-decoration: $rpl-card-navigation-title-text-decoration;
    }
  }

  &__image-wrapper {
    padding: $rpl-card-navigation-img-wrapper-padding-xs;
    @include rpl_breakpoint('m') {
      padding: $rpl-card-navigation-img-wrapper-padding-m;
    }
    @each $bp, $width in $rpl-card-navigation-img-width {
      @include rpl_breakpoint($bp) {
        max-width: $width;
      }
    }
    @each $bp, $height in $rpl-card-navigation-img-height {
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
      border-radius: $rpl-card-navigation-border-radius;
    }
  }

  &__title {
    @include rpl_typography_ruleset($rpl-card-navigation-title-ruleset);
    color: $rpl-card-navigation-title-color;
    margin: $rpl-card-navigation-title-margin;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    padding-left: $rpl-space;
    span {
      @include rpl_typography_ruleset($rpl-card-navigation-meta-ruleset);
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
    @include rpl_typography_ruleset($rpl-card-navigation-summary-ruleset);
    margin: 0;
  }

  &__author {
    font-size: $rpl-card-navigation-author-font-size;
    margin-bottom: 0;
  }

  &__content {
    color: $rpl-card-navigation-summary-color;
    box-sizing: border-box;
    padding: $rpl-card-navigation-content-padding-xs;

    @include rpl_breakpoint('s') {
      padding: $rpl-card-navigation-content-padding-s;
    }
    @include rpl_breakpoint('m') {
      padding: 0;
    }
  }

  &__meta {
    margin: $rpl-card-navigation-meta-margin;
  }

  &__date,
  &__tag {
    @include rpl_typography_ruleset($rpl-card-navigation-meta-ruleset);
    display: inline;
    padding: $rpl-card-navigation-meta-padding;
  }

  &__tag {
    color: $rpl-card-navigation-tag-color;
    background-color: $rpl-card-navigation-tag-background-color;

  }

  &__date {
    color: $rpl-card-navigation-date-text-color;
    text-transform: uppercase;
  }

  &--thumbnail {
    max-width: $rpl-card-navigation-thumbnail-max-width;
  }

  &--noimage {
    max-width: $rpl-card-navigation-noimage-max-width;
  }

  &--featured {
    padding: 0;
    flex-wrap: wrap;

    @each $bp, $max-width in $rpl-card-navigation-featured-max-width {
      @include rpl_breakpoint($bp) {
        max-width: $max-width;
      }
    }

    &:hover,
    &:focus {
      #{$root}__title {
        text-decoration: none;
        span {
          background-color: $rpl-card-navigation-featured-title-bg-color-hover;
        }
      }
    }

    #{$root}__image-wrapper {
      max-width: 608px;
      padding: 0;
      @each $bp, $height in $rpl-card-navigation-featured-img-height {
        @include rpl_breakpoint($bp) {
          max-height: $height;
        }
      }
    }

    #{$root}__content, #{$root}__image-wrapper, #{$root}__image {
      width: 100%;
    }

    #{$root}__content {
      padding: $rpl-card-navigation-featured-content-padding;
    }

    #{$root}__image {
      border-radius: 0;
    }

    #{$root}__title {
      @include rpl_typography_ruleset($rpl-card-navigation-featured-title-ruleset);
      margin: 0;
      padding-bottom: $rpl-card-navigation-featured-meta-margin-bottom;

      @include rpl_breakpoint('m') {
        padding-bottom: $rpl-card-navigation-featured-meta-margin-bottom-m;
      }

      span {
        background-color: $rpl-card-navigation-featured-title-bg-color;
        line-height: 1.5em;
      }
    }

    #{$root}__meta {
      margin-bottom: $rpl-card-navigation-featured-meta-margin-bottom;
      @include rpl_breakpoint('m') {
        margin-bottom: $rpl-card-navigation-featured-meta-margin-bottom-m;
      }
    }
  }
}
</style>
