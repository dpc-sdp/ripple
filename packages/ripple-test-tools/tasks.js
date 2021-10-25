const mockServer = require('mockttp').getLocal()
let momentNow
module.exports = {
  // dates
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
  },
  // mockserver
  async startMockServer () {
    const port = 3001
    try {
      if (mockServer.url) {
        await mockServer.stop()
        await mockServer.start(port)
        mockServer.enableDebug()
        return mockServer.url
      }
    } catch (error) {
      console.log(error)
      await mockServer.start(port)
      mockServer.enableDebug()
      return mockServer.url
    }
  },
  async setMockRoute ({ route, status, response }) {
    const endpointMock = await mockServer
      .get(route)
      .thenJson(status, response)

    return endpointMock
  },
  async setMockRouteWithQuery ({ route, status, response, query }) {
    const endpointMock = await mockServer
      .get(route)
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  },
  async setMockPostRouteWithQuery ({ route, status, response, query }) {
    const endpointMock = await mockServer
      .post(route)
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  }
}
