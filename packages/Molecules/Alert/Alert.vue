<template>
  <!-- This is a placeholder component and should be implemented in SDPA-749 -->
  <rpl-alert-base backgroundColor="danger" @rplAlertClose="close()">
    <span>{{ title }}</span>
  </rpl-alert-base>
</template>

<script>
import RplAlertBase from './AlertBase.vue'

export default {
  name: 'RplAlert',
  props: {
    title: String
  },
  components: {
    RplAlertBase
  },
  data () {
    return {
      // ...
    }
  },
  methods: {
    close () {
      this.$emit('rplAlertClose')
    }
  },
  computed: {
    // ...
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-alert {
    // Add styles
  }
</style>
