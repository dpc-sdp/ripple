import markupTranspiler from '@dpc-sdp/ripple-markup/markup-transpiler.js'
import markupPluginsLoader from '../../lib/core/markup-plugins-loader.js'
import html from './__fixtures__/markup-transpiler-html.js'

describe('Markup transpiler', () => {
  // cheerio.js will convert `&nbsp;` to `&#xA0;` but it is ok, as they are same thing.
  test('should get same HTML with no plugins', () => {
    const result = markupTranspiler(html)
    expect(result.html).toMatchSnapshot()
  })

  test('should able transpile html into vue template with plugins', () => {
    // TODO: update this tests to include core module markup plugins when we add them.
    const plugins = markupPluginsLoader()
    const result = markupTranspiler(html, plugins)
    expect(result.html).toMatchSnapshot()
  })
})
