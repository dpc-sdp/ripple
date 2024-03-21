import { expect, describe, it } from '@jest/globals'

import { stripSiteId } from './stripSiteId.js'

describe('stripSiteId(url, replace)', () => {
  it(`returns url without site prefix`, () => {
    expect(stripSiteId('/site-8888/demo')).toEqual('/demo')
  })

  it(`returns undefined if param is null / undefined`, () => {
    expect(stripSiteId(null)).toEqual(undefined)
    expect(stripSiteId(undefined)).toEqual(undefined)
  })
})
