<template>
  <div class="rpl-acknowledgement" v-if="text" >{{ text }}</div>
</template>

<script>
export default {
  name: 'RplAcknowledgement',
  props: {
    text: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-acknowledgement-ruleset: (
    'xs': ('xs', 1em, 'bold'),
    'l': ('l', 1.2em, 'bold')
  ) !default;
  $rpl-acknowledgement-border-image: rpl-gradient('primary_gradient_0') !default;
  $rpl-acknowledgement-padding: 0 0 0 ($rpl-space * 5) !default;
  $rpl-acknowledgement-margin: ($rpl-space * 7) 0 ($rpl-space * 7) !default;
  $rpl-acknowledgement-margin-l: ($rpl-space * 11) 0 ($rpl-space * 7) !default;

  .rpl-acknowledgement {
    @include rpl_typography_ruleset($rpl-acknowledgement-ruleset);
    position: relative;
    padding: $rpl-acknowledgement-padding;
    margin: $rpl-acknowledgement-margin;

    @include rpl_breakpoint('l') {
      margin: $rpl-acknowledgement-margin-l;
    }

    &::before {
      content: '';
      width: $rpl-space;
      display: inline-block;
      background-image: $rpl-acknowledgement-border-image;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
</style>
