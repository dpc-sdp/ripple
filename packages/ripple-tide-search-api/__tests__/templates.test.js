import coreTemplates from './../services/templates'

describe('Tide Search API built in templates', () => {
  test('should have site template', async () => {
    expect(coreTemplates).toHaveProperty('site')
    expect(coreTemplates.site).toHaveProperty('requestMapping')
    expect(typeof coreTemplates.site.requestMapping).toEqual('function')
  })

  test('should return basic request if no params sent', async () => {
    expect(coreTemplates.site.requestMapping()).toEqual({
      query: { match_all: {} }
    })
  })

  test('should return correct search query', async () => {
    const params = {
      q: 'test'
    }
    expect(coreTemplates.site.requestMapping(params)).toMatchSnapshot()
  })

  test('set type filter', async () => {
    const params = {
      type: 'test'
    }
    expect(coreTemplates.site.requestMapping(params)).toMatchSnapshot()
  })

  describe('filter', () => {
    test('should return correct terms filters', async () => {
      const params = {
        filters: {
          type: {
            values: ['event']
          }
        }
      }
      expect(coreTemplates.site.requestMapping(params)).toMatchSnapshot()
    })

    test('should return correct term filters', async () => {
      const params = {
        filters: {
          type: {
            values: 'event'
          }
        }
      }
      expect(coreTemplates.site.requestMapping(params)).toMatchSnapshot()
    })
  })

  describe('pagination', () => {
    test('should return size', async () => {
      const query = coreTemplates.site.requestMapping({
        limit: 9,
        page: 1
      })
      expect(query.size).toEqual(9)
    })

    test('should return from on page 2', async () => {
      const query = coreTemplates.site.requestMapping({
        limit: 4,
        page: 2
      })
      expect(query.size).toEqual(4)
      expect(query.from).toEqual(4)
    })

    test('should return paginated response on page 3', async () => {
      const query = coreTemplates.site.requestMapping({
        limit: 4,
        page: 3
      })
      expect(query.size).toEqual(4)
      expect(query.from).toEqual(8)
    })
  })
})
