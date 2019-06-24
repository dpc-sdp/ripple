import moment from 'moment'

const formatdate = {
  props: {
    locale: { default: 'en-au', type: String },
    rangeDivider: { default: ' to ', type: String }
  },
  methods: {
    formatDate: function (date, format) {
      format = (format === undefined) ? 'DD MMMM' : format
      moment.locale(this.locale)
      return moment(date).format(format)
    },
    formatDateRange: function (dateStart, dateEnd) {
      moment.locale(this.locale)
      let rtn = ''
      const start = moment(dateStart)
      const end = moment(dateEnd)
      if (start.isSame(end, 'day')) {
        rtn = this.formatDate(start)
      } else if (start.isSame(end, 'month')) {
        rtn = `${start.format('DD')}${this.rangeDivider}${end.format('DD MMMM')}`
      } else if (start.isSame(end, 'year')) {
        rtn = `${start.format('DD MMMM')}${this.rangeDivider}${end.format('DD MMMM YYYY')}`
      } else {
        rtn = `${start.format('DD MMMM YYYY')}${this.rangeDivider}${end.format('DD MMMM YYYY')}`
      }
      return rtn
    }
  }
}

export default formatdate
