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
    trimmedSummary () {
      let summaryLength = 300
      if (this.image && Object.keys(this.image).length) {
        summaryLength = 200
      }
      return this.summary ? truncateText(this.summary, summaryLength) : ''
    },
    formattedDate () {
      if (!this.dateStart && !this.dateEnd) return ''

      let formatted = this.formatDate(this.dateStart, 'DD MMMM YYYY')
      if (this.dateStart && this.dateEnd) {
        formatted = this.formatDateRange(this.dateStart, this.dateEnd)
      }

      return formatted
    },
    contentTypeLabel () {
      if (this.showTopic || !this.contentType || (!this.showTopic && !this.contentType)) return ''

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

      let contentTypeLabel = ''
      if (validContentTypes.includes(this.contentType.toLowerCase())) {
        let contentType = this.contentType.split(' ')
        contentTypeLabel = contentType[0].replace(':', '')
      }

      return contentTypeLabel
    },
    topicLabel () {
      if (!this.showTopic || !this.topic || (this.showTopic && !this.topic)) return ''

      return this.topic
    }
  }
}

export default card
