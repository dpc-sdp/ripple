<template>
  <rpl-link class="rpl-card-navigation-featured" :href="url">
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

  $rpl-card-navigation-featured-margin-xs: $rpl-space-3 auto !default;
  $rpl-card-navigation-featured-margin-s: ($rpl-space * 5) auto !default;
  $rpl-card-navigation-featured-background: rpl_color('primary') !default;
  $rpl-card-navigation-featured-max-width: rem(818px) !default;
  $rpl-card-navigation-featured-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-navigation-featured-border-radius: rem(4px) !default;
  $rpl-card-navigation-featured-title-ruleset: (
    'xs': (rem(28px), 1.3em, 'bold', true),
    's': (rem(36px), 1.6em, 'bold', true)
  ) !default;
  $rpl-card-navigation-featured-summary-ruleset: (
    'xs': (rem(14px), 1.4em, 'bold'),
    's': (rem(16px), 1.5em, 'bold')
  ) !default;
  $rpl-card-navigation-featured-summary-color: rpl_color('white') !default;
  $rpl-card-navigation-featured-summary-background: transparent url('data:image/svg+xml,%3Csvg%20width%3D%2249%22%20height%3D%22100%22%20viewBox%3D%220%200%2049%20100%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M49%20100H0L49%200V100Z%22%20fill%3D%22%23#{str-slice(quote(rpl_color("secondary")), 2)}%22%2F%3E%3C%2Fsvg%3E') no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-xs: ($rpl-space * 11) ($rpl-space * 8) ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-s: ($rpl-space * 6) ($rpl-space * 8) ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-l: ($rpl-space * 11) ($rpl-space * 8) ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-xl: ($rpl-space * 6) ($rpl-space * 8) ($rpl-space * 7) !default;

  .rpl-card-navigation-featured {
    $root: &;
    overflow: hidden;
    display: block;
    position: relative;
    color: $rpl-card-navigation-featured-color;
    background-color: $rpl-card-navigation-featured-background;
    max-width: $rpl-card-navigation-featured-max-width;

    @include rpl_breakpoint('xs') {
      margin: $rpl-card-navigation-featured-margin-xs;
    }

    @include rpl_breakpoint('s') {
      border-radius: $rpl-card-navigation-featured-border-radius;
      margin: $rpl-card-navigation-featured-margin-s;
    }

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
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
      left: ($rpl-space * 8);
      right: ($rpl-space * 8);
      bottom: $rpl-space * -8;
      z-index: 1;
      @include rpl_breakpoint('s') {
        bottom: ($rpl-space * 5);
      }
      @include rpl_breakpoint('l') {
        bottom: $rpl-space * -8;
      }
      @include rpl_breakpoint('xl') {
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
