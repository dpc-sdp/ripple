import { expect, describe, it, vi } from 'vitest'
import markupTranspiler from './index'
import fixture from './complex.fixture.js'

vi.stubEnv(
  'NUXT_PUBLIC_TIDE_BASE_URL',
  'https://develop.content.reference.sdp.vic.gov.au/'
)

describe('ripple-tide-api/utils/markup-transpiler/cheerio', () => {
  it('runs plugins on complex markup', () => {
    expect(markupTranspiler(fixture.api)).toEqual(fixture.processed)
  })
})
