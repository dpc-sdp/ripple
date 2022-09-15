/* eslint-disable */
const mockServer = require('mockttp').getLocal()
const setupMockServer = async () => {
  const API_URL = parseInt(process.env.API_URL) || 3001
  await mockServer.start(API_URL)

  console.log('starting mock server...', mockServer.url)

  await mockServer
    .forGet('/api/tide/page')
    .always()
    .withExactQuery('?path=/&site=8888')
    .thenJson(200, require('./test/fixtures/landingpage/home.json'))

  await mockServer.forAnyRequest().thenForwardTo('http://localhost:3000')
}

setupMockServer()
