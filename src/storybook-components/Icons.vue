<template>
  <div class="icons">
    <h2>Icons</h2>
    <ul v-for="(icon, index) in icons" :key="index">
      <li>
        <code>{{ icon }}</code>
        <rpl-icon :symbol="icon" :color="'primary'" :size="'m'" />
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

<style lang="scss" scoped>
  .rpl-icon {
    display: block;
  }
</style>
