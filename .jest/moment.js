const moment = require('moment-timezone')
jest.doMock('moment', () => {
  moment.tz.setDefault('Australia/Melbourne')
  return moment
})