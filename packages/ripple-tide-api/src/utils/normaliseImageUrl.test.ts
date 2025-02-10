import { expect, describe, it } from 'vitest'

import normaliseImageUrl from './normaliseImageUrl.js'

describe('normaliseImageUrl(baseUrl, imageUrl)', () => {
  it(`does not change a url if it already points to the base url`, () => {
    expect(
      normaliseImageUrl(
        'https://example.com',
        'https://example.com/sites/default/files/wow/cool.jpg?some=param'
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it(`normalises a relative url`, () => {
    expect(
      normaliseImageUrl(
        'https://example.com',
        '/sites/default/files/wow/cool.jpg?some=param'
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it(`normalises a absolute url with a different host`, () => {
    expect(
      normaliseImageUrl(
        'https://example.com',
        'https://different.com/sites/default/files/wow/cool.jpg?some=param'
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it(`handles a base url with trailing slash correctly`, () => {
    expect(
      normaliseImageUrl(
        'https://example.com/',
        'https://different.com/sites/default/files/wow/cool.jpg?some=param'
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it(`ignores an absolute url if it does match /sites/default/files`, () => {
    expect(
      normaliseImageUrl(
        'https://example.com',
        'https://different.com/sites/different/files/wow/cool.jpg?some=param'
      )
    ).toEqual(
      'https://different.com/sites/different/files/wow/cool.jpg?some=param'
    )
  })

  it(`ignores a relative url if it does match /sites/default/files`, () => {
    expect(
      normaliseImageUrl(
        'https://example.com',
        '/sites/different/files/wow/cool.jpg?some=param'
      )
    ).toEqual('/sites/different/files/wow/cool.jpg?some=param')
  })
})
