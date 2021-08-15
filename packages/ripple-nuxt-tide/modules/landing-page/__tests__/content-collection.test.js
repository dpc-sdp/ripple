const ContentCollection = require('..//lib/content-collection.js')

describe('Content collection', () => {
  test('should have a title', () => {
    const cc = new ContentCollection({ title: 'Test' })
    expect(cc.getTitle()).toEqual('Test')
  })

  test('should have a description', () => {
    const cc = new ContentCollection({ description: 'Test' })
    expect(cc.getDescription()).toEqual('Test')
  })

  test('should have a call to action', () => {
    const cc = new ContentCollection({
      "callToAction": {
        "text": "View all",
        "url": "/search"
      }
    })
    expect(cc.getCTA()).toEqual({ text: 'View all', url: '/search' })
  })

  test('should return ES DSL query for Custom', () => {
    const cc = new ContentCollection({
      "internal": {
        "custom": {
          "query": ['Data']
        }
      }
    })
    expect(cc.getSearchQuery()).toEqual({ query: ['Data'] })
  })

  test('should return ES DSL query for Content Types', () => {
    const cc = new ContentCollection({
      "internal": {
        "contentTypes": ["landing_page"]
      }
    })
    expect(cc.getSearchQuery()).toEqual({
      query: {
        bool: {
          filter: [
            { terms: { type: [ 'landing_page' ] } }
          ]
        }
      }
    })
  })

  test('should return ES DSL query for Sort', () => {
    const cc = new ContentCollection({
      "internal": {
        "sort": [ { "field": "title", "direction": "asc" } ]
      }
    })
    expect(cc.getSearchQuery()).toEqual({
      sort: [
        { title: 'asc' }
      ]
    })
  })
})
