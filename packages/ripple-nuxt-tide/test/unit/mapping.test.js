import { Mapping, tide } from '../../lib/core'

// Mock Tide API and testFetcher
const tideSite = 1
const tideConfig = {}
const mockAxios = {}
let tideApi = tide(mockAxios, tideSite, tideConfig)
tideApi.testFetcher = jest.fn((a, b) => Promise.resolve([1, 2, 3, 4]))
tideApi.testRejectedFetcher = jest.fn((a, b) => Promise.reject(new Error('fail')))

describe('mapping', () => {
  const config = {
    extendConfigs: [],

    extendFilters: [],

    customConfig: {
      mapping: {
        testField: {
          testItem: {
            component: 'rpl-test-component',
            props: {
              a: 'a',
              b: ['b'],
              c: ['c', 'ca', 'caa'],
              d: [
                ['d', 'da', 'daa'],
                ['d', 'da', 'dab']
              ],
              e: {
                field: 'e',
                filters: ['testFilter']
              },
              f: {
                filters: ['testFilter']
              },
              g: 'g'
            },
            cols: {
              wide: { l: 6 },
              narrow: {}
            },
            class: ['test-class-a', 'test-class-b']
          },

          testUndefinedFilter: {
            component: 'rpl-test-component',
            props: {
              a: {
                field: 'a',
                filters: ['undefinedFilter']
              },
              b: 'b'
            }
          },

          testFetchItem: {
            component: 'rpl-test-fetch-component',
            props: {
              a: {
                fetcher: {
                  method: 'testFetcher',
                  args: ['a', 'b']
                },
                filters: ['testAsyncFilter']
              }
            }
          },

          testFetchItem2: {
            component: 'rpl-test-fetch-component-2',
            props: {
              a: {
                fetcher: {
                  method: 'testRejectedFetcher',
                  args: ['a', 'b']
                },
                filters: ['testAsyncFilter']
              }
            }
          },

          testOneToMultiple: {
            expression: (item) => {
              return item.b
            },

            components: [
              {
                case: 'alpha',
                component: 'rpl-test-one2multiple-alpha',
                props: {
                  a: 'a'
                }
              },
              {
                case: 'beta',
                component: 'rpl-test-one2multiple-beta',
                props: {
                  a: 'a'
                }
              }
            ]
          }
        }
      }
    },

    customFilters: {
      testFilter: (field) => {
        return `${field} has been filtered`
      },

      testAsyncFilter: async (fetchResult) => {
        try {
          const res = await fetchResult
          return res.map(item => item * 2)
        } catch (err) {
          return []
        }
      }
    }
  }

  test('should get single component by given a single item', async () => {
    const mapping = new Mapping(config)
    expect.assertions(1)

    const item = {
      type: 'testItem',
      a: 'value a',
      b: 'value b',
      c: {
        ca: {
          caa: 'value c'
        }
      },
      d: {
        da: {
          // daa property is undefinded.
          dab: 'value d'
        }
      },
      e: 'value e',
      f: 'value f'
    }

    const components = {
      name: 'rpl-test-component',
      data: {
        a: 'value a',
        b: 'value b',
        c: 'value c',
        d: 'value d',
        e: 'value e has been filtered',
        f: '[object Object] has been filtered',
        g: null
      },
      class: ['test-class-a', 'test-class-b'],
      childCols: {},
      cols: {
        wide: { l: 6 },
        narrow: {}
      },
      ssr: true
    }

    const result = await mapping.get(item, 'testField')
    expect(result).toEqual(components)
  })

  test('should get an array of components by given an array of items', async () => {
    const mapping = new Mapping(config)
    expect.assertions(1)

    const item = [{
      type: 'testItem',
      a: 'value a'
    }]

    const components = [{
      name: 'rpl-test-component',
      data: {
        a: 'value a',
        b: null,
        c: null,
        d: null,
        e: null,
        f: '[object Object] has been filtered',
        g: null
      },
      class: ['test-class-a', 'test-class-b'],
      childCols: {},
      cols: {
        wide: { l: 6 },
        narrow: {}
      },
      ssr: true
    }]

    const result = await mapping.get(item, 'testField')
    expect(result).toEqual(components)
  })

  test('should get error by given a item not in mapping config', async () => {
    const mapping = new Mapping(config)
    expect.assertions(2)

    const item = {
      type: 'testItemNotMapped'
    }

    try {
      // Test single mode
      await mapping.get(item, 'testField')
    } catch (e) {
      expect(e).toEqual(new Error('Mapping failed to get result.'))
    }

    // Test array mode
    const result = await mapping.get([item], 'testField')
    expect(result).toEqual([])
  })

  test('should get error by given an undefined filter in mapping config', async () => {
    const mapping = new Mapping(config)
    expect.assertions(2)

    const item = {
      type: 'testUndefinedFilter',
      a: 'value a',
      b: 'value b'
    }

    try {
      // Test single mode
      await mapping.get(item, 'testField')
    } catch (e) {
      expect(e).toEqual(new Error('Mapping filter "undefinedFilter" is not a function or not defined.'))
    }

    try {
      // Test array mode
      await mapping.get([item], 'testField')
    } catch (e) {
      expect(e).toEqual(new Error('Mapping filter "undefinedFilter" is not a function or not defined.'))
    }
  })

  test('should get error by given a mapping group type not in mapping config', async () => {
    const mapping = new Mapping(config)
    expect.assertions(1)

    const item = {
      type: 'testItem'
    }

    try {
      await mapping.get(item, 'groupTypeNotMapped')
    } catch (e) {
      expect(e).toEqual(new TypeError(`Cannot read property 'testItem' of undefined`))
    }
  })

  test('should get an data from Tide if there is a fetcher', async () => {
    const mapping = new Mapping(config, tideApi)
    expect.assertions(1)

    const item = [{
      type: 'testFetchItem'
    }]

    const components = [{
      name: 'rpl-test-fetch-component',
      data: {
        a: [2, 4, 6, 8]
      },
      class: [],
      childCols: {},
      cols: {},
      ssr: true
    }]

    const result = await mapping.get(item, 'testField')
    expect(result).toEqual(components)
  })

  test('should still get resolved if fetcher failed', async () => {
    const mapping = new Mapping(config, tideApi)
    expect.assertions(1)

    const item = [{
      type: 'testFetchItem2'
    }]

    const components = [{
      name: 'rpl-test-fetch-component-2',
      data: {
        a: []
      },
      class: [],
      childCols: {},
      cols: {},
      ssr: true
    }]

    const result = await mapping.get(item, 'testField')
    expect(result).toEqual(components)
  })

  test('should be able to map to multiple components based on condition', async () => {
    const mapping = new Mapping(config)
    expect.assertions(1)

    const item = {
      type: 'testOneToMultiple',
      a: 'value a',
      b: 'beta'
    }

    const components = {
      name: 'rpl-test-one2multiple-beta',
      data: {
        a: 'value a'
      },
      class: [],
      childCols: {},
      cols: {},
      ssr: true
    }

    const result = await mapping.get(item, 'testField')
    expect(result).toEqual(components)
  })
})
