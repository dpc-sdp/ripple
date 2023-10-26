import cheerio from 'cheerio'
import defaultPlugins from './default-plugins.js'

// This is a hack to cheerio to solve the unwanted encode issue.
// https://github.com/cheeriojs/cheerio/issues/866#issuecomment-275699121
// We don't want cheerio to encode our vue template, as it will add encoded entities into Vue props.
// NOTE: Any HTML encoded entities in original HTML will be kept as it is.

// deprecated
/*
const cheerioHtml = cheerio.prototype.html
cheerio.prototype.html = function wrappedHtml(args) {
  let result = cheerioHtml.apply(this, ...args)

  if (typeof result === 'string') {
    result = result.replace(/&#x([0-9a-f]{1,6});/gi, function (entity, code) {
      code = parseInt(code, 16)

      // don't unescape ascii characters, assuming that all ascii characters
      // are encoded for a good reason
      if (code < 0x80) return entity

      return String.fromCodePoint(code)
    })
  }

  return result
}
*/

// A markup transpiler for converting HTML into Vue template by giving plugins.
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

  return $('body').html()
}

export default markupTranspiler
