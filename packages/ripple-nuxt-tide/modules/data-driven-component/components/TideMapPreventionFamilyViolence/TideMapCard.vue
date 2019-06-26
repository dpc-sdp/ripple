<template>
  <div class="tide-map-card" v-on:click="cardClicked">
    <div class="tide-map-card-header">
      <rpl-icon
        v-if="isArea"
        class="card-map-marker"
        symbol="map_marker"
        color="mid_neutral_1"
        size="m"
      />
      <b>{{item.title}}</b>
      <div class="card-arrow">
        <rpl-icon symbol="arrow_right_secondary" color="dark_neutral" size="s"/>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'TideMapCard',
  props: {
    item: Object,
    isArea: Boolean
  },
  components: {
    RplIcon
  },
  methods: {
    cardClicked () {
      this.$emit('item-clicked', this.item)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$tide-map-card-background-color: rpl-color('white') !default;
$tide-map-card-text-color: rpl-color('primary') !default;
// Found the following on CardContent.vue
$rpl-card-content-border-color: rpl_color('mid_neutral_1') !default;
$rpl-card-content-border: 1px solid $rpl-card-content-border-color !default;
$rpl-card-content-border-radius: rem(4px) !default;

.tide-map-card {
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 8px 10px 8px 10px;
  background-color: $tide-map-card-background-color;
  border: $rpl-card-content-border;
  border-radius: $rpl-card-content-border-radius;
  &:hover {
    @include rpl_dropshadow;
  }
  .tide-map-card-header {
    display: flex;
    align-items: top;
    color: $tide-map-card-text-color;
  }
  .card-map-marker {
    margin-right: 5px;
    margin-top: 4px;
  }
  .card-arrow {
    padding-left: 10px;
    // This makes the arrow float right
    margin-left: auto;
    margin-right: 5px;
    order: 2;
  }
}
</style>
