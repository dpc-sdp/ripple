<template>
  <div class="rpl-row" :class="{'rpl-row--gutter': rowGutter}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    'rowGutter': Boolean
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

.rpl-row {
  @include rpl_grid_row;

  &--gutter {
    @include rpl_grid_row_gutter;
  }
}
</style>
