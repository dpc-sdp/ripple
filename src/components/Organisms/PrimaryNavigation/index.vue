<template>
  <div class="rpl-primary-navigation">
    <div>menu</div>
    <div>{{ siteName }}</div>
    <div>search</div>
  </div>
</template>

<script>
export default {
  name: 'RplPrimaryNavigation',
  props: {
    'siteName': String
  }
}
</script>

<style lang="sass">
  @import "~@dpc-sdp/ripple-global/style"
</style>
