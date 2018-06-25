const isRelativeUrl = (url) => {
  const types = [
    'tel:',
    'mailto:'
  ]

  for (let type of types) {
    if (url !== null) {
      if (url.startsWith(type)) {
        return false
      }
    }
  }

  var reg = new RegExp('^(?!(?:[a-z]+:)?//)', 'i')
  return reg.test(url)
}

const isExternalUrl = (url, hostname) => {
  if (isRelativeUrl(url)) {
    return false
  }

  return _extractHostname(url) !== hostname
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

  return hostname
}

export { isRelativeUrl, isExternalUrl }
