/* eslint-disable */
const mockServer = require('mockttp').getLocal()

const mockedRoutes = require('./mock-routes.json')
const mockSiteTaxonomy = require(`./test/fixtures/site/large-menu.json`)

const setupMockServer = async () => {
  const API_PORT = parseInt(process.env.API_PORT) || 3001
  await mockServer.start(API_PORT)

  console.log('starting mock server...', mockServer.url)

  console.log(`Mocking site data: ${mockServer.url}/api/tide/site`)
  await mockServer
    .forGet('/api/tide/site')
    .always()
    .thenJson(200, mockSiteTaxonomy)

  for (let index = 0; index < mockedRoutes.length; index++) {
    const route = mockedRoutes[index]
    console.log(
      `Mocking route : ${mockServer.url}/api/tide/page?path=${route.path}`
    )
    await mockServer
      .forGet('/api/tide/page')
      .always()
      .withExactQuery(`?path=${route.path}`)
      .thenJson(200, require(`./test/fixtures/${route.fixture}`))
  }

  await mockServer.forAnyRequest().thenForwardTo('http://localhost:3000')
}

setupMockServer()
