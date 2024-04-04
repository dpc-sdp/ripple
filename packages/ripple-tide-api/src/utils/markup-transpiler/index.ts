import cheerio from 'cheerio'
import defaultPlugins from './default-plugins.js'

// A markup transpiler for converting HTML into Vue template by giving plugins.
const markupTranspiler = (
  html: any,
  plugins = defaultPlugins,
  options = {}
) => {
  if (!html) {
    return ''
  }
  const $ = cheerio.load(html, options)
  const $body = $('body')
  let markupData = {}

  if (Object.keys(plugins).length) {
    // Load plugins to transpile embedded components
    for (const [index, plugin] of plugins.entries()) {
      $.prototype[`plugin${index}`] = plugin
      const data = $body[`plugin${index}`]()
      if (data) {
        markupData = { ...markupData, ...data }
      }
    }
  }

  return $('body').html()
}

export default markupTranspiler
