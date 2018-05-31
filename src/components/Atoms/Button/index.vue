<template>
  <rpl-link
    v-if="href"
    :href="href"
    class="rpl-button"
    :class="{
      'rpl-button--primary': (theme === 'primary'),
      'rpl-button--secondary': (theme === 'secondary'),
      'rpl-button--disabled': disabled
    }"
  >
    <slot></slot>
  </rpl-link>
  <button
    v-else
    class="rpl-button"
    :disabled="disabled"
    :class="{
      'rpl-button--primary': (theme === 'primary'),
      'rpl-button--secondary': (theme === 'secondary'),
      'rpl-button--disabled': disabled
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplButton',
  props: {
    href: String,
    theme: String,
    disabled: Boolean
  },
  components: {
    RplLink
  },
  data: function () {
    return {}
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-button-ruleset: (
    'xs': ('xs', 1em, 'bold'),
    'm': ('s', 1em, 'bold')
  );
  $rpl-button-text-color: rpl_color('white') !default;
  $rpl-button-border-radius: rem(4px) !default;
  $rpl-button-padding: $rpl-space-4 ($rpl-space * 12) !default;
  $rpl-button-border: 1px solid transparent !default;
  $rpl-button-primary-background-color: rpl_color('primary') !default;
  $rpl-button-primary-text-color: rpl_color('white') !default;
  $rpl-button-primary-hover-background-color: rpl_color('secondary') !default;
  $rpl-button-secondary-background-color: rpl_color('secondary') !default;
  $rpl-button-secondary-text-color: rpl_color('white') !default;
  $rpl-button-secondary-hover-background-color: rpl_color('primary') !default;
  $rpl-button-active-background-color: rpl_gradient('primary_gradient_90') !default;
  $rpl-button-disabled-border: 1px solid rpl_color('dark_neutral') !default;
  $rpl-button-disabled-text-color: rpl_color('dark_neutral') !default;

  .rpl-button {
    $root: &;
    @include rpl_typography_ruleset($rpl-button-ruleset);
    color: $rpl-button-text-color;
    text-align: center;
    display: inline-block;
    border: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    padding: $rpl-button-padding;
    border: $rpl-button-border;
    cursor: pointer;

    @include rpl_breakpoint('s') {
      width: auto;
      border-radius: $rpl-button-border-radius;
    }

    &--primary {
      background-color: $rpl-button-primary-background-color;
      color: $rpl-button-primary-text-color;

      &:hover,
      &:focus {
        background-color: $rpl-button-primary-hover-background-color;
      }
    }

    &--secondary {
      background-color: $rpl-button-secondary-background-color;
      color: $rpl-button-secondary-text-color;

      &:hover,
      &:focus {
        background-color: $rpl-button-secondary-hover-background-color;
      }
    }

    &--primary,
    &--secondary {
      &.rpl-link {
        &:hover,
        &:focus {
          text-decoration: none;
        }

        &#{$root}--disabled {
          pointer-events: none;
        }
      }

      &:active {
        background-color: transparent;
        background-image: $rpl-button-active-background-color;
      }

      &#{$root}--disabled {
        cursor: default;
        background-color: transparent;
        background-image: none;
        border: $rpl-button-disabled-border;
        color: $rpl-button-disabled-text-color;
      }
    }
  }
</style>
