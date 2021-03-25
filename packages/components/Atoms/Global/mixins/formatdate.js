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
    formatDateRange: function (dateStart, dateEnd, format = { day: 'DD', month: 'MMMM', year: 'YYYY' }) {
      moment.locale(this.locale)
      let rtn = ''
      const start = moment(dateStart)
      const end = moment(dateEnd)
      if (start.isSame(end, 'day')) {
        rtn = this.formatDate(start)
      } else if (start.isSame(end, 'month')) {
        rtn = `${start.format(`${format.day}`)}${this.rangeDivider}${end.format(`${format.day} ${format.month}`)}`
      } else if (start.isSame(end, 'year')) {
        rtn = `${start.format(`${format.day} ${format.month}`)}${this.rangeDivider}${end.format(`${format.day} ${format.month} ${format.year}`)}`
      } else {
        rtn = `${start.format(`${format.day} ${format.month} ${format.year}`)}${this.rangeDivider}${end.format(`${format.day} ${format.month} ${format.year}`)}`
      }
      return rtn
    }
  }
}

export default formatdate
