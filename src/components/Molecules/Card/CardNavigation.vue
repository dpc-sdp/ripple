<template>
  <rpl-link class="rpl-card-navigation" :href="url">
    <h2
      v-if="title"
      class="rpl-card-navigation__title"
      :class="{'rpl-card-navigation__title--with-summary' : summary }"
    >{{ title }}</h2>
    <p v-if="summary" class="rpl-card-navigation__summary">{{ summary }}</p>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplCardNavigation',
  props: {
    title: String,
    summary: String,
    url: String
  },
  components: {
    RplLink
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "scss/card";

  $rpl-card-navigation-margin-xs: $rpl-space-3 auto !default;
  $rpl-card-navigation-margin-s: ($rpl-space * 5) auto !default;
  $rpl-card-navigation-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-navigation-padding-vertical-s: ($rpl-space * 5) !default;
  $rpl-card-navigation-padding: ($rpl-space * 9) ($rpl-space * 8) !default;
  $rpl-card-navigation-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-card-navigation-border-radius: rem(4px) !default;
  $rpl-card-navigation-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('mega', 1.3em, 'bold')
  ) !default;
  $rpl-card-navigation-title-border-bottom: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-card-navigation-title-padding: 0 0 rem(12px) 0 !default;
  $rpl-card-navigation-title-margin: 0 0 rem(18px) !default;
  $rpl-card-navigation-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-navigation-summary-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    's': ('s', 1.5em, 'regular')
  ) !default;
  $rpl-card-navigation-summary-color: rpl_color('extra_dark_neutral') !default;

  .rpl-card-navigation {
    @include rpl_mobile_padding;
    $root: &;
    border-radius: $rpl-card-navigation-border-radius;
    border: $rpl-card-navigation-border;
    display: block;
    color: $rpl-card-navigation-color;
    padding-top: $rpl-card-navigation-padding-vertical-s;
    padding-bottom: $rpl-card-navigation-padding-vertical-s;

    @include rpl_breakpoint('xs') {
      margin: $rpl-card-navigation-margin-xs;
    }

    @include rpl_breakpoint('s') {
      margin: $rpl-card-navigation-margin-s;
    }

    @include rpl_breakpoint('m') {
      padding: $rpl-card-navigation-padding;
    }

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__title {
        color: rpl_color('primary');
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-navigation-title-ruleset);
      margin: 0;
      color: $rpl-card-navigation-title-color;

      &--with-summary {
        border-bottom: $rpl-card-navigation-title-border-bottom;
        padding: $rpl-card-navigation-title-padding;
        margin: $rpl-card-navigation-title-margin;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-navigation-summary-ruleset);
      margin: 0;
      color: $rpl-card-navigation-summary-color;
    }
  }
</style>
