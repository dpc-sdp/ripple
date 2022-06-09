import cheerio from 'cheerio'

// https://github.com/cheeriojs/cheerio/issues/866#issuecomment-275699121
// This monkey patch to rc.2 stops cheerio from encoding utf8 chars (fixed in non-IE11 compliant rc.10)
const cheerioHtml = cheerio.prototype.html
cheerio.prototype.html = function wrappedHtml () {
  var result = cheerioHtml.apply(this, arguments)

  if (typeof result === 'string') {
    result = result.replace(/&#x([0-9a-f]{1,6});/ig, function (entity, code) {
      code = parseInt(code, 16)

      // don't unescape ascii characters, assuming that all ascii characters
      // are encoded for a good reason
      if (code < 0x80) return entity

      return String.fromCodePoint(code)
    })
  }

  return result
}

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
