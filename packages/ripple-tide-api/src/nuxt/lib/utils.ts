export const getBaseUrl = (req) => {
  const apiPrefix = '/api/tide'
  if (req) {
    const protocol = req.protocol ? req.protocol : 'http'
    return `${protocol}://${req.headers.host}${apiPrefix}`
  } else if (typeof window !== 'undefined') {
    return window.location.origin + apiPrefix
  }
}
