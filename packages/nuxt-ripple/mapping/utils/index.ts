export { default as formatPriceRange } from './formatPriceRange.js'
export { default as processSiteSocialLinks } from './processSiteSocialLinks.js'

export const getAnchorLinkId = (str: string) => {
  // Anchor link should support any unicode characters.
  // But as anchor link need to be used in URL, we strip out some special characters.
  // https://developers.google.com/maps/documentation/urls/url-encoding
  return str
    .toLowerCase()
    .replace(/(&\w+?;)/gim, ' ')
    .replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, '')
    .replace(/(^\s+)|(\s+$)/gim, '')
    .replace(/\s+/gm, '-')
}
