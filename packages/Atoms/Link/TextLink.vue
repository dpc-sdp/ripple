<template>
  <rpl-link class="rpl-text-link" :class="{
    'rpl-text-link--dark': (theme === 'dark'),
    'rpl-text-link--dark--underline': (theme === 'dark' && underline),
    'rpl-text-link--small': (size === 'small'),
    'rpl-text-link--small--underline': (size === 'small' && underline),
    'rpl-text-link--large': (size === 'large'),
    'rpl-text-link--large--underline': (size === 'large' && underline),
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

  $rpl-text-link-light-underline: rpl-color('mid_neutral_2') !default;
  $rpl-text-link-light-underline-hover: rpl-color('mid_neutral_2') !default;
  $rpl-text-link-dark-underline: rpl-color('secondary') !default;
  $rpl-text-link-dark-underline-hover: rpl-color('white') !default;

  $rpl-text-link-underline-small: rem(2px);
  $rpl-text-link-underline-large: rem(3px);

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

    &--small {
      @include rpl_typography_ruleset($rpl-text-link-small-typography);

      &--underline {
        border-bottom-style: solid;
        border-bottom-color: $rpl-text-link-light-underline;
        border-bottom-width: $rpl-text-link-underline-small;

        &:hover,
        &:focus {
          border-bottom-color: $rpl-text-link-light-underline-hover;

          &.rpl-link {
            text-decoration: none;
          }
        }
      }
    }

    &--large {
      @include rpl_typography_ruleset($rpl-text-link-large-typography);

      &--underline {
        border-bottom-style: solid;
        border-bottom-color: $rpl-text-link-light-underline;
        border-bottom-width: $rpl-text-link-underline-large;

        &:hover,
        &:focus {
          border-bottom-color: $rpl-text-link-light-underline-hover;

          &.rpl-link {
            text-decoration: none;
          }
        }
      }
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

      &--underline {
        border-bottom-color: $rpl-text-link-dark-underline;

        &:hover,
        &:focus {
          color: $rpl-text-link-dark-text-color-hover;
          border-bottom-color: $rpl-text-link-dark-underline-hover;
        }
      }
    }
  }
</style>
