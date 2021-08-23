import TideApi from './../tide-api'

describe('TideApi', () => {
  describe('Initializes', () => {
    test('should throw an error if no config', () => {
      expect(() => new TideApi()).toThrow('No configuration specified')
    })
  })
})
