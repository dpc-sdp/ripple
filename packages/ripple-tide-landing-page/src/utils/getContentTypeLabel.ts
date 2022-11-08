const allowedContentTypePrefixes = [
  'event',
  'grant',
  'news',
  'publication',
  'profile',
  'recommendation'
]

const getContentTypeLabel = (contentType: string): string => {
  const split = (contentType || '').split(' ')
  const prefix = split[0].replace(':', '')
  const isValid = allowedContentTypePrefixes.includes(prefix.toLowerCase())

  return isValid ? prefix : ''
}

export default getContentTypeLabel
