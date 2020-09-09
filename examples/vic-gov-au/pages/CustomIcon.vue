<template>
  <div class="custom-icon">
    <p>Adding a new icon example:</p>
    <rpl-icon symbol="icon_circle_arrow_right" color="primary" size="m" />
    <p>Replacing existing "search" icon with custom:</p>
    <rpl-icon symbol="search" color="primary" size="m" />
  </div>
</template>

<script>
import RplIcon from '../../../packages/components/Atoms/Icon/Icon'
import './../assets/ripple-icon/icon_circle_arrow_right'
import './../assets/ripple-icon/icon_search'

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
