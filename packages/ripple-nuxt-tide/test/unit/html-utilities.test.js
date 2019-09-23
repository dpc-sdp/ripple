import htmlUtilities from '../../lib/core/html-utilities'

describe('html utilities', () => {
  test(`should decode special characters`, async () => {
    expect(htmlUtilities.decodeSpecialCharacters('&amp;&lt;&gt;&nbsp;&apos;&quot;&#039;')).toBe(`&<> '"'`)
  })
})
