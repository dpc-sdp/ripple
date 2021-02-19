import { tide } from '../../lib/core'
import * as helper from '../../lib/core/tide-helper'

// Mock axios and API response
const mockAxios = {
  $get: jest.fn(() => Promise.resolve({ data: {} }))
}

const site = 1
const config = {
  modules: {
    page: 1,
    event: 0,
    profile: {
      route: '/profiles'
    }
  }
}

const tideApi = tide(mockAxios, site, config)

describe('tide helpers', () => {
  test('should able merge includes configs', () => {
    const includesA = {
      test1: [
        'field_a',
        'field_b',
        'field_c'
      ],
      test2: [
        'field_a',
        'field_f',
        'field_g'
      ]
    }

    const includesB = {
      test1: [
        'field_d',
        'field_e'
      ],
      test3: [
        'field_a',
        'field_z'
      ]
    }

    const ExpectedIncludes = {
      test1: [
        'field_a',
        'field_b',
        'field_c',
        'field_d',
        'field_e'
      ],
      test2: [
        'field_a',
        'field_f',
        'field_g'
      ],
      test3: [
        'field_a',
        'field_z'
      ]
    }

    const mergedIncludes = helper.mergeIncludes(includesA, includesB)
    expect(mergedIncludes).toEqual(ExpectedIncludes)
  })

  test('should able to get resource from link', () => {
    const link = 'https://example.com/api/v1/route?site=4&path=%2Fpager-test'
    const resource = 'route?site=4&path=%2Fpager-test'
    const result = helper.jsonApiLinkToResource(link, '/api/v1/')
    expect(resource).toBe(result)

    const linkObj = { href: 'https://example.com/api/v1/route?site=4&path=%2Fpager-test' }
    const resource2 = 'route?site=4&path=%2Fpager-test'
    const result2 = helper.jsonApiLinkToResource(linkObj, '/api/v1/')
    expect(resource2).toBe(result2)
  })

  test('should able to convert metatag to a object', () => {
    const metatagNomalized = [
      {
        tag: 'meta',
        attributes: {
          name: 'title',
          content: 'vic.gov.au'
        }
      },
      {
        tag: 'link',
        attributes: {
          rel: 'canonical',
          href: 'http://content-vic.docker.amazee.io/taxonomy/term/4'
        }
      }
    ]

    const result = {
      title: 'vic.gov.au',
      canonical: 'http://content-vic.docker.amazee.io/taxonomy/term/4'
    }
    const metatag = helper.metatagConverter(metatagNomalized)
    expect(metatag).toEqual(result)

    const emptyMetatag = []
    const metatag2 = helper.metatagConverter(emptyMetatag)
    expect(metatag2).toEqual({})
  })

  test('should able to get header config', () => {
    const headData = {
      langcode: 'en',
      title: 'Test title',
      description: 'Test description',
      url: 'https://www.vic.gov.au',
      image: 'https://www.vic.gov.au/Melbourne-tram.jpg',
      imageAlt: 'Demo: Melbourne tram',
      imageTwitter: 'https://www.vic.gov.au/Melbourne-tram-Twitter.jpg',
      imageTwitterAlt: 'Demo: Twitter Melbourne tram',
      siteSectionName: '',
      pageType: 'landing_page',
      robotsMeta: 'noindex'
    }

    const result = {
      htmlAttrs: { lang: 'en' },
      title: 'Test title',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'Test description'
        },
        { property: 'og:title', hid: 'og:title', content: 'Test title' },
        {
          property: 'og:description',
          hid: 'og:description',
          content: 'Test description'
        },
        { property: 'og:type', hid: 'og:type', content: 'website' },
        {
          property: 'og:url',
          hid: 'og:url',
          content: 'https://www.vic.gov.au'
        },
        {
          property: 'og:image',
          hid: 'og:image',
          content: 'https://www.vic.gov.au/Melbourne-tram.jpg'
        },
        {
          property: 'og:image:alt',
          hid: 'og:image:alt',
          content: 'Demo: Melbourne tram'
        },
        { name: 'twitter:card', hid: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:site',
          hid: 'twitter:site',
          content: 'https://www.vic.gov.au'
        },
        {
          name: 'twitter:title',
          hid: 'twitter:title',
          content: 'Test title'
        },
        {
          name: 'twitter:description',
          hid: 'twitter:description',
          content: 'Test description'
        },
        {
          name: 'twitter:image',
          hid: 'twitter:image',
          content: 'https://www.vic.gov.au/Melbourne-tram-Twitter.jpg'
        },
        {
          name: 'twitter:image:alt',
          hid: 'twitter:image:alt',
          content: 'Demo: Twitter Melbourne tram'
        },
        { name: 'sitesection', content: '' },
        { name: 'content-type', content: 'landing_page' },
        { name: 'robots', content: 'noindex' }
      ]
    }
    const headconfig = helper.getPageHeadConfig(headData)
    expect(headconfig).toEqual(result)
  })

  describe('pathToClass', () => {
    /* eslint-disable indent */
    test.each`
      path                                | expected
      ${'/test-path'}                     | ${'test_path'}
      ${'/first-home-buyers-checklist'}   | ${'first_home_buyers_checklist'}
      ${'/~!@#$%^&*()_+=?'}               | ${'_'}
    `('returns $expected for $path', ({ path, expected }) => {
      expect(helper.pathToClass(path)).toBe(expected)
    })
    /* eslint-enable indent */
  })

  describe('stringToClass', () => {
    /* eslint-disable indent */
    test.each`
      text                                                | expected
      ${'Anchor&nbsp;&amp;&nbsp;&copy;&nbsp;Link'}        | ${'anchor-link'}
      ${'Anchor`~!@#$%^&*()-_=+{}[]\\|;:\'"<>,.?/\nLink'} | ${'anchor-link'}
      ${'   ANCHOR   LINK   '}                            | ${'anchor-link'}
      ${'1234567890'}                                     | ${'1234567890'}
    `('returns $expected for $text', ({ text, expected }) => {
      expect(helper.stringToClass(text)).toBe(expected)
    })
    /* eslint-enable indent */
  })
})

describe('tide', () => {
  test('should get data from API', async () => {
    const resp = { data: [{ id: 1 }] }
    mockAxios.$get.mockResolvedValue(resp)

    expect.assertions(1)
    const resource = 'node/page'
    const data = (await tideApi.get(resource)).data
    expect(data).toBe(resp.data)
  })

  test('should get data by path', async () => {
    const resp = { uuid: '123' }
    mockAxios.$get.mockResolvedValue(resp)

    expect.assertions(1)
    const path = '/test-path'
    const data = (await tideApi.getPathData(path))
    expect(data).toBe(resp)
  })

  test('should get 404 for a not exist path', async () => {
    const error = {
      response: {
        status: 404
      }
    }
    mockAxios.$get.mockRejectedValue(error)

    const pathNotExist = '/no-such-page'
    let hasError = false
    try {
      await tideApi.getPathData(pathNotExist)
    } catch (e) {
      hasError = true
    }
    expect(hasError).toBeTruthy()
  })

  test('should get page data by path', async () => {
    const respPath = { data: {} }
    const respEntity = {
      data: {
        type: 'node--page',
        id: 123,
        links: {
          self: 'https://api.test/api/v1/node/page/123'
        }
      }
    }
    tideApi.getPathData = jest.fn(() => Promise.resolve(respPath))
    tideApi.getEntityByPathData = jest.fn(() => Promise.resolve(respEntity))

    expect.assertions(1)
    const path = '/test-path'
    const data = await tideApi.getPageByPath(path)
    expect(data.id).toBe(123)
  })

  test('should get list', async () => {
    const resp = {
      data: [
        {
          type: 'node--event',
          id: '1'
        }, {
          type: 'node--event',
          id: '2'
        }
      ]
    }
    mockAxios.$get = jest.fn(() => Promise.resolve(resp))

    expect.assertions(1)
    const data = await tideApi.getContentList('event')
    expect(Array.isArray(data)).toBe(true)
  })

  test('should get paginated data', async () => {
    mockAxios.$get = jest.fn((url) => {
      switch (url) {
        case '/api/v1/test/?p2':
          return Promise.resolve({
            'data': [4, 5, 6],
            'links': {
              'self': 'https://mockAPI/api/v1/test/?p2',
              'next': 'https://mockAPI/api/v1/test/?p3',
              'last': 'https://mockAPI/api/v1/test/?p3'
            }
          })

        case '/api/v1/test/?p3' :
          return Promise.resolve({
            'data': [7, 8],
            'links': {
              'self': 'https://mockAPI/api/v1/test/?p3',
              'last': 'https://mockAPI/api/v1/test/?p3'
            }
          })
      }
    })

    const response = {
      'data': [1, 2, 3],
      'links': {
        'self': 'https://mockAPI/api/v1/test/?p1',
        'next': 'https://mockAPI/api/v1/test/?p2',
        'last': 'https://mockAPI/api/v1/test/?p3'
      }
    }

    expect.assertions(1)
    const data = await tideApi.getAllPaginatedData(response, false)
    expect(data).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  test('should handle paginated data response error', async () => {
    mockAxios.$get = jest.fn((url) => {
      switch (url) {
        case '/api/v1/test/?p2':
          return Promise.resolve({
            'data': [4, 5, 6],
            'links': {
              'self': 'https://mockAPI/api/v1/test/?p2',
              'next': 'https://mockAPI/api/v1/test/?p3',
              'last': 'https://mockAPI/api/v1/test/?p3'
            }
          })

        case '/api/v1/test/?p3' :
          return Promise.reject(new Error('something bad happened'))
      }
    })

    const response = {
      'data': [1, 2, 3],
      'links': {
        'self': 'https://mockAPI/api/v1/test/?p1',
        'next': 'https://mockAPI/api/v1/test/?p2',
        'last': 'https://mockAPI/api/v1/test/?p3'
      }
    }

    expect.assertions(1)
    const data = await tideApi.getAllPaginatedData(response, false)
    expect(data).toBeInstanceOf(Error)
  })

  test('should get tide module enabled status', () => {
    const profileStatus = tideApi.isModuleEnabled('profile')
    expect(profileStatus).toBe(true)
    const pageStatus = tideApi.isModuleEnabled('page')
    expect(pageStatus).toBe(true)
    const eventStatus = tideApi.isModuleEnabled('event')
    expect(eventStatus).toBe(false)
  })

  test('should get tide module config', () => {
    const profileConfig = {
      route: '/profiles'
    }

    const config = tideApi.getModuleConfig('profile')
    expect(config).toEqual(profileConfig)

    const emptyConfig = tideApi.getModuleConfig('page')
    expect(emptyConfig).toEqual({})
  })
})
