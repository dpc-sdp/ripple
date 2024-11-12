import { expect, describe } from '@jest/globals'
import markupTranspiler from './index'
import fixture from './complex.fixture.js'

describe('ripple-tide-api/utils/markup-transpiler/cheerio', () => {
  it(`runs plugins on complex markup`, () => {
    expect(markupTranspiler(fixture.api)).toEqual(fixture.processed)
  })
})
