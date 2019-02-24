import cheerio from 'cheerio'

const markupTranspiler = (html, plugins, options = { decodeEntities: false }) => {
  const $ = cheerio.load(html, options)
  const $body = $('body')

  // Load plugins to transpile embedded components
  for (const [index, plugin] of plugins.entries()) {
    $.prototype[`plugin${index}`] = plugin
    $body[`plugin${index}`]()
  }

  return $('body').html()
}

export default markupTranspiler
