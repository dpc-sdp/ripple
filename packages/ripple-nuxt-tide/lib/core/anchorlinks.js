import htmlUtilities from './html-utilities'

const anchorUtils = {
  getAnchorLinkHTML (html) {
    // Return HTML with an anchor above each anchored heading.
    let newHTML = html
    let offset = 0
    let existingNames = {}
    const headingTagOffset = '<h2'.length
    this.getAnchorHeadings(html).forEach(item => {
      const newAnchor = this.textExists(item.text) ? ` id="${this.getAnchorLinkName(item.text, existingNames)}"` : ''
      const headingIndex = item.indexStart + offset + headingTagOffset
      newHTML = newHTML.slice(0, headingIndex) + newAnchor + newHTML.slice(headingIndex)
      offset += newAnchor.length
    })
    return newHTML
  },

  getAnchorLinks (html) {
    // Return an array of links to anchored headings.
    let existingNames = {}
    return this.getAnchorHeadings(html).reduce((result, item) => {
      // Ignore empty headings.
      if (this.textExists(item.text)) {
        result.push({
          text: htmlUtilities.decodeSpecialCharacters(item.text),
          url: '#' + this.getAnchorLinkName(item.text, existingNames)
        })
      }
      return result
    }, [])
  },

  getAnchorHeadings (html) {
    // Return an array of h2 heading index positions and text.
    let headings = []
    let reg = /<h2>[\w\W]*?<\/h2>/gim
    let match = reg.exec(html)

    while (match !== null) {
      const matchedText = match[0].replace(/<.+?>/gi, '')
      if (this.textExists(matchedText)) {
        headings.push({
          indexStart: match.index,
          text: match[0].replace(/<.+?>/gi, '')
        })
      }
      match = reg.exec(html)
    }
    return headings
  },

  getAnchorLinkName (str, existingNames) {
    // Lowercase. Replace &tags; with spaces. Strip special characters. Strip trailing space. Replace space with hypen.
    let candidate = str.toLowerCase().replace(/(&\w+?;)/gim, ' ').replace(/[^a-zA-Z0-9\s]/gim, '').replace(/(^\s+)|(\s+$)/gim, '').replace(/\s+/gm, '-')
    // Avoid duplicates by checking against existingNames.
    if (existingNames[candidate] === undefined) {
      existingNames[candidate] = 1
    } else {
      candidate = `${candidate}-${++existingNames[candidate]}`
    }
    return candidate
  },

  textExists (text) {
    // Text exists if characters remain after spaces and &nbsp; are removed.
    return (text.replace(/\s|&nbsp;/g, '').length > 0)
  }
}

export { anchorUtils }
