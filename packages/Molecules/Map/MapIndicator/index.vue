<template>
  <div
    v-if="show"
    id="rpl-map-popup-content"
    class="rpl-map-indicator">
    <div class="rpl-map-indicator__close">
      <button-close
        :id="'tabs-close-button'"
        :size="'small'"
        @click="close"/>
    </div>
    <div
      class="rpl-map-indicator__inner"
      :ref="'contentElement'"
      :style="{
        maxHeight: this.maxHeight,
        width: this.width
      }">
      <template v-if="(selectedFeature instanceof Array)">
        <div
          v-for="(feature, index) in selectedFeature"
          :key="index"
          class="rpl-map-indicator__feature-multiple">
          <h5 class="rpl-map-indicator__title">{{ feature.title }}</h5>
          <div class="rpl-map-indicator__content">
            <div class="rpl-map-indicator__readmore" @click="readMoreMultiClick(index)" v-html="showDescOpenMuliText(index)" ></div>
            <div class="rpl-map-indicator__description" v-if="descIsOpen(index)" v-html="feature.content" />
          </div>
          <hr v-if="index !== selectedFeature.length - 1" />
        </div>
      </template>
      <div v-else>
        <h5 class="rpl-map-indicator__title">{{ selectedFeature.title }}</h5>
        <div class="rpl-map-indicator__content">
          <div class="rpl-map-indicator__readmore" @click="readMoreClick" v-html="this.descOpenText" ></div>
          <div class="rpl-map-indicator__description" v-if="descOpen" v-html="selectedFeature.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonClose from '../ButtonClose'
import Vue from 'vue'

const DEFAULT_MAX_HEIGHT_PX = 300
const DEFAULT_WIDTH_PX = 300

export default {
  name: 'MapIndicator',
  components: {
    ButtonClose
  },
  props: [
    'selectedFeature',
    'filters',
    // get the parent's map element for checking container size
    'mapElement'
  ],
  data: function () {
    return {
      defaultReadText: 'Read more',
      defaultHideText: 'Read less',
      show: false,
      descMultiOpen: {},
      descMultiOpenText: {},
      descOpen: false,
      descOpenText: 'Read more',
      maxHeight: DEFAULT_MAX_HEIGHT_PX + 'px',
      width: DEFAULT_WIDTH_PX + 'px'
    }
  },
  methods: {
    showReadMeText: function (show) {
      if (show) {
        return this.defaultHideText
      } else {
        return this.defaultReadText
      }
    },
    resetPopup () {
      this.descMultiOpen = {}
      this.descMultiOpenText = {}
      this.descOpen = false
      this.descOpenText = this.defaultReadText
    },
    close () {
      this.show = false
      this.resetPopup()
    },
    readMoreMultiClick: function (index) {
      if (this.descMultiOpen[index] === undefined) {
        Vue.set(this.descMultiOpen, index, false)
        Vue.set(this.descMultiOpenText, index, this.defaultReadText)
      }
      if (this.single) {
        let strIndex = index.toString()
        for (let item in this.descMultiOpen) {
          if (item !== strIndex) {
            Vue.set(this.descMultiOpen, item, false)
            Vue.set(this.descMultiOpenText, item, this.defaultReadText)
          }
        }
      }
      Vue.set(this.descMultiOpen, index, !this.descMultiOpen[index])
      Vue.set(this.descMultiOpenText, index, this.showReadMeText(this.descMultiOpen[index]))
    },
    readMoreClick () {
      this.descOpen = !this.descOpen
      this.descOpenText = this.showReadMeText(this.descOpen)
    },
    descIsOpen: function (index) {
      return (this.descMultiOpen[index] === undefined) ? false : this.descMultiOpen[index]
    },
    showDescOpenMuliText: function (index) {
      return (this.descMultiOpenText[index] === undefined) ? this.defaultReadText : this.descMultiOpenText[index]
    }
  },
  watch: {
    selectedFeature: function (newFeature, oldFeature) {
      // if the selectedFeature has been set to null, then hide the popup
      this.show = !!newFeature
      // Reset the description boxes if the popup is hidden
      if (!this.show) {
        this.resetPopup()
      }
      this.$nextTick(() => {
        if (this.$refs.contentElement) {
          // Make sure the popup is scrolled to top when it's opened
          this.$refs.contentElement.scrollTop = 0
          // Update the popup's size to fit the content & browser
          const mapSize = this.mapElement.getBoundingClientRect()
          this.maxHeight = Math.min(mapSize.height * 0.8, DEFAULT_MAX_HEIGHT_PX) + 'px'
          this.width = Math.min(mapSize.width - 40, DEFAULT_WIDTH_PX) + 'px'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .rpl-map-indicator {
    $root: &;
    background-color: rpl-color('white');
    border-radius: rem(5px);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
    overflow: hidden;

    &:before {
      $size: rem(12px);
      content: '';
      display: block;
      width: $size;
      height: $size;
      background-color: rpl-color('white');
      position: absolute;
      bottom: -($size/2);
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
    }

    &__inner {
      // big right margin to pad close button
      padding: 1.25rem 2.7rem 1.25rem 1rem;
      overflow: auto;
      position: relative;
      box-sizing: border-box;
    }

    &__close {
      position: absolute;
      right: $rpl-space * 5;
      top: $rpl-space * 5;
      z-index: 10;
    }

    &__title {
      color: rpl-color('primary');
      font-size: rpl-font-size('s');
      margin-top: 0;
      margin-bottom: $rpl-space-4;
    }

    &__list {
      font-size: rpl-font-size('s');
      list-style-type: decimal;
      margin-top: $rpl-space;
      padding-left: $rpl-space-4;
    }

    &__description {
      font-size: rpl-font-size('xs');
      margin-bottom: 0;

      // The /deep/ selector helps style elements
      // inside a v-html block
      & /deep/ #{$root}__link {
        color: rpl-color('primary');
      }
    }

    &__readmore {
      font-size: rpl-font-size('xs');
      text-decoration: underline;
      font-style: italic;
      margin-top: -$rpl-space-2;
      margin-bottom: $rpl-space-4;
      cursor: pointer;
    }

    // When there are multiple features, style
    // the first block in the list differently
    &__feature-multiple:first-child {
      #{$root}__title {
      font-size: rpl-font-size('m');
        color: rpl-color('black');
      }
    }
    &__feature-multiple:first-child {
      #{$root}__content {
        display: none;
      }
    }
  }
</style>
