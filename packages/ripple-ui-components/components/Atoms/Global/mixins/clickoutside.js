const clickoutside = {
  data () {
    return {
      clickOutsideCB: null
    }
  },
  methods: {
    onClickOutside (cbFunc) {
      this.clickOutsideCB = cbFunc
      this.addOutsideTest()
    },
    addOutsideTest () {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.testOutside)
      }
    },
    testOutside (event) {
      if (typeof window !== 'undefined') {
        if (!this.$el.contains(event.target)) {
          if (this.clickOutsideCB && typeof this.clickOutsideCB === 'function') {
            this.clickOutsideCB()
          }
          this.removeOutsideTest()
        }
      }
    },
    removeOutsideTest () {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.testOutside)
      }
    }
  }
}

export default clickoutside
