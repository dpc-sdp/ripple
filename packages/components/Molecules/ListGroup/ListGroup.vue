<template>
  <ul class="rpl-list-group">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'RplListGroup'
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-list-group-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-list-group-border-radius: var(--rpl-theme-border-radius, rem(4px)) !default;
  $rpl-list-group-color: rpl-color('white') !default;

  .rpl-list-group {
    background-color: $rpl-list-group-color;
    border: $rpl-list-group-border;
    border-radius: $rpl-list-group-border-radius;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
