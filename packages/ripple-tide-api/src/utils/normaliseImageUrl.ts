const isRelativeUrl = (url) => {
  const reg = new RegExp('^(?!(?:[a-z]+:)?//)', 'i')
  return reg.test(url)
}

const normaliseImageUrl = (baseUrl: string, imageUrl: string) => {
  const baseWithNoTrailingSlash = baseUrl.replace(/\/$/, '')

  if (isRelativeUrl(imageUrl)) {
    if (imageUrl.startsWith('/sites/default/files')) {
      return `${baseWithNoTrailingSlash}${imageUrl}`
    }

    return imageUrl
  } else {
    const parsedUrl = new URL(imageUrl)

    if (parsedUrl.pathname.startsWith('/sites/default/files')) {
      return `${baseWithNoTrailingSlash}${parsedUrl.pathname}${parsedUrl.search}`
    }

    return imageUrl
  }
}

export default normaliseImageUrl
