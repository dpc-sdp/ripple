import moment from 'moment'

const formatdate = {
  props: {
    locale: { default: 'en-au', type: String }
  },
  methods: {
    formatDate: function (date, format) {
      format = (format === undefined) ? 'DD MMMM' : format
      moment.locale(this.locale)
      return moment(date).format(format)
    }
  }
}

export default formatdate
