import { getLocal } from 'mockttp'
const mockServer = getLocal({ cors: true })

export default {
  async startMockServer(proxy = false) {
    const port = 3001
    try {
      if (mockServer.url) {
        await mockServer.stop()
        await mockServer.start(port)
        console.log(`Mock server running at : ${mockServer.url}`)
      }
    } catch (error) {
      await mockServer.start(port)
    }
    if (proxy) {
      mockServer.forAnyRequest().thenForwardTo('http://localhost:3000')
    }
    return mockServer.url
  },
  async stopMockServer() {
    try {
      await mockServer.stop()
      return true
    } catch (error) {
      return false
    }
  },
  async setMockRoute({ route, status, response }) {
    const endpointMock = await mockServer
      .forGet(route)
      .thenJson(status, response)

    return endpointMock
  },
  async setMockRouteWithQuery({ route, status, response, query }) {
    const endpointMock = await mockServer
      .forGet(route)
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  },

  async setMockPostRouteWithQuery({ route, status, response, query }) {
    const endpointMock = await mockServer
      .forPost(route)
      .withExactQuery(query)
      .thenJson(status, response, {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': '*',
        'access-control-allow-methods': '*'
      })
    return endpointMock
  }
}
