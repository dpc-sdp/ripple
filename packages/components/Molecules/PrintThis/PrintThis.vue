<template>
  <button class="rpl-print-this" @click="printClick()">
    <rpl-icon symbol="print" color="primary" size="l" />
    <span class="rpl-print-this__text">{{label}}</span>
  </button>
</template>

<script>
// Add imports
import { isClient } from '@dpc-sdp/ripple-global/utils/helpers.js'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplPrintThis',
  components: {
    RplIcon
  },
  props: {
    label: String
  },
  methods: {
    printClick () {
      if (document.queryCommandSupported('print')) {
        document.execCommand('print', false, null)
      } else if (isClient()) {
        window.print()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-print-background-color: rpl_color('white') !default;
  $rpl-print-shadow: 0 rem(4px) rem(4px) 0 rgba(0, 0, 0, 0.08) !default;
  $rpl-print-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-print-text-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-print-text-color: rpl_color('extra_dark_neutral') !default;

  .rpl-print-this {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: $rpl-print-background-color;
    border: $rpl-print-border;
    border-radius: $rpl-space;
    box-shadow: $rpl-print-shadow;
    padding: $rpl-space-4 ($rpl-space-2 * 3);
    margin-bottom: $rpl-space-2 * 3;
    cursor: pointer;

    &:hover,
    &:focus {
      .rpl-print-this__text {
        text-decoration: underline;
      }
    }

    &__text {
      @include rpl_typography_ruleset($rpl-print-text-ruleset);
      @include rpl_text_color($rpl-print-text-color);
      margin-left: $rpl-space-4;
    }
  }
</style>
