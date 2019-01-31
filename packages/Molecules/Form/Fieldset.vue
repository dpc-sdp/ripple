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
$rpl-fieldset-col-padding: $rpl-space-2;
$rpl-fieldset-legend-margin: 0 0 $rpl-space-4 $rpl-space-2;

.rpl-fieldset {
  $root: &;

  legend {
    flex: 0 1 100%;
    @include rpl_typography_ruleset(('m', 1.2em, 'bold'));
    margin: $rpl-fieldset-legend-margin;
  }

  &__row {
    #{$root}__inner {
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 -$rpl-fieldset-col-padding;
    }
  }

  &__col {
    margin: $rpl-fieldset-col-padding;

    &-one {
      flex: 0 1 100%;
    }

    &-two {
      flex: 0 1 calc(50% - (#{$rpl-fieldset-col-padding} * 2));
    }

    &-three {
      flex: 0 1 calc(33.3% - (#{$rpl-fieldset-col-padding} * 2));
    }
  }
}
</style>
