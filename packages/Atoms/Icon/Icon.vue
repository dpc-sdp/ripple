<template>
  <svg v-if="validSymbol" :class="iconClass" :style="iconStyle" aria-hidden="true">
    <!-- Use both xlink:href and href for browser support https://css-tricks.com/on-xlinkhref-being-deprecated-in-svg/ -->
    <use :xlink:href="'#' + iconPrefix + symbol" :href="'#' + iconPrefix + symbol"></use>
  </svg>
</template>

<script>
import { iconProps } from './icon-library'

export default {
  props: {
    'symbol': String,
    'color': String,
    'size': String
  },
  data: function () {
    return {
      iconPrefix: 'rpl_icon_',
      iconProperties: iconProps,
      sizes: {
        's': 0.5,
        'm': 1,
        'l': 1.5,
        'xl': 2,
        'xxl': 2.5
      }
    }
  },
  computed: {
    validSymbol () {
      return (this.symbol && this.iconProperties[this.iconPrefix + this.symbol] !== undefined)
    },
    iconClass () {
      let rtn = (this.validSymbol) ? `rpl-icon rpl-icon--${this.symbol}` : ''
      return this.color ? `${rtn} rpl-icon--color_${this.color}` : rtn
    },
    iconStyle () {
      if (this.validSymbol) {
        const { width, height } = this.iconProperties[this.iconPrefix + this.symbol]
        let size = (this.sizes[this.size] === undefined) ? parseFloat(this.size) : this.sizes[this.size]
        size = isNaN(size) ? 1 : size
        return `width: ${width * size}px; height: ${height * size}px`
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";

  @each $color-name, $color-value in $rpl-colors {
    .rpl-icon--color_#{str-replace($color-name, ' ', '-')} {
      fill: rpl-color($color-name);
    }
  }
</style>
