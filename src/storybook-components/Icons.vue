<template>
  <div class="icons">
    <ul v-for="(icon, index) in icons" :key="index">
      <li>
        <code>{{ icon }}</code>
        <rpl-icon :symbol="icon" :color="'primary'" :size="'s'" />
      </li>
    </ul>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'icons',
  components: {
    RplIcon
  },
  props: [
    'icons'
  ]
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-icon {
    display: block;
  }
</style>
