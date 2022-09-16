import { getLocal } from 'mockttp'
const mockServer = getLocal()

export default {
  async startMockServer() {
    const port = 3001
    try {
      if (mockServer.url) {
        await mockServer.stop()
        await mockServer.start(port)
        console.log(`Mock server running at : ${mockServer.url}`)
      }
    } catch (error) {
      console.log(error)
      await mockServer.start(port)
    }
    mockServer.forAnyRequest().thenForwardTo('http://localhost:3000')
    return mockServer.url
  },
  async setMockRoute({ route, status, response }) {
    const endpointMock = await mockServer
      .forGet(route)
      .always()
      .thenJson(status, response)

    return endpointMock
  },
  async setMockRouteWithQuery({ route, status, response, query }) {
    const endpointMock = await mockServer
      .forGet(route)
      .always()
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  },
  async setMockPostRouteWithQuery({ route, status, response, query }) {
    const endpointMock = await mockServer
      .forGet(route)
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  }
}
