<template>
  <table class="icons">
    <tr v-for="(icon, index) in icons" :key="index">
      <td><rpl-icon :symbol="icon" :color="color" :size="size" /></td>
      <td><code>{{ icon }}</code></td>
    </tr>
  </table>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'icons',
  components: {
    RplIcon
  },
  props: {
    icons: Array,
    color: String,
    size: String
  }
}
</script>

<style lang="scss" scoped>
  @import '~@dpc-sdp/ripple-global/scss/variables';
  .rpl-icon {
    display: block;
  }
  .icons {
    td {
      padding-right: $rpl-space-4;
    }
  }
</style>
