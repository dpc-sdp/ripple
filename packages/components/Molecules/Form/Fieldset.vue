<template functional>
  <fieldset :class="data ? data.class : ''" class="rpl-fieldset">
    <div class="rpl-fieldset__inner">
      <slot></slot>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'RplFieldset'
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-fieldset-col-padding: $rpl-space-3;
$rpl-fieldset-legend-margin: 0 0 $rpl-space-4 $rpl-space-3;
$rpl-fieldset-margin: $rpl-space-4 0;
$rpl-fieldset-legend-color: rpl-color('extra_dark_neutral') !default;
$rpl-fieldset-legend-ruleset: ('m', 1.2em, 'bold') !default;

.rpl-fieldset {
  $root: &;

  legend {
    display: flex;
    flex: 0 1 100%;
    @include rpl_typography_ruleset($rpl-fieldset-legend-ruleset);
    margin: $rpl-fieldset-legend-margin;
    color: $rpl-fieldset-legend-color;
  }

  &__inner {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -$rpl-fieldset-col-padding;
    margin-right: -$rpl-fieldset-col-padding;
  }

  &--pad {
    margin: $rpl-fieldset-margin;
  }

  .form-group {
    margin-left: $rpl-fieldset-col-padding;
    margin-right: $rpl-fieldset-col-padding;
    flex: 0 1 100%;

    @include rpl_breakpoint(m) {
      &--col-two {
        flex-basis: calc(50% - (#{$rpl-fieldset-col-padding} * 2));
      }

      &--col-three {
        flex-basis: calc(33.3% - (#{$rpl-fieldset-col-padding} * 2));
      }
    }

    &--inline {
      flex: initial;
    }
  }
}
</style>
