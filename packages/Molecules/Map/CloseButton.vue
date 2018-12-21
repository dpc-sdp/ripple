<template>
  <button
    type="button"
    class="rpl-map-close-button"
    @click="handleClick()"
  >
    <rpl-icon symbol="close" color="black" size="m" />
  </button>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'CloseButton',
  components: {
    RplIcon
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

.rpl-map-close-button {
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  line-height: 1;
}
</style>
