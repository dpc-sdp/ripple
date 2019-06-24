<template>
  <hr class="rpl-divider" />
</template>

<script>
export default {
  name: 'RplDivider'
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
$rpl-divider-color: rpl-color('mid_neutral_1') !default;

.rpl-divider {
  margin-top: $rpl-space-4;
  margin-bottom: $rpl-space-4;
  border: 0;
  border-top: 1px solid $rpl-divider-color;
}
</style>
