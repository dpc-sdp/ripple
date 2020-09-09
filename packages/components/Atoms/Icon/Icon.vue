<!-- credits to https://github.com/Justineo/vue-awesome/blob/master/src/components/Icon.vue -->
<template>
  <svg v-if="icon" :class="iconClass" :style="iconStyle" :viewBox="box" aria-hidden="true" overflow="visible">
    <!-- Use both xlink:href and href for browser support https://css-tricks.com/on-xlinkhref-being-deprecated-in-svg/ -->
    <use :xlink:href="'#' + iconPrefix + symbol" :href="'#' + iconPrefix + symbol"></use>
    <template v-if="icon.paths">
      <path v-for="(path, i) in icon.paths" :key="`${symbol}-path${i}`" v-bind="path" />
    </template>
    <template v-if="icon.polygons">
      <polygon v-for="(polygon, i) in icon.polygons" :key="`${symbol}-polygon${i}`" v-bind="polygon" />
    </template>
  </svg>
</template>

<script>
let icons = {}

export default {
  props: {
    'symbol': String,
    'color': String,
    'size': String
  },
  data: function () {
    return {
      iconPrefix: 'rpl_icon_',
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
      if (!this.icon) return ''

      let rtn = `rpl-icon rpl-icon--${this.symbol}`
      return this.color ? `${rtn} rpl-icon--color_${this.color}` : rtn
    },
    iconStyle () {
      if (!this.icon) return ''

      const width = this.icon.width
      const height = this.icon.height
      let size = (this.sizes[this.size] === undefined) ? parseFloat(this.size) : this.sizes[this.size]
      size = isNaN(size) ? 1 : size

      return `width: ${width * size}px; height: ${height * size}px`
    },
    icon () {
      if (!this.symbol) return null

      return icons[this.symbol]
    },
    box () {
      if (!this.icon) return
      return `0 0 ${this.icon.width} ${this.icon.height}`
    }
  },
  register (data) {
    for (let name in data) {
      let icon = data[name]
      let { paths = [], d, polygons = [], points } = icon
      if (d) {
        paths.push({ d })
      }
      if (points) {
        polygons.push({ points })
      }
      icons[name] = assign({}, icon, {
        paths,
        polygons
      })
    }
  },
  icons
}

function assign (obj, ...sources) {
  sources.forEach(source => {
    for (let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        obj[key] = source[key]
      }
    }
  })
  return obj
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";

  $rpl-all-colors: rpl-get-colors();
  @each $color-name, $color-value in $rpl-all-colors {
    .rpl-icon--color_#{str-replace($color-name, ' ', '-')} {
      fill: rpl-color($color-name);
    }
  }
</style>
