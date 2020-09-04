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
      },
      childrenWidth: 0,
      childrenHeight: 0,
      outerScale: 1,
      x: false,
      y: false,
      title: 'some title',
      label: 'any label'
    }
  },
  computed: {
    iconClass () {
      let rtn = (this.icon) ? `rpl-icon rpl-icon--${this.symbol}` : ''
      return this.color ? `${rtn} rpl-icon--color_${this.color}` : rtn
    },
    iconStyle () {
      if (this.icon) {
        const width = this.icon.width
        const height = this.icon.height
        let size = (this.sizes[this.size] === undefined) ? parseFloat(this.size) : this.sizes[this.size]
        size = isNaN(size) ? 1 : size

        return `width: ${width * size}px; height: ${height * size}px`
      }
    },
    icon () {
      if (this.symbol) {
        return icons[this.symbol]
      }
      return null
    },
    box () {
      if (this.icon) {
        return `0 0 ${this.icon.width} ${this.icon.height}`
      }
      return `0 0 ${this.width} ${this.height}`
    },
    raw () {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null
      }
      let raw = this.icon.raw
      let ids = {}
      raw = raw.replace(
        /\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,
        (match, quote, id) => {
          let uniqueId = getId('vat-')
          ids[id] = uniqueId
          return ` id="${uniqueId}"`
        }
      )
      raw = raw.replace(
        /#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,
        (match, rawId, _, pointerId) => {
          let id = rawId || pointerId
          if (!id || !ids[id]) {
            return match
          }
          return `#${ids[id]}`
        }
      )
      console.log('rawwww', raw)
      return raw
    }
  },
  mounted () {
    console.log('mounted pdateddd..')
    this.updateStack()
  },
  updated () {
    console.log('updated pdateddd..')
    this.updateStack()
  },
  methods: {
    updateStack () {
      if (!this.symbol && this.symbol !== null && this.$children.length === 0) {
        return
      }

      if (this.icon) {
        return
      }
      let width = 0
      let height = 0
      console.log('hereeeee..', this.$children)
      this.$children.forEach(child => {
        console.log('child..', child)
        child.outerScale = this.normalizedScale
        width = Math.max(width, child.width)
        height = Math.max(height, child.height)
      })
      this.childrenWidth = width
      this.childrenHeight = height
      this.$children.forEach(child => {
        child.x = (width - child.width) / 2
        child.y = (height - child.height) / 2
      })
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
      if (hasOwn(source, key)) {
        obj[key] = source[key]
      }
    }
  })
  return obj
}

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function escapeHTML (html) {
  return html.replace(/[<>"&]/g, c => ESCAPE_MAP[c] || c)
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
