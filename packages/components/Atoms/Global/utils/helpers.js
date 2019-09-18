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

export const truncateText = (text, stop = 150, clamp) => {
  if (text && typeof text === 'string') {
    if (text.length > stop) {
      return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    }
    return text
  }
  return ''
}

export { isRelativeUrl, isExternalUrl, isAnchorLink, formatMoney, isClient }
