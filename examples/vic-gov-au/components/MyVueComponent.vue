<template>
  <div class="my-vue-component">
    <h2>Custom component demo</h2>
    <div>Value of <code>exampleParam1</code>:<br/>{{exampleParam1}}</div>
  </div>
</template>

<script>
export default {
  name: 'MyVueComponent',
  props: {
    exampleParam1: String
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.my-vue-component {
  border: 4px dashed rpl_color('dark_primary');
  padding: $rpl-space-4;
}
</style>
