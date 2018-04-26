<template>
  <svg :class="iconClass" :style="iconStyle">
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
    'className': String,
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
    iconClass () {
      const { symbol, className, color } = this
      let rtn = className ? `rpl-icon rpl-icon--${symbol} ${className}` : `rpl-icon rpl-icon--${symbol}`
      return color ? `${rtn} rpl-icon--${color}` : rtn
    },
    iconStyle () {
      const { width, height } = this.iconProperties[this.symbol]
      let size = (this.sizes[this.size] === undefined) ? 1 : this.sizes[this.size]
      return `width: ${width * size}px; height: ${height * size}px`
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
