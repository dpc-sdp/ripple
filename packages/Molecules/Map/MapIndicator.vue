<template>
  <div
    v-if="show"
    class="rpl-map-indicator">
    <div class="rpl-map-indicator__close">
      <button-close
        id="tabs-close-button"
        @click="close"/>
    </div>
    <slot>
      <h5 class="rpl-map-indicator__title">{{ selectedFeature.title }}</h5>
      <div class="rpl-map-indicator__content">
        <p class="rpl-map-indicator__description">{{ selectedFeature.content }}</p>
      </div>
    </slot>
  </div>
</template>

<script>
import ButtonClose from './CloseButton'

export default {
  name: 'MapIndicator',
  components: {
    ButtonClose
  },
  props: [
    'selectedFeature'
  ],
  data: function () {
    return { show: false }
  },
  methods: {
    close () {
      this.show = false
    }
  },
  watch: {
    selectedFeature: function (newFeature, oldFeature) {
      // if the selectedFeature has been set to null, then hide the popup
      this.show = !!newFeature
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-map-indicator-caret-size: rem(12px);
  $rpl-map-indicator-title-color: rpl_color('primary') !default;
  $rpl-map-indicator-background-color: rpl_color('white') !default;

  .rpl-map-indicator {
    background-color: $rpl-map-indicator-background-color;
    border-radius: rem(5px);
    box-shadow: 0 rem(2px) rem(4px) 0 rgba(0, 0, 0, 0.20);
    padding: 1.25rem 1rem;

    &:before {
      $size: $rpl-map-indicator-caret-size;
      content: '';
      display: block;
      width: $size;
      height: $size;
      background-color: $rpl-map-indicator-background-color;
      position: absolute;
      bottom: -($size/2);
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
    }

    &__close {
      position: absolute;
      right: .75rem;
      top: .75rem;
    }

    &__title {
      color: $rpl-map-indicator-title-color;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    &__description {
      margin-bottom: 0;
    }
  }
</style>
