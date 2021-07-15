import dayjs from "dayjs"

const formatdate = {
  props: {
    locale: { default: 'en-au', type: String },
    rangeDivider: { default: ' to ', type: String }

  },
  methods: {
    formatDate: function (date, format) {
      format = (format === undefined) ? 'DD MMMM' : format
      dayjs.locale(this.locale)
      return dayjs(date).format(format)
    },
    formatDateRange: function (dateStart, dateEnd, format = { day: 'DD', month: 'MMMM', year: 'YYYY' }) {
      dayjs.locale(this.locale)
      let rtn = ''
      const start = dayjs(dateStart)
      const end = dayjs(dateEnd)
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
