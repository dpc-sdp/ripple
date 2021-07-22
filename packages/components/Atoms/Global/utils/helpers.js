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

const epochToDateText = (epoch) => {
  if (!isEpoch(epoch)) return ''

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const date = epochToDate(epoch)

  if (epochIsYesterday(epoch)) return 'Yesterday at ' + formatAMPM(date)
  else if (epochIsToday(epoch)) return 'Today at ' + formatAMPM(date)
  else {
    return String(date.getDate()) +
      ' ' +
      String(monthNames[date.getMonth()]) +
      ' ' +
      String(date.getFullYear())
  }
}

const epochIsYesterday = (epoch) => {
  const date = epochToDate(epoch)

  // Yesterdays date
  const yesterday = new Date(new Date())
  yesterday.setDate(yesterday.getDate() - 1)

  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
}

const epochIsToday = (epoch) => {
  const date = epochToDate(epoch)
  const nowDate = new Date()

  return date.getDate() === nowDate.getDate() &&
    date.getMonth() === nowDate.getMonth() &&
    date.getFullYear() === nowDate.getFullYear()
}

const epochToDate = (epoch) => {
  const utcSeconds = epoch
  const date = new Date(0) // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(utcSeconds)
  return date
}

const isEpoch = (epoch) => {
  const date = new Date(0) // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(epoch)

  return !isNaN(date.getTime())
}

const formatAMPM = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
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
  truncateText,
  epochToDateText
}
