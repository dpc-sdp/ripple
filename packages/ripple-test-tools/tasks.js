let momentNow
module.exports = {
  stubDate (datetime) {
    const moment = require('moment')
    momentNow = moment.now
    moment.now = function () {
      return +new Date(datetime)
    }
    return null
  },
  resetDate () {
    const moment = require('moment')
    moment.now = momentNow
    return null
  }
}
