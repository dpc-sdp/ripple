<template>
  <div class="rpl-slider">
    <div class="rpl-slider__spacers" aria-hidden="true">
      <span class="rpl-slider__spacer" v-for="(item, index) in stepCount" :key="index"></span>
    </div>
    <div class="rpl-slider__wrapper">
      <div
        class="rpl-slider__progress"
        :style="{
          'left': lowerPointPosition + '%',
          'right': upperPointPosition + '%'
        }"
      ></div>
      <label class="rpl-slider__label rpl-slider__label--lower" :style="{ 'left': lowerPointPosition + '%' }">
        <span class="rpl-slider__handle" @mousedown="mouseDownHandle('lower')" @touchstart="touchStartHandle('lower')">{{ schema.label }} - Lower value</span>
        <div class="rpl-slider__display-label" aria-hidden="true">{{ lowerValueFormatted }}</div>
        <input class="rpl-slider__input" type="number" v-model="lowerValue" :min="absoluteLower" :max="upperValue" :step="step" @change="updateValue('lower')">
      </label>
      <label class="rpl-slider__label rpl-slider__label--upper" :style="{ 'right': upperPointPosition + '%' }">
        <span class="rpl-slider__handle" @mousedown="mouseDownHandle('upper')" @touchstart="touchStartHandle('upper')">{{ schema.label }} - Upper valueue</span>
        <div class="rpl-slider__display-label" aria-hidden="true">{{ upperValueFormatted }}</div>
        <input class="rpl-slider__input" type="number" v-model="upperValue" :min="lowerValue" :max="absoluteUpper" :step="step" @change="updateValue('upper')">
      </label>
    </div>
  </div>
</template>

<script>
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField],
  data () {
    return {
      step: this.schema.step || 1,
      absoluteLower: this.schema.min || 0,
      absoluteUpper: this.schema.max || 100,
      lowerValue: this.value[0] || 0,
      finalLower: this.value[0] || 0,
      upperValue: this.value[1] || 100,
      finalUpper: this.value[1] || 100,
      prefix: this.schema.prefix || '',
      setFor: null
    }
  },
  methods: {
    updateValue (type) {
      const intLower = parseInt(this.lowerValue)
      const intUpper = parseInt(this.upperValue)
      switch (type) {
        case 'lower':
          this.lowerValue = this.rangeLimit(this.absoluteLower, intLower, intUpper)
          this.finalLower = this.lowerValue
          break
        case 'upper':
          this.upperValue = this.rangeLimit(intLower, intUpper, this.absoluteUpper)
          this.finalUpper = this.upperValue
          break
      }
      this.value = [this.finalLower, this.finalUpper]
    },
    mouseDownHandle (set) {
      this.setFor = set
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    touchStartHandle (set) {
      this.setFor = set
      document.addEventListener('touchmove', this.touchmove)
      document.addEventListener('touchend', this.touchend)
    },
    touchmove (e) {
      this.updateHandleFromCursor(e.touches[0].clientX)
    },
    mousemove (e) {
      this.updateHandleFromCursor(e.clientX)
    },
    touchend () {
      document.removeEventListener('touchmove', this.touchmove)
      document.removeEventListener('touchend', this.touchend)
      this.updateValue(this.setFor)
    },
    mouseup () {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
      this.updateValue(this.setFor)
    },
    updateHandleFromCursor (cursorPosition) {
      const sliderLeft = this.$el.offsetLeft
      const sliderWidth = this.$el.offsetWidth
      const mousePercentage = (cursorPosition - sliderLeft) / sliderWidth
      const newVal = Math.floor((mousePercentage * this.absoluteUpper) / this.step) * this.step
      switch (this.setFor) {
        case 'lower':
          let newLowerVal = newVal > this.upperValue ? this.upperValue : newVal
          this.lowerValue = newLowerVal < this.absoluteLower ? this.absoluteLower : newLowerVal
          break
        case 'upper':
          let newUpperVal = newVal < this.lowerValue ? this.lowerValue : newVal
          this.upperValue = newUpperVal > this.absoluteUpper ? this.absoluteUpper : newUpperVal
          break
      }
      this.updateValue(this.setFor)
    },
    formatNumber (number) {
      if (!isNaN(number)) {
        const commaSpacing = 3
        let numberStr = number.toString()
        if (numberStr.length > commaSpacing) {
          let cursor = numberStr.length - commaSpacing
          while (cursor > 0) {
            numberStr = numberStr.slice(0, cursor) + ',' + numberStr.slice(cursor)
            cursor -= commaSpacing
          }
        }
        return numberStr
      } else {
        return ''
      }
    },
    rangeLimit (lower, current, upper) {
      if (current >= lower && current <= upper) {
        return current
      } else if (current > upper) {
        return upper
      } else if (current < lower) {
        return lower
      }
    },
    sliderPositionFromLeft (val) {
      const currentPos = val / (this.absoluteLower + this.absoluteUpper) * 100
      return this.rangeLimit(0, currentPos, 100)
    },
    sliderPositionFromRight (val) {
      const currentPos = (1 - (val / (this.absoluteLower + this.absoluteUpper))) * 100
      return this.rangeLimit(0, currentPos, 100)
    }
  },
  computed: {
    lowerPointPosition () {
      return this.rangeLimit(0, this.sliderPositionFromLeft(this.finalLower), this.sliderPositionFromLeft(this.finalUpper))
    },
    upperPointPosition () {
      return this.rangeLimit(0, this.sliderPositionFromRight(this.finalUpper), this.sliderPositionFromRight(this.finalLower))
    },
    lowerValueFormatted () {
      return this.prefix + this.formatNumber(this.finalLower)
    },
    upperValueFormatted () {
      return this.prefix + this.formatNumber(this.finalUpper)
    },
    stepCount () {
      return Math.floor((this.absoluteUpper - this.absoluteLower) / this.step) + 1
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
@import "../scss/form";

$rpl-slider-spacer-width: rem(2px) !default;
$rpl-slider-spacer-height: $rpl-space-2 !default;
$rpl-slider-spacer-color: rpl-color('mid_neutral_2') !default;
$rpl-slider-bar-height: $rpl-space !default;
$rpl-slider-bar-color: rpl-color('mid_neutral_2') !default;
$rpl-slider-bar-padding: rem(2px) 0 0 !default;
$rpl-slider-bar-margin: ($rpl-space * 7) 0 0 0 !default;
$rpl-slider-progress-bar-color: rpl-color('secondary') !default;
$rpl-slider-label-padding: $rpl-space $rpl-space-4 !default;
$rpl-slider-label-border: 1px solid rpl-color('mid_neutral_2') !default;
$rpl-slider-label-background: rpl-color('white') !default;
$rpl-slider-label-border-radius: rem(4px) !default;
$rpl-slider-label-ruleset: ('s', 1em, 'bold') !default;
$rpl-slider-handle-color: rpl-color('light_neutral') !default;
$rpl-slider-handle-border: 1px solid rpl-color('mid_neutral_1') !default;
$rpl-slider-handle-size: ($rpl-space * 5) !default;

.rpl-slider {
  height: $rpl-slider-spacer-height;
  padding: $rpl-slider-bar-padding;
  margin: $rpl-slider-bar-margin;
  box-sizing: border-box;
  position: relative;

  &__spacers {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__spacer {
    height: $rpl-slider-spacer-height;
    width: $rpl-slider-spacer-width;
    background-color: $rpl-slider-spacer-color;
  }

  &__wrapper {
    position: relative;
    background-color: $rpl-slider-bar-color;
    height: $rpl-slider-bar-height;
  }

  &__progress {
    position: absolute;
    background-color: $rpl-slider-progress-bar-color;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__label {
    @include rpl_dropshadow;
    position: absolute;
    bottom: calc(100% + #{rem(16px)});
    background-color: $rpl-slider-label-background;
    border-radius: $rpl-slider-label-border-radius;
    border: $rpl-slider-label-border;
    padding: $rpl-slider-label-padding;
    margin: 0 !important;

    &:before {
      content: '';
      width: rem(10px);
      height: rem(10px);
      background-color: $rpl-slider-label-background;
      transform: rotateZ(45deg);
      display: inline-block;
      position: absolute;
      bottom: rem(-5px);
      right: 0;
      left: 0;
      margin: auto;
    }

    &--lower {
      transform: translateX(-50%);
    }

    &--upper {
      transform: translateX(50%);
    }
  }

  &__handle {
    position: absolute;
    top: calc(100% + #{$rpl-space-2});
    width: $rpl-slider-handle-size;
    height: $rpl-slider-handle-size;
    overflow: hidden;
    text-indent: -9999px;
    background-color: $rpl-slider-handle-color;
    border: $rpl-slider-handle-border;
    border-radius: 100%;
    left: 0;
    right: 0;
    margin: auto;
    -moz-user-select: none;
    user-select: none;
    cursor: col-resize;
  }

  &__display-label {
    @include rpl_typography_ruleset($rpl-slider-label-ruleset);
    -moz-user-select: none;
    user-select: none;
  }

  &__input {
    @include rpl_typography_ruleset($rpl-slider-label-ruleset);
    opacity: 0;
    width: 100% !important;
    height: auto !important;
    padding: $rpl-space !important;
    background-color: $rpl-slider-label-background !important;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &:focus {
      opacity: 1;
    }
  }
}
</style>
