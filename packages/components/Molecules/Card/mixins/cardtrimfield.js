import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import FontFaceObserver from 'fontfaceobserver'

const cardtrimfield = {
  mixins: [breakpoint],
  props: {
    trimFieldEventBus: Object,
    trimFieldUpdateOnResize: { type: Boolean, default: true }
  },
  data: function () {
    return {
      trimFieldMaxHeight: 'none',
      trimFieldSelector: '',
      trimFieldRefreshOnFonts: false
    }
  },
  methods: {
    /**
     * Return trimmed field's bottom-most position (in pixels) from top of card.
     * Value will be subtracted from field's top position to get field height.
     * Override if elements below trimmed field will affect the available space.
     * @param {Object} card The HTML element for the card.
     */
    getTrimFieldMaxHeightOffset: function (card) {
      return card.clientHeight
    },
    setTrimFieldMaxHeight: function () {
      // Set the max height of a summary field.
      if (typeof window !== 'undefined' && this.$el && this.$el.querySelector && this.$breakpoint.m) {
        // Elements
        const card = this.$el
        const summary = card.querySelector(this.trimFieldSelector)
        if (summary) {
          // Properties
          const summaryLineHeight = parseFloat(window.getComputedStyle(summary, null).getPropertyValue('line-height'))
          let summaryAllowedHeight = this.getTrimFieldMaxHeightOffset(card) - summary.offsetTop
          summaryAllowedHeight = summaryLineHeight * Math.floor(summaryAllowedHeight / summaryLineHeight)
          // Set Max Height
          this.trimFieldMaxHeight = (summary.clientHeight > summaryAllowedHeight) ? summaryAllowedHeight + 'px' : 'none'
        } else {
          this.trimFieldMaxHeight = 'none'
        }
      } else {
        this.trimFieldMaxHeight = 'none'
      }
    }
  },
  mounted () {
    if (this.trimFieldRefreshOnFonts) {
      let fonts = ['VIC-Bold'] // default vic fonts for card title
      if (this.rplOptions.card && this.rplOptions.card.trimFieldfonts) {
        fonts = this.rplOptions.card.trimFieldfonts
      }
      fonts.forEach(font => {
        const fontObserver = new FontFaceObserver(font)
        fontObserver.load().then(this.setTrimFieldMaxHeight)
      })
    }

    if (this.trimFieldEventBus) {
      this.trimFieldEventBus.$on('setTrimFieldMaxHeight', this.setTrimFieldMaxHeight)
    }

    if (this.trimFieldUpdateOnResize) {
      this.$nextTick(() => {
        if (typeof window !== 'undefined') {
          this.setTrimFieldMaxHeight()
          window.addEventListener('resize', this.setTrimFieldMaxHeight, { passive: true })
        }
      })
    }
  },
  destroyed () {
    if (this.trimFieldEventBus) {
      this.trimFieldEventBus.$off('setTrimFieldMaxHeight', this.setTrimFieldMaxHeight)
    }

    if (this.trimFieldUpdateOnResize) {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.setTrimFieldMaxHeight)
      }
    }
  }
}

export default cardtrimfield
