<template>
  <svg :class="iconClass" :width="iconProperties[symbol].width" :height="iconProperties[symbol].height">
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
    width: viewBoxSplit[2] + 'px',
    height: viewBoxSplit[3] + 'px'
  }
})

export default {
  props: [
    'symbol',
    'className'
  ],
  data: function () {
    return {
      iconProperties: iconProps
    }
  },
  computed: {
    iconClass () {
      const { symbol, className } = this
      return className ? `rpl-icon rpl-icon-${symbol} ${className}` : `rpl-icon rpl-icon-${symbol}`
    }
  }
}
</script>
