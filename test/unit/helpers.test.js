import { isRelativeUrl, isExternalUrl } from './../../packages/Atoms/Global/utils/helpers'

describe('isRelativeUrl', () => {
  /* eslint-disable indent */
  test.each`
    url                                 | expected
    ${'/test-path'}                     | ${true}
    ${'http://test.com/test-path'}      | ${false}
    ${'ftp://test.com/test-path'}       | ${false}
    ${'tel: 03 12345678'}               | ${false}
    ${'mailto: test@t.com'}             | ${false}
  `('returns $expected for $url', ({url, expected}) => {
    expect(isRelativeUrl(url)).toBe(expected)
  })
  /* eslint-enable indent */
})

describe('isExternalUrl', () => {
  /* eslint-disable indent */
  test.each`
    url                                 | hostname          | expected
    ${'http://other.com/test-path'}     | ${'test.com'}     | ${true}
    ${'http://test.com/test-path'}      | ${'test.com'}     | ${false}
    ${'http://www.test.com/test-path'}  | ${'test.com'}     | ${false}
    ${'http://test.com/test-path'}      | ${'www.test.com'} | ${false}
    ${'http://sub.test.com/test-path'}  | ${'test.com'}     | ${true}
    ${'/test-path'}                     | ${'test.com'}     | ${false}
    ${'tel: 03 12345678'}               | ${'test.com'}     | ${false}
    ${'mailto: test@t.com'}             | ${'test.com'}     | ${false}
  `('returns $expected when give $url in site $hostname', ({url, hostname, expected}) => {
    expect(isExternalUrl(url, hostname)).toBe(expected)
  })
  /* eslint-enable indent */
})
