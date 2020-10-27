const statusIcon = {
  methods: {
    getStatusIcon (status) {
      if (!status) return

      switch (status.toLowerCase()) {
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
    }
  }
}

export default statusIcon
