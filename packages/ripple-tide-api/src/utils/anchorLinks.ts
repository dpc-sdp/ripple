const getAnchorLinkId = (str) => {
  // Anchorlink should support any unicode characters.
  // But as anchorlink need to be used in URL, we strip out some special characters.
  // https://developers.google.com/maps/documentation/urls/url-encoding
  return str
    .toLowerCase()
    .replace(/(&\w+?;)/gim, ' ')
    .replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, '')
    .replace(/(^\s+)|(\s+$)/gim, '')
    .replace(/\s+/gm, '-')
}

export interface Anchorlink {
  text: string
  id: string
  type: 'h2' | 'h3'
}

export const addAnchorLinksToHTML = (html) => {
  // Return HTML with an anchor above each anchored heading.
  let newHTML = html
  let offset = 0
  const headingTagOffset = '<h2'.length
  getAnchorHeadings(html, true).forEach((item) => {
    const newAnchor = textExists(item.text)
      ? ` id="${getAnchorLinkId(item.text)}"`
      : ''
    const headingIndex = item.indexStart + offset + headingTagOffset
    newHTML =
      newHTML.slice(0, headingIndex) + newAnchor + newHTML.slice(headingIndex)
    offset += newAnchor.length
  })
  return newHTML
}

export const getAnchorLinksFromHTML = (
  html,
  includeSubHeading = false
): Anchorlink[] => {
  // Return an array of links to anchored headings.
  return getAnchorHeadings(html, includeSubHeading).reduce((result, item) => {
    // Ignore empty headings.
    if (textExists(item.text)) {
      result.push({
        text: decodeSpecialCharacters(item.text),
        id: getAnchorLinkId(item.text),
        type: item.type
      })
    }
    return result
  }, [] as Anchorlink[])
}

interface AnchorHeading {
  text: string
  indexStart: number
  type: 'h2' | 'h3'
}

const getAnchorHeadings = (
  html,
  includeSubHeading = false
): AnchorHeading[] => {
  // Return an array of h2 and h3 headings index positions and text.
  const headings: AnchorHeading[] = []
  let reg = /<h2>[\w\W]*?<\/h2>/gim
  if (includeSubHeading) {
    reg = /<(h2|h3)>[\w\W]*?<\/(h2|h3)>/gim
  }

  let match = reg.exec(html)

  while (match !== null) {
    const matchedText = match[0].replace(/<.+?>/gi, '')
    if (textExists(matchedText)) {
      headings.push({
        indexStart: match.index,
        text: match[0].replace(/<.+?>/gi, ''),
        type: match[0].substring(1, 3) as 'h2' | 'h3'
      })
    }
    match = reg.exec(html)
  }
  return headings
}

export const textExists = (text) => {
  // Text exists if characters remain after spaces and &nbsp; are removed.
  return text.replace(/\s|&nbsp;/g, '').length > 0
}

const decodeSpecialCharacters = (html) => {
  const map = {
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&apos;': "'",
    '&#039;': "'",
    '&quot;': '"',
    '&nbsp;': ' '
  }
  let replaceableCodes = '('
  let first = true
  for (const code in map) {
    replaceableCodes += first ? code : `|${code}`
    first = false
  }
  replaceableCodes += ')'
  return html.replace(new RegExp(replaceableCodes, 'gi'), (code) => {
    return map[code.toLowerCase()]
  })
}
