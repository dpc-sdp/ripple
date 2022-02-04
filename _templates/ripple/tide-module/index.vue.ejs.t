---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/index.vue
---

<template>
  <div class="tide-content tide-content--<%= h.changeCase.paramCase(name) %>">
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

.tide-content--<%= h.changeCase.paramCase(name) %> {

}
</style>
