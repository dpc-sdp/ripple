<template>
  <div class="{{componentClassName}}"></div>
</template>

<script>
// Add imports
// import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: '{{componentRippleName}}',
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
  @import "~@dpc-sdp/ripple-global/style";

  .{{componentClassName}} {
    // Add styles
  }
</style>
