import { capitalize } from './../utils/helpers'

describe('RplGlobal Utilities', () => {
  describe('Capitalize a string', () => {
    test('should set the first letter to capital', () => {
      expect(capitalize('quos alias tempore suscipit ex.')).toEqual('Quos alias tempore suscipit ex.')
    })
    test('should handle non strings', () => {
      expect(capitalize(undefined)).toEqual('')
      expect(capitalize(null)).toEqual('')
      expect(capitalize('')).toEqual('')
      expect(capitalize(213)).toEqual('')
    })
  })
})
