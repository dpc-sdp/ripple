<template>
  <rpl-link class="rpl-text-link" :class="{
    'rpl-text-link--underline': underline,
    'rpl-text-link--dark': (theme === 'dark'),
    'rpl-text-link--small': (size === 'small'),
    'rpl-text-link--large': (size === 'large'),
    'rpl-text-link--emphasis': emphasis
  }" :href="url">
    <rpl-text-icon :text="text" :symbol="iconSymbolFinal" :color="iconColor" :placement="iconPlacement" :size="iconSize" />
  </rpl-link>
</template>

<script>
import {RplTextIcon} from '@dpc-sdp/ripple-icon'
import RplLink from './Link.vue'
import { isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplTextLink',
  props: {
    iconSymbol: {default: null, type: String},
    iconColor: {default: 'primary', type: String},
    iconPlacement: {default: 'after', type: String},
    iconSize: {default: 'm', type: String},
    text: {default: null, type: String},
    url: {default: null, type: String},
    underline: {default: false, type: Boolean},
    theme: {default: 'light', type: String},
    size: {default: null, type: String},
    emphasis: {default: false, type: Boolean}
  },
  components: {
    RplTextIcon,
    RplLink
  },
  computed: {
    iconSymbolFinal () {
      if (isExternalUrl(this.url, this.rplOptions.hostname)) {
        return 'external_link'
      }
      return this.iconSymbol
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-text-link-light-underline: rem(4px) solid #E8EBEE !default;
  $rpl-text-link-light-underline-hover: rem(4px) solid #E8EBEE !default;
  $rpl-text-link-dark-underline: rem(4px) solid rpl-color('secondary') !default;
  $rpl-text-link-dark-underline-hover: rem(4px) solid rpl-color('white') !default;
  $rpl-text-link-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-text-link-text-color-hover: rpl_color('primary') !default;
  $rpl-text-link-dark-text-color: rpl-color('white') !default;
  $rpl-text-link-dark-text-color-hover: rpl-color('white') !default;
  $rpl-text-link-small-typography: ('xs', 1.7em, 'medium') !default;
  $rpl-text-link-large-typography: ('l', 1.7em, 'medium') !default;
  $rpl-text-link-small-typography-emphasis: ('xs', 1.7em, 'bold') !default;
  $rpl-text-link-large-typography-emphasis: ('l', 1.7em, 'bold') !default;

  .rpl-text-link {
    $root: &;
    text-decoration: none;
    color: $rpl-text-link-text-color;

    &:hover,
    &:focus {
      color: $rpl-text-link-text-color-hover;
    }

    &--underline {
      border-bottom: $rpl-text-link-light-underline;

      &:hover,
      &:focus {
        border-bottom: $rpl-text-link-light-underline-hover;
        &.rpl-link {
          text-decoration: none;
        }
      }
    }

    &--small {
      @include rpl_typography_ruleset($rpl-text-link-small-typography);
    }

    &--large {
      @include rpl_typography_ruleset($rpl-text-link-large-typography);
    }

    &--emphasis {
      &#{$root}--small {
        @include rpl_typography_ruleset($rpl-text-link-small-typography-emphasis);
      }

      &#{$root}--large {
        @include rpl_typography_ruleset($rpl-text-link-large-typography-emphasis);
      }
    }

    &--dark {
      color: $rpl-text-link-dark-text-color;

      &:hover,
      &:focus {
        color: $rpl-text-link-dark-text-color-hover;
      }

      &#{$root}--underline {
        border-bottom: $rpl-text-link-dark-underline;

        &:hover,
        &:focus {
          border-bottom: $rpl-text-link-dark-underline-hover;
        }
      }
    }
  }
</style>
