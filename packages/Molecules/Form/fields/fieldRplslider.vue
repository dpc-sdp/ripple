<template>
  <div class="rpl-slider">
    <!-- Spacer -->
    <svg class="rpl-slider__spacing" width="100%" height="8" viewBox="0 0 100% 8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="spacers" patternUnits="userSpaceOnUse" :width="spacingCadence" height="8">
          <line vector-effect="non-scaling-stroke" stroke="black" stroke-width="2" x1="0" y1="0" x2="0" y2="8"/>
        </pattern>
      </defs>
      <rect width="100%" height="8" fill="url(#spacers)"/>
    </svg>
    <div class="rpl-slider__wrapper">
      <div
        class="rpl-slider__progress"
        :style="{
          'left': lowerPointPosition + '%',
          'right': upperPointPosition + '%'
        }"
      ></div>
      <label class="rpl-slider__label rpl-slider__label--lower" :style="{ 'left': lowerPointPosition + '%' }">
        <span @mousedown="mouseDownHandle('lower')">{{ schema.label }} - Lower value</span>
        <div aria-hidden="true">{{ lowerValueFormatted }}</div>
        <input type="number" v-model="lowerValue" :min="absoluteLower" :max="upperValue" :step="step" @input="onInput('lower')">
      </label>
      <label class="rpl-slider__label rpl-slider__label--upper" :style="{ 'right': upperPointPosition + '%' }">
        <span @mousedown="mouseDownHandle('upper')">{{ schema.label }} - Upper value</span>
        <div aria-hidden="true">{{ upperValueFormatted }}</div>
        <input type="number" v-model="upperValue" :min="lowerValue" :max="absoluteUpper" :step="step" @input="onInput('upper')">
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
      upperValue: this.value[1] || 100,
      prefix: this.schema.prefix || '',
      setFor: null
    }
  },
  methods: {
    onInput (type) {
      switch (type) {
        case 'lower':
          this.lowerValue = this.rangeLimit(this.absoluteLower, this.lowerValue, this.upperValue)
          break
        case 'upper':
          this.upperValue = this.rangeLimit(this.lowerValue, this.upperValue, this.absoluteUpper)
          break
      }
      this.value = [parseInt(this.lowerValue), parseInt(this.upperValue)]
    },
    mouseDownHandle (set) {
      this.setFor = set
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    mousemove (e) {
      const mouseX = e.clientX
      const sliderLeft = this.$el.offsetLeft
      const sliderWidth = this.$el.offsetWidth
      const mousePercentage = (mouseX - sliderLeft) / sliderWidth
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
    },
    mouseup () {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
    formatNumber (number) {
      let numberStr = number.toString()
      if (numberStr.length > 3) {
        let cursor = numberStr.length - 3
        while (cursor > 0) {
          numberStr = numberStr.slice(0, cursor) + ',' + numberStr.slice(cursor)
          cursor -= 3
        }
      }
      return numberStr
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
      return this.rangeLimit(0, this.sliderPositionFromLeft(this.lowerValue), this.sliderPositionFromLeft(this.upperValue))
    },
    upperPointPosition () {
      return this.rangeLimit(0, this.sliderPositionFromRight(this.upperValue), this.sliderPositionFromRight(this.lowerValue))
    },
    lowerValueFormatted () {
      return this.prefix + this.formatNumber(this.lowerValue)
    },
    upperValueFormatted () {
      return this.prefix + this.formatNumber(this.upperValue)
    },
    spacingCadence () {
      return (this.step / (this.absoluteUpper - this.absoluteLower) * 100) + '%'
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "../scss/form";

.rpl-slider {
  height: 8px;
  padding-top: 2px;
  box-sizing: border-box;
  position: relative;

  &__wrapper {
    position: relative;
    background-color: rpl-color('mid_neutral_2');
    height: 4px;
  }

  &__spacing {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__progress {
    position: absolute;
    background-color: rpl-color('secondary');
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__label {
    position: absolute;
    bottom: calc(100% + 16px);
    background-color: rpl-color('white');
    border-radius: 4px;
    border: 1px solid rpl-color('mid_neutral_2');
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.08);
    padding: 4px;
    margin: 0 !important;

    &:before {
      content: '';
      width: 10px;
      height: 10px;
      background-color: rpl-color('white');
      transform: rotateZ(45deg);
      display: inline-block;
      position: absolute;
      bottom: -5px;
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

    span {
      position: absolute;
      top: calc(100% + 8px);
      width: 20px;
      height: 20px;
      overflow: hidden;
      text-indent: -9999px;
      background-color: rpl-color('light_neutral');
      border: 1px solid rpl-color('mid_neutral_1');
      border-radius: 100%;
      left: 0;
      right: 0;
      margin: auto;
      -moz-user-select: none;
      user-select: none;
      cursor: col-resize;
    }

    div {
      font-size: 16px;
      -moz-user-select: none;
      user-select: none;
    }

    input {
      opacity: 0;
      width: 100% !important;
      height: auto !important;
      padding: 4px !important;
      font-size: 16px;
      border: 0 !important;
      background-color: white !important;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      &:focus {
        opacity: 1;
      }
    }
  }
}
</style>
