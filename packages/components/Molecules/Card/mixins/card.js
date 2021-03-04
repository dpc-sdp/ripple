import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers'
import grantStatus from '@dpc-sdp/ripple-grants/grants-status'

const card = {
  data () {
    return {
      statusTerms: {
        open: {
          label: 'Open',
          symbol: 'success',
          color: 'success'
        },
        closed: {
          label: 'Closed',
          symbol: 'cross_circle',
          color: 'danger'
        },
        ongoing: {
          label: 'Ongoing',
          symbol: 'success',
          color: 'success'
        },
        openingSoon: (startdate) => {
          return {
            label: `Opening on ${startdate}`,
            symbol: 'success',
            color: 'success'
          }
        },
        closingSoon: (end, now) => {
          const daysRemaining = parseInt(end.diff(now, 'days'))
          let label = `Open, closing today`
          if (daysRemaining > 1) {
            label = `Open, closing in ${daysRemaining} days`
          } else if (daysRemaining === 1) {
            label = `Open, closing in ${daysRemaining} day`
          }
          return {
            label: label,
            symbol: 'success',
            color: 'success'
          }
        }
      },
      srcSet: [
        { size: 'xs', height: 534, width: 764 },
        { size: 's', height: 200, width: 764 },
        { size: 'm', height: 232, width: 448 },
        { size: 'l', height: 232, width: 333 }
      ]
    }
  },
  methods: {
    modifiers (classPrefix = 'rpl-card') {
      return `${classPrefix}--${this.displayStyle.toLowerCase()}`
    }
  },
  computed: {
    grantStatusData () {
      if (this.isGrantOnGoing === '1') {
        return this.statusTerms.ongoing
      }
      return grantStatus(this.dateStart, this.dateEnd, false, this.statusTerms)
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
        'publication page',
        'profile: aboriginal honour roll',
        'profile: australia day ambassador',
        'profile: victorian design review panel',
        'profile: women\'s honour roll',
        'recommendation - family violence'
      ]

      if (this.contentType && validContentTypes.includes(this.contentType.toLowerCase())) {
        return true
      }
      return false
    },
    isContentTypeGrant () {
      return (this.isValidContentType && this.contentType.toLowerCase() === 'grant')
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
    },
    isMetaInfoNotEmpty () {
      return (this.contentTypeLabel || this.topicLabel || (this.grantStatusData && this.isContentTypeGrant) || this.fvRecommendationStatus || this.formattedDate || this.inductionYear)
    },
    computedImg () {
      if (!this.image) return ''
      return typeof this.image === 'string' ? { src: this.image } : this.image
    }
  }
}

export default card
