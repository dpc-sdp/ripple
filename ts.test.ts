import { expect, describe } from '@jest/globals'
const reflect = (param: number) => param

describe('Functional test', () => {
  const t = reflect(2)

  it('should return a number type', () => {
    expect(typeof t).toBe('number')
  })

  it('should return the value passed to it', () => {
    expect(t).toEqual(2)
  })
})
