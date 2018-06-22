<template>
  <rpl-link class="rpl-card-navigation-featured" :href="url" v-if="url">
    <div class="rpl-card-navigation-featured__inner">
      <img class="rpl-card-navigation-featured__image" :src="image" alt="">
      <h2
        v-if="title"
        class="rpl-card-navigation-featured__title"
      ><span>{{ title }}</span></h2>
    </div>
    <p v-if="summary" class="rpl-card-navigation-featured__summary">{{ summary }}</p>
    <rpl-icon v-if="summary" symbol="arrow_right_primary" color="white" />
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCardNavigationFeatured',
  props: {
    title: String,
    summary: String,
    url: String,
    image: String
  },
  components: {
    RplLink,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "scss/card";

  $rpl-card-navigation-featured-margin-xs: $rpl-space-3 auto !default;
  $rpl-card-navigation-featured-margin-s: ($rpl-space * 5) auto !default;
  $rpl-card-navigation-featured-background: rpl_color('primary') !default;
  $rpl-card-navigation-featured-max-width: rem(818px) !default;
  $rpl-card-navigation-featured-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-navigation-featured-border-radius: rem(4px) !default;
  $rpl-card-navigation-featured-title-ruleset: (
    'xs': ('mega', 1.3em, 'bold', true),
    's': ('giga', 1.6em, 'bold', true)
  ) !default;
  $rpl-card-navigation-featured-summary-ruleset: (
    'xs': ('xs', 1.4em, 'bold'),
    's': ('s', 1.5em, 'bold')
  ) !default;
  $rpl-card-navigation-featured-summary-color: rpl_color('white') !default;
  $rpl-card-navigation-featured-summary-background: transparent url(rpl_banner_primary_arrow_url('secondary')) no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-background-hover: rpl_color('secondary') url(rpl_banner_primary_arrow_url('primary')) no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-xs: ($rpl-space * 11) $rpl-component-padding-xs ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-s: ($rpl-space * 6) $rpl-component-padding-s ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-m: ($rpl-space * 6) $rpl-component-padding-m ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-l: ($rpl-space * 11) $rpl-component-padding-l ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-xl: ($rpl-space * 6) $rpl-component-padding-xl ($rpl-space * 7) !default;

  .rpl-card-navigation-featured {
    $root: &;
    overflow: hidden;
    display: block;
    position: relative;
    color: $rpl-card-navigation-featured-color;
    background-color: $rpl-card-navigation-featured-background;
    max-width: $rpl-card-navigation-featured-max-width;

    @include rpl_breakpoint('s') {
      border-radius: $rpl-card-navigation-featured-border-radius;
    }

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__summary {
        background: $rpl-card-navigation-featured-summary-background-hover;
      }
    }

    &__inner {
      position: relative;
    }

    &__image {
      display: table;
      width: 100%;
      @include rpl_breakpoint('s') {
        border-radius: $rpl-card-navigation-featured-border-radius $rpl-card-navigation-featured-border-radius 0 0;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-navigation-featured-title-ruleset);
      position: absolute;
      margin: 0;
      left: $rpl-component-padding-xs;
      right: $rpl-component-padding-xs;
      bottom: $rpl-space * -8;
      z-index: 1;
      @include rpl_breakpoint('s') {
        left: $rpl-component-padding-s;
        right: $rpl-component-padding-s;
        bottom: ($rpl-space * 5);
      }
      @include rpl_breakpoint('m') {
        left: $rpl-component-padding-m;
        right: $rpl-component-padding-m;
      }
      @include rpl_breakpoint('l') {
        left: $rpl-component-padding-l;
        right: $rpl-component-padding-l;
        bottom: $rpl-space * -8;
      }
      @include rpl_breakpoint('xl') {
        left: $rpl-component-padding-xl;
        right: $rpl-component-padding-xl;
        bottom: ($rpl-space * 5);
      }
    }

    &__summary {
      background: $rpl-card-navigation-featured-summary-background;
      @include rpl_typography_ruleset($rpl-card-navigation-featured-summary-ruleset);
      margin: 0;
      color: $rpl-card-navigation-featured-summary-color;
      padding: $rpl-card-navigation-featured-summary-xs;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-navigation-featured-summary-s;
      }
      @include rpl_breakpoint('l') {
        padding: $rpl-card-navigation-featured-summary-m;
      }
      @include rpl_breakpoint('l') {
        padding: $rpl-card-navigation-featured-summary-l;
      }
      @include rpl_breakpoint('xl') {
        padding: $rpl-card-navigation-featured-summary-xl;
      }
    }

    .rpl-icon {
      position: absolute;
      bottom: $rpl-space-3;
      right: $rpl-space-3;
    }
  }
</style>
