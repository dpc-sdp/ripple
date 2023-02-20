import path from 'node:path'
import { getLocal } from 'mockttp'
const rippleMockServer = async (
  fixtureFolder: string,
  routesPath: string,
  siteFixturePath: string
): Promise<void> => {
  const API_URL = process.env.API_URL ? parseInt(process.env.API_URL) : 3001

  const mockServer = getLocal()
  await mockServer.start(API_URL)
  console.info('starting mock server...', mockServer.url)

  /*
   * Mock site taxonomy
   */
  const mockSiteTaxonomy = await import(
    path.resolve(process.cwd(), `${siteFixturePath}`)
  )

  console.info(`Mocking site data: ${mockServer.url}/api/tide/site?id=8888`)
  await mockServer
    .forGet('/api/tide/site')
    .always()
    .withExactQuery(`?id=8888`)
    .thenJson(200, mockSiteTaxonomy)

  /*
   * Mock routes
   */
  const mockedRoutesPath = routesPath || '/mock-routes.json'
  const mockedRoutes = await import(
    path.resolve(process.cwd(), `${mockedRoutesPath}`)
  ).then((mdl) => mdl.default)

  for (let index = 0; index < mockedRoutes.length; index++) {
    const route = mockedRoutes[index]
    console.info(
      `Mocking route : ${mockServer.url}/api/tide/page?path=${route.path}&site=8888`
    )
    const fixture = await import(
      path.resolve(process.cwd(), `${fixtureFolder}/${route.fixture}`)
    ).then((mdl) => mdl.default)

    await mockServer
      .forGet('/api/tide/page')
      .always()
      .withExactQuery(`?path=${route.path}&site=8888`)
      .thenJson(200, fixture)
  }
  /*
   * Forward all other requests
   */
  await mockServer.forAnyRequest().thenForwardTo('http://localhost:3000')
}

export default rippleMockServer
