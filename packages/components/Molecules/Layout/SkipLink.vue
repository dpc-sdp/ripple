<template>
  <div id="rpl-skip-link" class="rpl-skip-link">
    <a class="rpl-skip-link__link" :class="{ 'rpl-skip-link__link--show' : show }" :href="href">{{ title }}</a>
  </div>
</template>

<script>
export default {
  name: 'RplSkipLink',
  props: {
    title: { type: String, default: 'Skip to main content' },
    href: { type: String, default: '#rpl-main-content' },
    show: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-skip-link-padding: $rpl-space-4 ($rpl-space * 5) !default;
  $rpl-skip-link-text-color: rpl-color('white') !default;
  $rpl-skip-link-background: rpl-color('secondary') !default;
  $rpl-skip-link-ruleset: ('s', 1em, 'bold') !default;
  $rpl-skip-link-border-radius: 0 0 rem(4px) 0 !default;

  .rpl-skip-link {
    &__link {
      @include rpl_visually_hidden;

      &--show,
      &:focus {
        @include rpl_typography_ruleset($rpl-skip-link-ruleset);
        @include rpl_dropshadow;
        background: $rpl-skip-link-background;
        color: $rpl-skip-link-text-color;
        z-index: $rpl-zindex-popover;
        padding: $rpl-skip-link-padding;
        border-radius: $rpl-skip-link-border-radius;
        width: auto;
        height: auto;
        margin: auto;
        clip: auto;
        pointer-events: auto;
        text-decoration: none;
        top: 0;
        left: 0;
      }
    }
  }
</style>
