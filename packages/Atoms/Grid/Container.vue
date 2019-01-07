<template>
  <div class="rpl-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

.rpl-container {
  @include rpl_grid_container;
}
</style>
