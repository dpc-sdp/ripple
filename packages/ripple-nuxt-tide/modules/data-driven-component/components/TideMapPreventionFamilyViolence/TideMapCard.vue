<template>
  <a @click="cardClicked">
    <div class="tide-map-card">
      <div class="tide-map-card__header">
        <rpl-icon
          v-if="isArea"
          class="tide-map-card__marker"
          symbol="map_marker"
          color="mid_neutral_1"
          size="m"
        />
        <span class="tide-map-card__title">{{item.title}}</span>
        <div class="tide-map-card__arrow">
          <rpl-icon symbol="arrow_right_secondary" color="dark_neutral" size="s"/>
        </div>
      </div>
      <slot></slot>
    </div>
  </a>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'TideMapCard',
  components: {
    RplIcon
  },
  props: {
    item: Object,
    isArea: Boolean
  },
  methods: {
    cardClicked () {
      this.$emit('click', this.item)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

.tide-map-card {
  cursor: pointer;
  margin-top: $rpl-space;
  margin-bottom: $rpl-space;
  padding: $rpl-space-2;
  background-color: rpl-color('white');
  border: 1px solid rpl_color('mid_neutral_1');
  border-radius: rem(4px);
  &:hover, &:focus {
    @include rpl_dropshadow;
  }
  .tide-map-card__header {
    display: flex;
    align-items: top;
    color: rpl-color('primary');
  }
  .tide-map-card__marker {
    margin-right: $rpl-space-2;
    margin-top: $rpl-space-2;
  }
  .tide-map-card__arrow {
    padding-left: $rpl-space-2;
    // This makes the arrow float right
    margin-left: auto;
    margin-right: $rpl-space;
    order: 2;
  }
  .tide-map-card__title {
    font-weight: bold;
  }
}
</style>
