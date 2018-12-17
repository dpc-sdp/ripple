<template>
  <div
    v-if="show"
    class="rpl-map-indicator">
    <div class="rpl-map-indicator__close">
      <button-close
        :id="'tabs-close-button'"
        :size="'small'"
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

  // @import '~assets/styles/includes';

  .standard-button {
    // @include button($background: palette(blue,tint5), $background-hover: palette(blue,tint10));
    border-radius: 5px;
    font-size: rem-calc(13);
    display: block;
    margin-bottom: 0;
    font-weight: 700;
  }

  .rpl-map-indicator {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
    padding: 1.25rem 1rem;

    &:before {
      $size: 12px;
      content: '';
      display: block;
      width: $size;
      height: $size;
      background-color: white;
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
      color: blue;
      font-size: rem-calc(13);
      margin-top: 0;
      margin-bottom: 1rem;
    }

    &__value {
      color: blue;
      font-size: rem-calc(16);
      margin-bottom: .25rem;
    }

    &__list {
      font-size: rem-calc(13);
      font-weight: 500;
      list-style-type: decimal;
      margin-top: .25rem;
      padding-left: 1rem;
    }

    &__description {
      font-size: rem-calc(13);
      font-weight: 500;
      margin-bottom: 0;
    }
  }
</style>
