import { getQueryParams } from '../lib/data-list'

const data = {
  perPage: 10,
  currentPage: 1,
  sort: 'title',
  sortOptions: [{
    id: 'title',
    name: 'Title',
    order: 'asc'
  }],
  model: {
    search: 'Melbourne',
    status: ['Pending', 'Complete']
  },
  searchField: 'search',
  queryFields: ['title'],
  aggregationFields: ['status']
}

describe('getQueryParams', () => {
  const params = getQueryParams(data)

  test('should be sorting in ascending order by title', () => {
    expect(params.sort).toEqual({ title: 'asc' })
  })

  test('should return query field value when search field model is set', () => {
    expect(params.q).toEqual('Melbourne')
  })

  test('should return formatted filters with the search field value', () => {
    expect(params.filters.status.values).toContain('Pending')
  })
})
