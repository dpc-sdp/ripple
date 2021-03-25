<!-- credits to https://github.com/Justineo/vue-awesome/blob/master/src/components/Icon.vue -->
<template>
  <svg v-if="icon || legacyIcon" :class="iconClass" :style="iconStyle" :viewBox="box" aria-hidden="true" overflow="visible">
    <template v-if="legacyIcon">
      <!-- Use both xlink:href and href for browser support https://css-tricks.com/on-xlinkhref-being-deprecated-in-svg/ -->
      <use :xlink:href="'#' + iconPrefix + symbol" :href="'#' + iconPrefix + symbol"></use>
    </template>
    <template v-else>
      <template v-if="icon.paths">
        <path v-for="(path, i) in icon.paths" :key="`${symbol}-path${i}`" v-bind="path" />
      </template>
      <template v-if="icon.polygons">
        <polygon v-for="(polygon, i) in icon.polygons" :key="`${symbol}-polygon${i}`" v-bind="polygon" />
      </template>
    </template>
  </svg>
</template>

<script>
// TODO remove this import along with `legacyIcon`
import { getIconProps } from './icon-library'
let icons = {}

/**
 * Icons are designed to represent actions and items.
 */
export default {
  props: {
    /**
     * See the Icon library page for options.
     */
    'symbol': String,
    /**
     * Colour of the icon defined in in Global/Colors e.g. primary, secondary, dark_neutral.
     * @values primary, secondary, dark_neutral, etc
     */
    'color': String,
    /**
     * Icon size [s, m, l, xl, xxl].
     * @values s, m, l, xl, xxl
     */
    'size': String
  },
  data: function () {
    return {
      iconProperties: getIconProps(), // TODO remove this prop along with `legacyIcon`
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
    // This is to support previous version using svg format
    // TODO Delete any `legacyIcon` traces once changes have been rolled out to dependent websites
    legacyIcon () {
      return (this.symbol && this.iconProperties[`${this.iconPrefix + this.symbol}`] !== undefined)
    },
    iconClass () {
      if (!this.icon && !this.legacyIcon) return ''

      let rtn = `rpl-icon rpl-icon--${this.symbol}`
      return this.color ? `${rtn} rpl-icon--color_${this.color}` : rtn
    },
    iconStyle () {
      if (!this.icon && !this.legacyIcon) return ''

      let width = this.icon ? this.icon.width ? this.icon.width : null : null
      let height = this.icon ? this.icon.height ? this.icon.height : null : null
      if (this.legacyIcon) {
        let legacyIcon = this.iconProperties[`${this.iconPrefix + this.symbol}`]
        width = legacyIcon.width
        height = legacyIcon.height
      }

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
