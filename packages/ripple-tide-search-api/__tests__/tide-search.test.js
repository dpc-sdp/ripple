import TideSearch from '../services/tide-search'
const { Client } = require('@elastic/elasticsearch')
const Mock = require('@elastic/elasticsearch-mock')

describe('Tide Search service', () => {
  test('should throw error if not configured', async () => {
    expect(() => new TideSearch()).toThrow('No configuration specified')
  })
  test('should throw error if configured without client', async () => {
    expect(() => new TideSearch({})).toThrow('No search configuration specified')
  })
  test('should be able to pass in custom client', async () => {
    const mock = new Mock()
    const client = new Client({
      node: 'http://localhost:9200',
      Connection: mock.getConnection()
    })
    const config = {
      client: client
    }
    const tideSearchApi = new TideSearch(config)
    expect(tideSearchApi).toHaveProperty('client')
  })

  test('should set tide config correctly', async () => {
    const config = {
      tide: {
        site: 4,
        search: {
          index: 'SEARCHINDEX',
          url: 'http://SEARCHURL.com',
          auth: {
            username: 'USERNAME',
            password: 'PASSWORD'
          }
        }
      }
    }
    const tideSearchApi = new TideSearch(config)
    expect(tideSearchApi).toHaveProperty('client')
  })

  describe('Search', () => {
    test('should return an ok response', async () => {
      const mock = new Mock()
      const config = {
        index: 'indexName',
        client: new Client({
          node: 'http://localhost:9200',
          Connection: mock.getConnection()
        })
      }
      mock.add({
        method: 'POST',
        path: '/indexName/_search'
      }, () => {
        return { status: 'ok' }
      })
      const tideSearchApi = new TideSearch(config)
      const response = await tideSearchApi.search({
        query: {
          match_all: {}
        }
      }, {})
      expect(response.body.status).toEqual('ok')
      expect(response.statusCode).toEqual(200)
    })
  })
  describe('getQuery', () => {
    test('should return a built in template', async () => {
      const mock = new Mock()
      const config = {
        index: 'indexName',
        client: new Client({
          node: 'http://localhost:9200',
          Connection: mock.getConnection()
        })
      }
      const tideSearchApi = new TideSearch(config)
      const template = await tideSearchApi.getQuery('site', {})
      expect(template).toEqual({
        query: {
          bool: {
            match_all: {}
          }
        }
      })
    })

    test('should return a template from function', async () => {
      const mockReqMapping = jest.fn()
      const mock = new Mock()
      const config = {
        index: 'indexName',
        templates: {
          test: {
            requestMapping: mockReqMapping
          }
        },
        client: new Client({
          node: 'http://localhost:9200',
          Connection: mock.getConnection()
        })
      }
      const tideSearchApi = new TideSearch(config)
      tideSearchApi.getQuery('test', {})
      expect(mockReqMapping).toBeCalled()
    })
  })
})
