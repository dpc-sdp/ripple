<template>
  <img v-if="src" class="rpl-responsive-image" :class="`rpl-responsive-image--fit-${fit}`" :alt="alt" :height="height" :width="width" ref="image" :src="src" :srcset="calcSrcSet" :sizes="calcSizes" :style="calcFocalPoint"  />
</template>

<script>
import objectFitImages from 'object-fit-images'
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'

export const getPercentage = (pos, dimension) => {
  if (pos > dimension) {
    return 100
  } else if (pos < 1) {
    return 0
  }
  return (pos / dimension * 100).toFixed(2)
}

export default {
  name: 'RplResponsiveImg',
  mixins: [breakpoint],
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String
    },
    srcSet: {
      type: [String, Array]
    },
    focalPoint: {
      type: Object
    },
    sizes: {
      type: String
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    fit: {
      type: String,
      default: 'cover',
      validator: val => ['cover', 'contain'].includes(val)
    }
  },
  mounted () {
    if (this.src) {
      objectFitImages(this.$refs['image'])
    }
  },
  methods: {
    queryString (bp) {
      // Pass a function in rplOptions.imgQueryString to return custom query params for image URI's
      if (typeof this.rplOptions.imgQueryString === 'function') {
        return this.rplOptions.imgQueryString(bp)
      }
    }
  },
  computed: {
    isResponsive () {
      return this.rplOptions.imgQueryString || this.srcSet.some(bp => bp.hasOwnProperty('src'))
    },
    calcSizes () {
      if (this.sizes) {
        return this.sizes
      }
      if (Array.isArray(this.srcSet) && this.isResponsive) {
        return this.srcSet.map(bp => {
          if (bp.width && this.bps[bp.size] !== 0) {
            return `(max-width: ${this.bps[bp.size]}px) ${bp.width}px`
          }
        }).filter(bp => bp).join(', ') + ', 100vw'
      }
    },
    calcFocalPoint () {
      if (this.focalPoint && this.height && this.width) {
        // default value is 0 0, we set this to the middle instead
        const focalPoint = this.focalPoint.x === 0 && this.focalPoint.y === 0 ? '50% 50%' : `${getPercentage(this.focalPoint.x, this.width)}% ${getPercentage(this.focalPoint.y, this.height)}%`
        return {
          [`object-position`]: focalPoint,
          [`font-family`]: `'object-fit: cover; object-position: ${focalPoint};'`
        }
      }
    },
    calcSrcSet () {
      if (typeof this.srcSet === 'string') {
        return this.srcSet
      }
      if (Array.isArray(this.srcSet) && this.isResponsive) {
        return this.srcSet.map(bp => `${bp.src || this.src}${this.queryString(bp)} ${bp.width || this.bps[bp.size]}w`).join(', ')
      }
    },
    bps () {
      if (this.breakpointsSmallToLarge) {
        return this.breakpointsSmallToLarge.reduce((obj, bp) => {
          obj[bp.label] = bp.value
          return obj
        }, {})
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .rpl-responsive-image {
    width: 100%;
    &--fit-cover {
      @include object_fit_image(cover);
    }
    &--fit-contain {
      @include object_fit_image(contain);
    }
  }
</style>
