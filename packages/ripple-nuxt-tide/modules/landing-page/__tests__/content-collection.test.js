const ContentCollection = require('..//lib/content-collection.js')

describe('Content collection', () => {
  test('should have a title', () => {
    const cc = new ContentCollection({ title: 'Test' }, (dsl) => {})
    expect(cc.getTitle()).toEqual('Test')
  })

  test('should have a description', () => {
    const cc = new ContentCollection({ description: 'Test' }, (dsl) => {})
    expect(cc.getDescription()).toEqual('Test')
  })

  test('should have a call to action', () => {
    const cc = new ContentCollection({
      "callToAction": {
        "text": "View all",
        "url": "/search"
      }
    }, (dsl) => {})
    expect(cc.getCTA()).toEqual({ text: 'View all', url: '/search' })
  })

  test('should return ES DSL query for Custom', () => {
    const cc = new ContentCollection({
      "internal": {
        "custom": {
          "query": ['Data']
        }
      }
    }, (dsl) => {})
    expect(cc.getDSL()).toEqual({ query: ['Data'] })
  })

  test('should return ES DSL query for Content Types', () => {
    const cc = new ContentCollection({
      "internal": {
        "contentTypes": ["landing_page"]
      }
    }, (dsl) => {})
    expect(cc.getDSL()).toEqual({
      query: {
        bool: {
          filter: [
            { terms: { field_node_site: [ '4' ] } },
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
    }, (dsl) => {})
    expect(cc.getDSL()).toEqual({
      query: {
        bool: {
          filter: [
            { terms: { field_node_site: [ '4' ] } }
          ]
        }
      },
      sort: [
        { title: 'asc' }
      ]
    })
  })
})
