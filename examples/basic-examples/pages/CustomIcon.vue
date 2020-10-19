<template>
  <div class="custom-icon">
    <p>
      Adding a new icon not defined in Ripple:
      <rpl-icon symbol="lock_open" color="primary" size="xl" />
    </p>
    <p>
      Replacing Ripple "search" icon with different design:
      <rpl-icon symbol="search" color="secondary" size="xl" />
    </p>
  </div>
</template>

<script>
import RplIcon from '../../../packages/components/Atoms/Icon/index.js'
// Imports below will be moved to ripple-nux-ui so we can enable/disable customIcon.
import './../assets/ripple-icon/custom_icon_lock_open'
import './../assets/ripple-icon/custom_icon_search'

export default {
  name: 'CustomIcon',
  components: {
    RplIcon
  }
}
</script>
<style>
  .custom-icon {
    padding: 200px 100px;
  }
</style>
