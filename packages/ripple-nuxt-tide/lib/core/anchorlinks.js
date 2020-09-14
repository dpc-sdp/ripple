import { getAnchorLinkName } from '@dpc-sdp/ripple-global/utils/helpers.js'

const anchorUtils = {
  getAnchorLinkHTML (html) {
    // Return HTML with an anchor above each anchored heading.
    let newHTML = html
    let offset = 0
    const headingTagOffset = '<h2'.length
    this.getAnchorHeadings(html, true).forEach(item => {
      const newAnchor = this.textExists(item.text) ? ` id="${getAnchorLinkName(item.text)}"` : ''
      const headingIndex = item.indexStart + offset + headingTagOffset
      newHTML = newHTML.slice(0, headingIndex) + newAnchor + newHTML.slice(headingIndex)
      offset += newAnchor.length
    })
    return newHTML
  },

  getAnchorLinks (html, includeSubHeading = false) {
    // Return an array of links to anchored headings.
    return this.getAnchorHeadings(html, includeSubHeading).reduce((result, item) => {
      // Ignore empty headings.
      if (this.textExists(item.text)) {
        result.push({
          text: item.text,
          url: '#' + getAnchorLinkName(item.text),
          type: item.type
        })
      }
      return result
    }, [])
  },

  getAnchorHeadings (html, includeSubHeading = false) {
    // Return an array of h2 and h3 headings index positions and text.
    let headings = []
    let reg = /<h2>[\w\W]*?<\/h2>/gim
    if (includeSubHeading) {
      reg = /<(h2|h3)>[\w\W]*?<\/(h2|h3)>/gim
    }

    let match = reg.exec(html)

    while (match !== null) {
      const matchedText = match[0].replace(/<.+?>/gi, '')
      if (this.textExists(matchedText)) {
        headings.push({
          indexStart: match.index,
          text: match[0].replace(/<.+?>/gi, ''),
          type: match[0].substr(1, 2)
        })
      }
      match = reg.exec(html)
    }
    return headings
  },

  textExists (text) {
    // Text exists if characters remain after spaces and &nbsp; are removed.
    return (text.replace(/\s|&nbsp;/g, '').length > 0)
  }
}

export { anchorUtils }
