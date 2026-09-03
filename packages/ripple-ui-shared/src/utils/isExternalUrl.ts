// https://stackoverflow.com/a/23945027/1212791
function _extractHostname(url) {
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

function _isTelOrEmailUrl(url) {
  const types = ['tel:', 'mailto:', 'sms:']

  for (const type of types) {
    if (url !== undefined && url !== null) {
      if (url.startsWith(type)) {
        return true
      }
    }
  }

  return false
}

const isRelativeUrl = (url) => {
  if (_isTelOrEmailUrl(url)) {
    return false
  }

  const reg = new RegExp('^(?!(?:[a-z]+:)?//)', 'i')
  return reg.test(url)
}

export const isExternalUrl = (url, hostname) => {
  if (isRelativeUrl(url)) {
    return false
  }

  if (_isTelOrEmailUrl(url)) {
    return false
  }

  return _extractHostname(url) !== hostname.replace(/^www\./, '')
}
