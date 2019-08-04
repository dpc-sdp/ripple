<template>
  <div class="{{componentClassName}}">
    <span>{{ componentNaturalName }}</span>
  </div>
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
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .{{componentClassName}} {
    // Add styles
  }
</style>
