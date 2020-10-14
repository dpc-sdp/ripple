<template>
  <div v-if="(links.length)" class="rpl-anchor-links">
    <div class="rpl-anchor-links__row">
      <h2 class="rpl-anchor-links__title">{{ title }}</h2>
    </div>
    <div class="rpl-anchor-links__row">
      <ul v-if="links" class="rpl-anchor-links__items">
        <li v-for="(item, index) of links" :key="index" :class="['rpl-anchor-links__item', {'rpl-anchor-links__item--indent': (item.type && item.type === 'h3')}]">
          <rpl-icon v-if="(item.type && item.type === 'h3')" class="rpl-anchor-links__item--indent-icon" symbol="list_indent" size="1.05"/>
          <rpl-text-link :url="item.url" :text="item.text" :underline="true" size="small" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import { RplIcon } from '@dpc-sdp/ripple-icon'

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
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-anchor-links-max-width-s: rem(510px) !default;
  $rpl-anchor-links-max-width-xl: rem(463px) !default;
  $rpl-anchor-links-border-image: rpl-gradient('decorative_gradient_0') 1 100% !default;
  $rpl-anchor-links-border: rem(6px) solid !default;
  $rpl-anchor-links-left-padding-xs: $rpl-space-4 !default;
  $rpl-anchor-links-left-padding-s: ($rpl-space * 9) !default;
  $rpl-anchor-links-left-padding-xl: ($rpl-space * 8) !default;
  $rpl-anchor-links-title-padding: $rpl-space-3 !default;
  $rpl-anchor-links-title-ruleset: (
    'xs': ('l', 1.5em, 'bold'),
    's': ('mega', 1em, 'bold')
  ) !default;
  $rpl-anchor-links-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-anchor-links-items-margin: $rpl-space-2 auto !default;
  $rpl-anchor-links-item-margin: auto auto $rpl-space-3 !default;

  $rpl-anchor-links-item-indent-padding-left: $rpl-space !default;
  $rpl-anchor-links-item-indent-icon-marign-right: rem(7px) !default;

  .rpl-anchor-links {
    @include rpl_mobile_padding;
    padding-left: $rpl-anchor-links-left-padding-xs;
    border-left: $rpl-anchor-links-border;
    border-right: 0;
    border-image: $rpl-anchor-links-border-image;
    position: relative;

    @include rpl_print {
      border-left: 0;
    }

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

      @media print {
        @include rpl_typography(heading_s);
      }
    }

    &__items {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: $rpl-anchor-links-items-margin;
    }

    &__item {
      margin: $rpl-anchor-links-item-margin;

      &--indent {
        display: flex;
        padding-left: $rpl-anchor-links-item-indent-padding-left;
        &-icon {
          margin-right: $rpl-anchor-links-item-indent-icon-marign-right;
        }
      }
    }
  }
</style>
