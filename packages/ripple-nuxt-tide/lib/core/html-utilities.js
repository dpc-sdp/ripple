export default {
  decodeSpecialCharacters (html) {
    const map = {
      '&amp;': '&',
      '&gt;': '>',
      '&lt;': '<',
      '&apos;': "'",
      '&nbsp;': ' '
    }
    let replaceableCodes = '('
    let first = true
    for (const code in map) {
      replaceableCodes += first ? code : `|${code}`
      first = false
    }
    replaceableCodes += ')'
    return html.replace(new RegExp(replaceableCodes, 'gi'), (code) => { return map[code] })
  }
}
