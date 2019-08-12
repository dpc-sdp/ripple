<template>
  <div class="rpl-acknowledgement" v-if="text">
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
    aboriginalFlagAltText: { type: String, default: 'Aboriginal flag' },
    torresStraitIslanderFlagAltText: { type: String, default: 'Torres Strait Islander flag' }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-acknowledgement-ruleset: ('s', 1.25em, 'semibold') !default;
  $rpl-acknowledgement-flag-border: 1px solid rpl-color('white') !default;

  .rpl-acknowledgement {
    @include rpl_breakpoint('m') {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
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

      @include rpl_breakpoint('m') {
        margin-top: 0;
        margin-left: $rpl-space-3;
      }
    }
  }
</style>
