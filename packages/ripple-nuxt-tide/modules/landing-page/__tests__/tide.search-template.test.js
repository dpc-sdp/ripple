import searchTemplate from './../tide.search-template'
describe('Card collection search template', () => {
  test('should have template', () => {
    expect(searchTemplate).toHaveProperty('cards')
    expect(searchTemplate.cards).toHaveProperty('requestMapping')
    expect(typeof searchTemplate.cards.requestMapping).toEqual('function')
  })

  test('set default sort', async () => {
    const params = {
      sort: []
    }
    const query = searchTemplate.cards.requestMapping(params)
    expect(query.sort).toEqual([])
  })

  test('set sort key', async () => {
    const params = {
      sort: [
        {
          title: 'asc'
        }
      ]
    }
    const query = searchTemplate.cards.requestMapping(params)
    expect(query.sort).toEqual([{ title: 'asc' }])
  })

  test('Does not set site if it has already been specified in filters', async () => {
    const params = {
      filters: {
        field_topic: {
          operator: 'OR'
        },
        field_tags: {
          operator: 'OR'
        },
        field_node_site: {
          values: ['290'],
          operator: 'OR'
        }
      }
    }
    const query = searchTemplate.cards.requestMapping(params)
    expect(query.query.bool.filter.bool.must).toContainEqual({
      terms: { field_node_site: ['290'] }
    })
  })
})
