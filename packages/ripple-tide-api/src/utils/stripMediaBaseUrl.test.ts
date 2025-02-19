import { expect, describe, it } from 'vitest'

import stripMediaBaseUrl from './stripMediaBaseUrl.js'

describe('stripMediaBaseUrl(url, baseUrl)', () => {
  it('strips the supplied baseUrl from the main url', () => {
    expect(
      stripMediaBaseUrl(
        'https://example.com/sites/default/files/wow/cool.jpg?some=param',
        'https://example.com'
      )
    ).toEqual('/sites/default/files/wow/cool.jpg?some=param')

    expect(
      stripMediaBaseUrl(
        'https://example.com/sites/default/files/wow/cool.jpg?some=param',
        'https://example.com/'
      )
    ).toEqual('/sites/default/files/wow/cool.jpg?some=param')
  })

  it('does not change a url if it points to an external domain', () => {
    expect(
      stripMediaBaseUrl(
        'https://example.com/sites/default/files/wow/cool.jpg?some=param',
        'https://google.com'
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it('leaves relative URLs unchanged if the domains differ', () => {
    expect(
      stripMediaBaseUrl(
        'https://example.com/sites/default/files/wow/cool.jpg?some=param',
        'https://google.com'
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it('leaves relative URLs unchanged if no baseUrl is passed', () => {
    expect(
      stripMediaBaseUrl(
        'https://example.com/sites/default/files/wow/cool.jpg?some=param',
        ''
      )
    ).toEqual('https://example.com/sites/default/files/wow/cool.jpg?some=param')
  })

  it('only strips the base URL for media files matching sites/default/files', () => {
    expect(
      stripMediaBaseUrl(
        'https://example.com/sites/tmp/files/wow/cool.jpg',
        'https://example.com'
      )
    ).toEqual('https://example.com/sites/tmp/files/wow/cool.jpg')
  })
})
