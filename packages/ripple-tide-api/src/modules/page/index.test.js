import page from './index'
import utils from './../../mapping/utils'

describe('Page module', () => {
  test('has expected keys', () => {
    expect(page.hasOwnProperty('mapping')).toBe(true)
  })
  describe('Body', () => {
    test('returns html', () => {
      const result = page.mapping.body(
        {
          body: {
            processed: '<p>test</p>'
          }
        },
        utils
      )
      expect(result).toEqual('<p>test</p>')
    })
  })
})
