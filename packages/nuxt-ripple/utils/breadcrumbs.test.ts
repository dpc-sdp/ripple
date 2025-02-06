import { expect, describe, test } from 'vitest'
import { getBreadcrumbs } from './breadcrumbs.js'

const nestedMenu = [
  {
    text: 'Alpha 1',
    url: '/alpha-1',
    items: [
      {
        text: 'Alpha 2',
        url: '/alpha-2',
        items: [
          {
            text: 'Alpha 3',
            url: '/alpha-3'
          }
        ]
      }
    ]
  },
  {
    text: 'Beta 1',
    url: '/beta-1',
    items: [
      {
        text: 'Beta 2',
        url: '/beta-2',
        items: [
          {
            text: 'Beta 3',
            url: '/beta-3'
          }
        ]
      }
    ]
  }
]

describe('getBreadcrumbs', () => {
  test('should get trail for level 3 path', async () => {
    const expectedResult = [
      {
        text: 'Home',
        url: '/'
      },
      {
        text: 'Alpha 1',
        url: '/alpha-1'
      },
      {
        text: 'Alpha 2',
        url: '/alpha-2'
      },
      {
        text: 'Alpha 3',
        url: '/alpha-3'
      }
    ]

    const result = getBreadcrumbs('/alpha-3', 'Alpha 3', nestedMenu)

    expect(result).toEqual(expectedResult)
  })

  test('should get trail for level 2 path', async () => {
    const expectedResult = [
      {
        text: 'Home',
        url: '/'
      },
      {
        text: 'Beta 1',
        url: '/beta-1'
      },
      {
        text: 'Beta 2',
        url: '/beta-2'
      }
    ]

    const result = getBreadcrumbs('/beta-2', 'Beta 2', nestedMenu)
    expect(result).toEqual(expectedResult)
  })

  test('should get trail for level 1 path', async () => {
    const expectedResult = [
      {
        text: 'Home',
        url: '/'
      },
      {
        text: 'Alpha 1',
        url: '/alpha-1'
      }
    ]

    const result = getBreadcrumbs('/alpha-1', 'Alpha 1', nestedMenu)
    expect(result).toEqual(expectedResult)
  })

  test('should get trail for unfound path', async () => {
    const expectedResult = [
      {
        text: 'Home',
        url: '/'
      },
      {
        text: 'Unfound Path',
        url: '/unfound-path'
      }
    ]

    const result = getBreadcrumbs('/unfound-path', 'Unfound Path', nestedMenu)
    expect(result).toEqual(expectedResult)
  })

  test('should get trail for null menu', async () => {
    const expectedResult = [
      {
        text: 'Home',
        url: '/'
      },
      {
        text: 'Null Menu',
        url: '/null-menu'
      }
    ]

    const result = getBreadcrumbs('/null-menu', 'Null Menu', null)
    expect(result).toEqual(expectedResult)
  })

  test('should ignore site id when evaluating activepath', async () => {
    const expectedResult = [
      {
        text: 'Home',
        url: '/'
      },
      {
        text: 'Alpha 1',
        url: '/alpha-1'
      },
      {
        text: 'Alpha 2',
        url: '/alpha-2'
      },
      {
        text: 'Alpha 3',
        url: '/site-123/alpha-3'
      }
    ]
    const testMenu = JSON.parse(JSON.stringify(nestedMenu))
    testMenu[0].items[0].items[0].url = '/site-123/alpha-3'

    const result = getBreadcrumbs('/alpha-3', 'Alpha 3', testMenu)
    expect(result).toEqual(expectedResult)
  })
})
