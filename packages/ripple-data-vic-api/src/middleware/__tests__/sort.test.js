import { sortByField } from './../sort'

describe('sortByField', () => {
  test('should return null values last', () => {
    const testData = [{ fieldName: null }, { fieldName: 'b' }, { fieldName: 'a' }]
    const result = sortByField(testData, 'fieldName', 'asc')
    expect(result).toEqual([{ fieldName: 'a' }, { fieldName: 'b' }, { fieldName: null }])
  })
  test('should sort numbers correctly', () => {
    const testData = [{ fieldName: '10' }, { fieldName: 2 }, { fieldName: '3' }]
    const result = sortByField(testData, 'fieldName', 'asc')
    expect(result).toEqual([{ fieldName: 2 }, { fieldName: '3' }, { fieldName: '10' }])
  })
})
