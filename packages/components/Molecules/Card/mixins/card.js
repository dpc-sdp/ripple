import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers'

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
    trimmedTitle () {
      const titleLength = 150
      return this.title ? truncateText(this.title, titleLength) : ''
    },
    formattedDate () {
      if (!this.dateStart && !this.dateEnd) return ''

      let formatted = this.formatDate(this.dateStart, 'DD MMMM YYYY')
      if (this.dateStart && this.dateEnd) {
        formatted = this.formatDateRange(this.dateStart, this.dateEnd)
      }

      return formatted
    },
    isValidContentType () {
      const validContentTypes = [
        'event',
        'grant',
        'news',
        'publication',
        'profile: aboriginal honour roll',
        'profile: australia day ambassador',
        'profile: victorian design review panel',
        'profile: women\'s honour roll'
      ]

      if (this.contentType && validContentTypes.includes(this.contentType.toLowerCase())) {
        return true
      }
      return false
    },
    contentTypeLabel () {
      if (this.showMeta && this.isValidContentType === true && this.contentType) {
        let contentType = this.contentType.split(' ')
        return contentType[0].replace(':', '')
      }

      return ''
    },
    topicLabel () {
      if (this.showMeta && this.isValidContentType === false && this.topic) {
        return this.topic
      }

      return ''
    }
  }
}

export default card
