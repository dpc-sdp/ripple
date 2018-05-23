<template>
  <rpl-link class="rpl-navigation-card" :href="url">
    <h2
      v-if="title"
      class="rpl-navigation-card__title"
      :class="{'rpl-navigation-card__title--with-summary' : summary }"
    >{{ title }}</h2>
    <p v-if="summary" class="rpl-navigation-card__summary">{{ summary }}</p>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplNavigationCard',
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

  $rpl-navigation-card-margin-xs: $rpl-space-3 auto !default;
  $rpl-navigation-card-margin-s: ($rpl-space * 5) auto !default;
  $rpl-navigation-card-color: rpl_color('extra_dark_neutral') !default;
  $rpl-navigation-card-padding: ($rpl-space * 9) ($rpl-space * 8) !default;
  $rpl-navigation-card-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-navigation-card-border-radius: rem(4px) !default;
  $rpl-navigation-card-title-ruleset: (
    'xs': (rem(20px), 1.2em, 'bold'),
    's': (rem(28px), 1.3em, 'bold')
  ) !default;
  $rpl-navigation-card-title-border-bottom: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-navigation-card-title-padding: 0 0 rem(12px) 0 !default;
  $rpl-navigation-card-title-margin: 0 0 rem(18px) !default;
  $rpl-navigation-card-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-navigation-card-summary-ruleset: (
    'xs': (rem(14px), 1.4em, 'regular'),
    's': (rem(16px), 1.5em, 'regular')
  ) !default;
  $rpl-navigation-card-summary-color: rpl_color('extra_dark_neutral') !default;

  .rpl-navigation-card {
    $root: &;
    padding: $rpl-navigation-card-padding;
    border-radius: $rpl-navigation-card-border-radius;
    border: $rpl-navigation-card-border;
    display: block;
    color: $rpl-navigation-card-color;

    @include rpl_breakpoint('xs') {
      margin: $rpl-navigation-card-margin-xs;
    }

    @include rpl_breakpoint('s') {
      margin: $rpl-navigation-card-margin-s;
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
      @include rpl_typography_ruleset($rpl-navigation-card-title-ruleset);
      margin: 0;
      color: $rpl-navigation-card-title-color;

      &--with-summary {
        border-bottom: $rpl-navigation-card-title-border-bottom;
        padding: $rpl-navigation-card-title-padding;
        margin: $rpl-navigation-card-title-margin;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-navigation-card-summary-ruleset);
      margin: 0;
      color: $rpl-navigation-card-summary-color;
    }
  }
</style>
