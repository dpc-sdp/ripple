<template>
  <span class="rpl-text-label" :class="{
    'rpl-text-label--dark': (theme === 'dark'),
    'rpl-text-label--dark--underline': (theme === 'dark' && underline),
    'rpl-text-label--small': (size === 'small'),
    'rpl-text-label--small--underline': (size === 'small' && underline),
    'rpl-text-label--large': (size === 'large'),
    'rpl-text-label--large--underline': (size === 'large' && underline),
    'rpl-text-label--emphasis': emphasis
  }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'RplTextLabel',
  props: {
    underline: { default: false, type: Boolean },
    theme: { default: 'light', type: String },
    size: { default: null, type: String },
    emphasis: { default: false, type: Boolean }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  // These variables were originally from TextLink.vue,
  // and have kept their names for compatibility.
  $rpl-text-link-light-underline: rpl-color('mid_neutral_2') !default;
  $rpl-text-link-dark-underline: rpl-color('secondary') !default;

  $rpl-text-link-underline-small: rem(2px) !default;
  $rpl-text-link-underline-large: rem(3px) !default;

  $rpl-text-link-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-text-link-dark-text-color: rpl-color('white') !default;
  $rpl-text-link-small-typography: ('xs', 1.7em, 'medium') !default;
  $rpl-text-link-large-typography: ('l', 1.7em, 'medium') !default;
  $rpl-text-link-small-typography-emphasis: ('xs', 1.7em, 'bold') !default;
  $rpl-text-link-large-typography-emphasis: ('l', 1.7em, 'bold') !default;

  .rpl-text-label {
    $root: &;
    @include rpl_text_color($rpl-text-link-text-color);
    text-decoration: none;

    &--small {
      @include rpl_typography_ruleset($rpl-text-link-small-typography);

      &--underline {
        border-bottom-style: solid;
        border-bottom-color: $rpl-text-link-light-underline;
        border-bottom-width: $rpl-text-link-underline-small;
      }
    }

    &--large {
      @include rpl_typography_ruleset($rpl-text-link-large-typography);

      &--underline {
        border-bottom-style: solid;
        border-bottom-color: $rpl-text-link-light-underline;
        border-bottom-width: $rpl-text-link-underline-large;
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
      }
    }
  }
</style>
