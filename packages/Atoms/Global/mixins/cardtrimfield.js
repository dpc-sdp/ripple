import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'

const cardtrimfield = {
  mixins: [breakpoint],
  data: function () {
    return {
      trimFieldMaxHeight: 'none',
      trimFieldSelector: ''
    }
  },
  methods: {
    getTrimFieldMaxHeightOffset: function (card) {
      return card.clientHeight
    },
    setTrimFieldMaxHeight: function () {
      // Set the max height of a summary field.
      if (typeof window !== 'undefined' && this.$el && this.$breakpoint.m) {
        // Elements
        let card = this.$el
        let summary = card.querySelector(this.trimFieldSelector)
        if (summary) {
          // Properties
          let summaryLineHeight = parseFloat(window.getComputedStyle(summary, null).getPropertyValue('line-height'))
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
    this.$nextTick(() => {
      if (typeof window !== 'undefined') {
        this.setTrimFieldMaxHeight()
        window.addEventListener('resize', this.setTrimFieldMaxHeight, {'passive': true})
      }
    })
  },
  destroyed () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.setTrimFieldMaxHeight)
    }
  }
}

export default cardtrimfield
