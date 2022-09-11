/// <reference types="cypress" />
import { getAdminServer } from 'mockttp'

const mockServerManager = getAdminServer()
const mockServer = mockServerManager.start()

// Probably not necessary
process.on('SIGINT', function () {
  mockServer.stop().then(() => {
    console.info('\nMock server manager was gracefully shut down')
    process.exit()
  })
})

Cypress.Commands.add('startMockServer', async () => {
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
})

Cypress.Commands.add('setMockRoute', async ({ route, status, response }) => {
  const endpointMock = await mockServer.get(route).thenJson(status, response)

  return endpointMock
})

Cypress.Commands.add(
  'setMockRouteWithQuery',
  async ({ route, status, response, query }) => {
    const endpointMock = await mockServer
      .get(route)
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  }
)

Cypress.Commands.add(
  'setMockPostRouteWithQuery',
  async ({ route, status, response, query }) => {
    const endpointMock = await mockServer
      .post(route)
      .withExactQuery(query)
      .thenJson(status, response)
    return endpointMock
  }
)
