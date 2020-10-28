const card = {
  computed: {
    statusIcon () {
      if (!this.status) return

      switch (this.status.toLowerCase()) {
        case 'closed':
          return {
            symbol: 'cross_circle',
            color: 'danger'
          }
        case 'open':
        case 'ongoing':
          return {
            symbol: 'success',
            color: 'success'
          }
        default:
          return {
            symbol: 'success',
            color: 'success'
          }
      }
    },
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    }
  }
}

export default card
