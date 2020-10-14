import { isRelativeUrl, isExternalUrl, isAnchorLink, getAnchorLinkName, decodeSpecialCharacters } from './../../../packages/components/Atoms/Global/utils/helpers'

describe('isRelativeUrl', () => {
  /* eslint-disable indent */
  test.each`
    url                                 | expected
    ${'/test-path'}                     | ${true}
    ${'http://test.com/test-path'}      | ${false}
    ${'ftp://test.com/test-path'}       | ${false}
    ${'tel: 03 12345678'}               | ${false}
    ${'mailto: test@t.com'}             | ${false}
  `('returns $expected for $url', ({ url, expected }) => {
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
  `('returns $expected when give $url in site $hostname', ({ url, hostname, expected }) => {
    expect(isExternalUrl(url, hostname)).toBe(expected)
  })
  /* eslint-enable indent */
})

describe('isAnchorLink', () => {
  /* eslint-disable indent */
  test.each`
    url                                 | expected
    ${'#'}                              | ${true}
    ${'#test'}                          | ${true}
    ${'#test-anchor'}                   | ${true}
    ${'/test-path'}                     | ${false}
    ${'http://test.com/test-path'}      | ${false}
    ${'ftp://test.com/test-path'}       | ${false}
    ${'tel: 03 12345678'}               | ${false}
    ${'mailto: test@t.com'}             | ${false}
  `('returns $expected for $url', ({ url, expected }) => {
    expect(isAnchorLink(url)).toBe(expected)
  })
  /* eslint-enable indent */
})

describe('getAnchorLinkName', () => {
  /* eslint-disable indent */
  test.each`
    text                                                | expected
    ${'Anchor&nbsp;&amp;&nbsp;&copy;&nbsp;Link'}        | ${'anchor-link'}
    ${' _.~"<>%|\'!*();:@&=+$,/?%#[]{}\n`^\\'}         | ${''}
    ${'Anchor`~!@#$%^&*()-_=+{}[]\\|;:\'"<>,.?/\nLink'} | ${'anchor-link'}
    ${'   ANCHOR   LINK   '}                            | ${'anchor-link'}
    ${'1234567890'}                                     | ${'1234567890'}
    ${'مستويات القيود الحاليَّة في فكتوريا'}              | ${'مستويات-القيود-الحاليَّة-في-فكتوريا'}
    ${'Uže gradsko područje Melburna'}                  | ${'uže-gradsko-područje-melburna'}
    ${'中文标题'}                                        | ${'中文标题'}
    ${'Alɛ̈th ë kum ë nyin'}                             | ${'alɛ̈th-ë-kum-ë-nyin'}
    ${'Регионы штата Виктория'}                         | ${'регионы-штата-виктория'}
    ${'Επαρχιακή Βικτώρια'}                             | ${'επαρχιακή-βικτώρια'}
  `('returns $expected for $text', ({ text, expected }) => {
    expect(getAnchorLinkName(text)).toBe(expected)
  })
  /* eslint-enable indent */
})

describe('decodeSpecialCharacters', () => {
  test(`should decode special characters`, async () => {
    expect(decodeSpecialCharacters('&amp;&lt;&gt;&nbsp;&apos;&quot;&#039;')).toBe(`&<> '"'`)
  })
})
