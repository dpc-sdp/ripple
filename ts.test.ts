import { expect, describe, it } from 'vitest'
const reflect = (param: number) => param

describe('Suite config test', () => {
  const t = reflect(2)

  it('should return a number type', () => {
    expect(typeof t).toBe('number')
  })

  it('should return the value passed to it', () => {
    expect(t).toEqual(2)
  })
})
