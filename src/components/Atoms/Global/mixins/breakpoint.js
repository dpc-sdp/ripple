// A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Ripple breakpoints.
 *
 * Use within a component:
 *
 *   import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.l">...</div>
 */
const breakpoint = {
  data () {
    return {
      clientWidth: 0,
      clientHeight: 0
    }
  },
  computed: {
    $breakpoint () {
      const xs = this.clientWidth >= 0
      const s = this.clientWidth >= 576
      const m = this.clientWidth >= 768
      const l = this.clientWidth >= 992
      const xl = this.clientWidth >= 1200
      const xxl = this.clientWidth >= 1600
      const xxxl = this.clientWidth >= 2560

      const result = {
        // Definite breakpoint.
        'xs': xs,
        's': s,
        'm': m,
        'l': l,
        'xl': xl,
        'xxl': xxl,
        'xxxl': xxxl,

        // For custom breakpoint logic.
        'width': this.clientWidth,
        'height': this.clientHeight
      }
      return result
    }
  },
  methods: {
    _updateDimensions () {
      // Cross-browser support as described in:
      // https://stackoverflow.com/questions/1248081
      this.clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      this.clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (typeof window !== 'undefined') {
        this._updateDimensions()
        window.addEventListener('resize', this._updateDimensions, {'passive': true})
      }
    })
  },
  destroyed () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._updateDimensions)
    }
  }
}

export default breakpoint
