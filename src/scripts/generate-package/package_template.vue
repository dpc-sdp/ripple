<template>
  <div class="{{packageClassName}}"></div>
</template>

<script>
// Add imports
// import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: '{{packageRippleName}}',
  props: {
    // ...
  },
  data () {
    return {
      // ...
    }
  },
  methods: {
    // ...
  },
  computed: {
    // ...
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .{{packageClassName}} {
    // Add styles
  }
</style>
