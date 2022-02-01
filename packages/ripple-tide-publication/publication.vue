<template>
  <div class="tide-content tide-content--publication">
    <h2>Publication</h2>
  </div>
</template>

<script>
// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: {
    RplRow,
    RplCol
  },
  props: {
    page: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-content--publication {

}
</style>
