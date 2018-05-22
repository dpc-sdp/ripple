<template>
  <svg v-if="validSymbol" :class="iconClass" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="'#' + symbol"></use>
  </svg>
</template>

<script>
// Require all SVG assets and calculate width based on view box.
let iconProps = {}
const _require = require.context('./assets/img/', true, /\.svg$/)
_require.keys().forEach(key => {
  let icon = _require(key)
  let viewBoxSplit = icon.default.viewBox.split(' ')
  iconProps[icon.default.id] = {
    width: parseFloat(viewBoxSplit[2]),
    height: parseFloat(viewBoxSplit[3])
  }
})

export default {
  props: {
    'symbol': String,
    'color': String,
    'size': String
  },
  data: function () {
    return {
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
      return (this.symbol && this.iconProperties[this.symbol] !== undefined)
    },
    iconClass () {
      let rtn = (this.validSymbol) ? `rpl-icon rpl-icon--${this.symbol}` : ''
      return this.color ? `${rtn} rpl-icon--${this.color}` : rtn
    },
    iconStyle () {
      if (this.validSymbol) {
        const { width, height } = this.iconProperties[this.symbol]
        let size = (this.sizes[this.size] === undefined) ? 1 : this.sizes[this.size]
        return `width: ${width * size}px; height: ${height * size}px`
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  @each $color-name, $color-value in $rpl-colors {
    .rpl-icon--#{str-replace($color-name, ' ', '-')} {
      fill: rpl-color($color-name);
    }
  }
</style>
