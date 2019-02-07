<template>
  <rpl-link class="rpl-text-link" :class="{
    'rpl-text-link--underline-small': (underline && size === 'small'),
    'rpl-text-link--underline-large': (underline && size === 'large'),
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

  $rpl-text-link-light-underline: solid rpl-color('mid_neutral_2');
  $rpl-text-link-light-underline-hover: solid rpl-color('mid_neutral_2');
  $rpl-text-link-dark-underline: solid rpl-color('secondary');
  $rpl-text-link-dark-underline-hover: solid rpl-color('white');

  $rpl-text-link-light-underline-large: rem(3px) $rpl-text-link-light-underline !default;
  $rpl-text-link-light-underline-small: rem(2px) $rpl-text-link-light-underline !default;

  $rpl-text-link-light-underline-hover-large: rem(3px) $rpl-text-link-light-underline-hover !default;
  $rpl-text-link-light-underline-hover-small: rem(2px) $rpl-text-link-light-underline-hover !default;

  $rpl-text-link-dark-underline-large: rem(3px) $rpl-text-link-dark-underline !default;
  $rpl-text-link-dark-underline-small: rem(2px) $rpl-text-link-dark-underline !default;

  $rpl-text-link-dark-underline-hover-large: rem(3px) $rpl-text-link-dark-underline-hover !default;
  $rpl-text-link-dark-underline-hover-small: rem(2px) $rpl-text-link-dark-underline-hover !default;

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

      &-small {
        border-bottom: $rpl-text-link-light-underline-small;

        &:hover,
        &:focus {
          border-bottom: $rpl-text-link-light-underline-hover-small;

          &.rpl-link {
            text-decoration: none;
          }
        }
      }

      &-large {
        border-bottom: $rpl-text-link-light-underline-large;

        &:hover,
        &:focus {
          border-bottom: $rpl-text-link-light-underline-hover-large;

          &.rpl-link {
            text-decoration: none;
          }
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

        &-small {
          border-bottom: $rpl-text-link-dark-underline-small;

          &:hover,
          &:focus {
            border-bottom: $rpl-text-link-dark-underline-hover-small;

            &.rpl-link {
              text-decoration: none;
            }
          }
        }

        &-large {
          border-bottom: $rpl-text-link-dark-underline-large;

          &:hover,
          &:focus {
            border-bottom: $rpl-text-link-dark-underline-hover-large;

            &.rpl-link {
              text-decoration: none;
            }
          }

        }
      }
    }
  }
</style>
