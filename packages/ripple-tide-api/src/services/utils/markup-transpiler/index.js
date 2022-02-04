import cheerio from 'cheerio'
import defaultPlugins from './default-plugins'

// A markup transplier for converting HTML into Vue template by giving plugins.
const markupTranspiler = (html, plugins = defaultPlugins, options = {}) => {
  if (!html) {
    return ''
  }
  const $ = cheerio.load(html, options)
  const $body = $('body')
  let markupData = {}

  if (Object.keys(plugins).length > 1) {
    // Load plugins to transpile embedded components
    for (const [index, plugin] of plugins.entries()) {
      $.prototype[`plugin${index}`] = plugin
      const data = $body[`plugin${index}`]()
      if (data) {
        markupData = { ...markupData, ...data }
      }
    }
  }

  // return $('body').html()
  return {
    html: $('body').html(),
    data: markupData
  }
}

export default markupTranspiler
