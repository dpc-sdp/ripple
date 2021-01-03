/* eslint-disable */
// Polyfill for startsWith
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(search, pos) {
		return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
	}
}
/* eslint-enable */

const isRelativeUrl = (url) => {
  if (_isTelOrEmailUrl(url)) {
    return false
  }

  var reg = new RegExp('^(?!(?:[a-z]+:)?//)', 'i')
  return reg.test(url)
}

const isExternalUrl = (url, hostname) => {
  if (isRelativeUrl(url)) {
    return false
  }

  if (_isTelOrEmailUrl(url)) {
    return false
  }

  return _extractHostname(url) !== hostname.replace(/^www\./, '')
}

const isAnchorLink = (url) => {
  return (typeof url === 'string' && url.length > 0 && url[0] === '#')
}

const getAnchorLinkName = (str) => {
  // Anchorlink should support any unicode characters.
  // But as anchorlink need to be used in URL, we strip out some special characters.
  // https://developers.google.com/maps/documentation/urls/url-encoding
  return str.toLowerCase().replace(/(&\w+?;)/gim, ' ').replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, '').replace(/(^\s+)|(\s+$)/gim, '').replace(/\s+/gm, '-')
}

const formatMoney = (value) => {
  if (value && !isNaN(value)) {
    // Thousands seperator - https://stackoverflow.com/a/2901298
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return ''
}

function isClient () {
  return (typeof window !== 'undefined')
}

// https://stackoverflow.com/a/23945027/1212791
function _extractHostname (url) {
  let hostname

  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname.replace(/^www\./, '')
}

function _isTelOrEmailUrl (url) {
  const types = [
    'tel:',
    'mailto:'
  ]

  for (let type of types) {
    if (url !== undefined && url !== null) {
      if (url.startsWith(type)) {
        return true
      }
    }
  }

  return false
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
  return html.replace(new RegExp(replaceableCodes, 'gi'), (code) => { return map[code.toLowerCase()] })
}

const truncateText = (text, stop = 150, clamp) => {
  if (text && typeof text === 'string') {
    if (text.length > stop) {
      return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    }
    return text
  }
  return ''
}

const capitalize = (str) => typeof str === 'string' && str.length > 0 ? `${str.charAt(0).toUpperCase() + str.slice(1)}` : ''

// Client side only
const isIPadPro = () => {
  // No god way to tell iPad Pro, this may will not work after years.
  // https://stackoverflow.com/a/58017456/1212791
  if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    return true
  }
  return false
}

export {
  capitalize,
  decodeSpecialCharacters,
  formatMoney,
  getAnchorLinkName,
  isAnchorLink,
  isClient,
  isExternalUrl,
  isIPadPro,
  isRelativeUrl,
  truncateText
}
