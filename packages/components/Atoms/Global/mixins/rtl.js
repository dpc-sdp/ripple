/**
 * A Vue mixin to provide method for checking RTL state.
 **/

const rtl = {
  methods: {
    isRtl () {
      if (this.rplOptions?.siteRtl === true) {
        return true
      } else {
        return this.rplOptions?.contentRtl
      }
    }
  }
}

export default rtl
