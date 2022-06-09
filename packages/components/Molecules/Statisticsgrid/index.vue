<template>
  <div class="rpl-statistics-grid">
    <div
      v-for="(item, index) in blocks"
      :key="`rpl-statistics-block-${index}`"
      :class="`rpl-statistics-grid__block rpl-statistics-grid__block--${theme ? 'primary' : 'secondary'}`">
      <div class="rpl-statistics-grid__block-inner">
        <rpl-markup class="rpl-statistics-grid__block-heading" v-if="item.heading" :html="item.heading"></rpl-markup>
        <rpl-markup class="rpl-statistics-grid__block-body" v-if="item.body" :html="item.body"></rpl-markup>
      </div>
    </div>
  </div>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'

export default {
  name: 'RplStatisticsGrid',
  components: { RplMarkup },
  props: {
    theme: {
      type: Boolean,
      default: true
    },
    blocks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "statistics-grid.scss";
</style>
