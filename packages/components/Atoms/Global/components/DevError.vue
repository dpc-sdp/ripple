<template>
  <ol class="rpl-dev-error" v-if="rplOptions.isDev">
    <li v-for="(error, index) in errors" :key="index" >
      {{ error }}
    </li>
  </ol>
</template>

<script>
export default {
  name: 'RplDevError',
  props: {
    errors: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";

$rpl-dev-error-bg-color: $rpl-danger-bg-color !default;
$rpl-dev-error-text-color: $rpl-danger-color !default;

.rpl-dev-error {
  background-color: $rpl-dev-error-bg-color;
  color: $rpl-dev-error-text-color;
  padding: $rpl-space-4 $rpl-space-4 * 2;
}
</style>
