<template>
  <div class="rpl-acknowledgement" v-if="text" :class="themeClass">
    <img class="rpl-acknowledgement__flag" src="./assets/images/aboriginal-flag.png" :alt="aboriginalFlagAltText" />
    <img class="rpl-acknowledgement__flag" src="./assets/images/torres-strait-islander-flag.png" :alt="torresStraitIslanderFlagAltText" />
    <div class="rpl-acknowledgement__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'RplAcknowledgement',
  props: {
    text: String,
    theme: { type: String, default: 'default' },
    aboriginalFlagAltText: { type: String, default: 'Aboriginal flag' },
    torresStraitIslanderFlagAltText: { type: String, default: 'Torres Strait Islander flag' }
  },
  computed: {
    themeClass () {
      return (this.theme === 'standalone') ? ['rpl-acknowledgement--standalone', 'rpl-site-constrain--on-all'] : null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-acknowledgement-ruleset: ('s', 1.25em, 'semibold') !default;
  $rpl-acknowledgement-ruleset-standalone: ('xs', 1.43em, 'regular') !default;
  $rpl-acknowledgement-bg-standalone: rpl-color('white') !default;
  $rpl-acknowledgement-flag-border: 1px solid rpl-color('white') !default;
  $rpl-acknowledgement-border: 1px solid rpl_color('mid_neutral_1') !default;

  .rpl-acknowledgement {
    $root: &;

    @include rpl_breakpoint('m') {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
    }

    &--standalone {
      padding-top: $rpl-space-4;
      padding-bottom: $rpl-space-4;
      border-top: $rpl-acknowledgement-border;
      border-bottom: $rpl-acknowledgement-border;
      background: $rpl-acknowledgement-bg-standalone;

      // Avoid x2 thickness border when component is placed after hero banner.
      .rpl-hero-banner + & {
        @include rpl_breakpoint('m') {
          border-top: 0;
        }
      }
    }

    &__flag {
      width: rem(53px);
      height: rem(36px);
      border: $rpl-acknowledgement-flag-border;
      margin-right: $rpl-space-2;

      @include rpl_breakpoint('m') {
        margin-right: $rpl-space-3;
        flex-shrink: 0;
      }
    }

    &__text {
      @include rpl_typography_ruleset($rpl-acknowledgement-ruleset);
      margin-top: $rpl-space-3;

      #{$root}--standalone & {
        @include rpl_typography_ruleset($rpl-acknowledgement-ruleset-standalone);
        max-width: rem(742px);
      }

      @include rpl_breakpoint('m') {
        margin-top: 0;
        margin-left: $rpl-space-3;
      }
    }
  }
</style>
