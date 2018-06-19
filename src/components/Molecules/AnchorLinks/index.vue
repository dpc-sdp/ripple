<template>
  <div class="rpl-anchor-links">
    <div class="rpl-anchor-links__row">
      <h2 class="rpl-anchor-links__title">{{ title }}</h2>
    </div>
    <div class="rpl-anchor-links__row">
      <ul class="rpl-anchor-links__items" v-if="links">
        <li class="rpl-anchor-links__item" v-for="(item, index) of links" :key="index">
          <rpl-text-link :url="item.url" :text="item.text" :underline="true" size="small" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplAnchorLinks',
  props: {
    title: String,
    links: Array
  },
  components: {
    RplTextLink,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-anchor-links-max-width-s: rem(510px);
  $rpl-anchor-links-max-width-xl: rem(463px);
  $rpl-anchor-links-border-image: rpl-gradient('decorative_gradient_0') 1 100%;
  $rpl-anchor-links-border: rem(6px) solid;
  $rpl-anchor-links-margin: $rpl-space-4 0;
  $rpl-anchor-links-left-padding-xs: $rpl-space-4;
  $rpl-anchor-links-left-padding-s: ($rpl-space * 9);
  $rpl-anchor-links-left-padding-xl: ($rpl-space * 8);
  $rpl-anchor-links-title-padding: $rpl-space-3;
  $rpl-anchor-links-title-ruleset: (
    'xs': ('l', 1.5em, 'bold'),
    's': ('mega', 1em, 'bold')
  ) !default;
  $rpl-anchor-links-title-color: rpl_color('extra_dark_neutral');
  $rpl-anchor-links-items-margin: $rpl-space-2 auto;
  $rpl-anchor-links-item-margin: auto auto $rpl-space-3;

  .rpl-anchor-links {
    @include rpl_mobile_padding;
    padding-left: $rpl-anchor-links-left-padding-xs;
    border-left: $rpl-anchor-links-border;
    border-image: $rpl-anchor-links-border-image;
    position: relative;
    margin: $rpl-anchor-links-margin;

    @include rpl_breakpoint('s') {
      padding-left: $rpl-anchor-links-left-padding-s;
    }

    @include rpl_breakpoint('l') {
      padding-right: 0;
    }

    @include rpl_breakpoint('xl') {
      padding-left: $rpl-anchor-links-left-padding-xl;
    }

    &__row {
      @include rpl_breakpoint('s') {
        max-width: $rpl-anchor-links-max-width-s;
        margin: 0;
      }

      @include rpl_breakpoint('l') {
        max-width: none;
      }

      @include rpl_breakpoint('xl') {
        max-width: $rpl-anchor-links-max-width-xl;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-anchor-links-title-ruleset);
      margin: 0;
      color: $rpl-anchor-links-title-color;
      @include rpl_breakpoint('s') {
        padding-bottom: $rpl-anchor-links-title-padding;
      }
    }

    &__items {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: $rpl-anchor-links-items-margin;

      @include rpl_breakpoint('m') {
        column-count: 2;
      }

      @include rpl_breakpoint('l') {
        column-count: 1;
      }

      @include rpl_breakpoint('xl') {
        column-count: 2;
      }
    }

    &__item {
      margin: $rpl-anchor-links-item-margin;
    }
  }
</style>
