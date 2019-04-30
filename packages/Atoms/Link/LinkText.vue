<template>
  <span class="rpl-link-text" :class="{
    'rpl-link-text--dark': (theme === 'dark'),
    'rpl-link-text--dark--underline': (theme === 'dark' && underline),
    'rpl-link-text--small': (size === 'small'),
    'rpl-link-text--small--underline': (size === 'small' && underline),
    'rpl-link-text--large': (size === 'large'),
    'rpl-link-text--large--underline': (size === 'large' && underline),
    'rpl-link-text--emphasis': emphasis
  }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'RplLinkText',
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

  .rpl-link-text {
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
