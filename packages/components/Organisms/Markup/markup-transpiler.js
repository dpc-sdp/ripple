import cheerio from 'cheerio'

// A markup transpiler for converting HTML into Vue template by giving plugins.
const markupTranspiler = (html, plugins = {}, options = {}) => {
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

  return {
    html: $('body').html(),
    data: markupData
  }
}

export default markupTranspiler
