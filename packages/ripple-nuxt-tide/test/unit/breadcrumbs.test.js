import { breadcrumbs } from '../../lib/core/breadcrumbs'

const nestedMenu = [
  {
    text: 'Alpha 1',
    url: '/alpha-1',
    children: [
      {
        text: 'Alpha 2',
        url: '/alpha-2',
        children: [
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
    children: [
      {
        text: 'Beta 2',
        url: '/beta-2',
        children: [
          {
            text: 'Beta 3',
            url: '/beta-3'
          }
        ]
      }
    ]
  }
]

describe('breadcrumbs', () => {
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

    const result = breadcrumbs('/alpha-3', 'Alpha 3', nestedMenu)

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

    const result = breadcrumbs('/beta-2', 'Beta 2', nestedMenu)
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

    const result = breadcrumbs('/alpha-1', 'Alpha 1', nestedMenu)
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

    const result = breadcrumbs('/unfound-path', 'Unfound Path', nestedMenu)
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

    const result = breadcrumbs('/null-menu', 'Null Menu', null)
    expect(result).toEqual(expectedResult)
  })
})
