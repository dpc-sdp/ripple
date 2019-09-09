<template>
  <div class="example-card-promotion">
    <h2 class="example-card-promotion__title" v-if="title">{{ title }}</h2>
    <div class="example-card-promotion__trim-wrapper" v-if="summary" :style="{ maxHeight: trimFieldMaxHeight }">
      <p class="example-card-promotion__summary">{{ summary }}</p>
    </div>
  </div>
</template>

<script>
// Extend Ripple component if need. https://vuejs.org/v2/api/#extends
// Please be careful as extending will introduce complexity in maintenance.
import { RplCardPromotion } from '@dpc-sdp/ripple-card'

export default {
  extends: RplCardPromotion,
  name: 'ExampleCardPromotion'
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .example-card-promotion {
    background-color: rpl-color('white');
  }
</style>
