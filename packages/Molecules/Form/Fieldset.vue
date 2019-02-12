<template functional>
  <fieldset :class="data.class" class="rpl-fieldset">
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

.rpl-fieldset {
  $root: &;

  legend {
    display: flex;
    flex: 0 1 100%;
    @include rpl_typography_ruleset(('m', 1.2em, 'bold'));
    margin: $rpl-fieldset-legend-margin;
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
        flex: 0 1 calc(50% - (#{$rpl-fieldset-col-padding} * 2));
      }

      &--col-three {
        flex: 0 1 calc(33.3% - (#{$rpl-fieldset-col-padding} * 2));
      }
    }

    &--inline {
      flex: initial;
    }
  }
}
</style>
